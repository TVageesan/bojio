// functions to get data from supabase

import { supabase } from "./utils/supabaseClient";
import axios from "axios";
import { date } from 'quasar';
const { addToDate, formatDate } = date;

const evtToPost = (session,evt) => ({
  evt_id: evt.id,
  user_id: getUser(session),
  start_time: evt.start,
  end_time: evt.end,
  title: evt.title,
  description: evt.description,
  location: evt.location,
  imported: false,
})

const evtToFetch = (evt) => ({
  id: evt.evt_id,
  start: evt.start_time,
  end: evt.end_time,
  title: evt.title,
  description: evt.description,
  location: evt.location,
  imported: evt.imported
})

const getUser = (session) => session.value.user.id;

export const logoutUser = () => supabase.auth.signOut();

export const getUsername = (session) => supabase.from("users").select().eq("id",getUser(session));

export const putUsername = (session,name) => supabase.from("users").update({name}).eq("id",getUser(session)).select();

export const getEvents = async (session) => {
  const { data } = await supabase.from("events").select().eq("user_id", getUser(session));
  return data.map(e => evtToFetch(e));
}

export const deleteEvent = (session,evt_id) => supabase.from('events').delete().match({evt_id, user_id: getUser(session)});

export const postEvent = (session, evt) => supabase.from("events").insert(evtToPost(session,evt)).select();

export const overwriteEvents = (session) => supabase.from("events").delete().match({ imported: true, user_id: getUser(session)});
export const importEvents = (session,evts) => supabase.from("events").insert(evts.map(evt => ({...evtToPost(session,evt),imported: true}))).select();

export const putEvent = (session,evt) => supabase.from("events").update(evtToPost(session,evt)).match({evt_id: evt.id, user_id: getUser(session)}).select();

export const getGroups = (session) => supabase.rpc('fetch_groups',{ input_id: getUser(session) });

export const getGroupEvents = (input_id) => supabase.rpc('fetch_group_events', { input_id });

export const postGroup = (session, name, url) => supabase.from("groups").insert({ name, owner_id: getUser(session), url });

export const putGroup = (name,url,group_id) => supabase.from("groups").update({ name, url }).eq("id",group_id);

export const deleteGroup = (group_id) => supabase.from("groups").delete().eq("id",group_id);

export const uploadImage = async (session, file) => {
  const fileExt = file.name.split('.').pop();
  const filePath = `${getUser(session)}/profile.jpeg`
  await supabase.storage.from('avatars').update(filePath, file,{upsert:true})
}

export const downloadImage = async (session) => {
  if (!session) return null;
  const path = `${getUser(session)}/profile.jpeg`
  let { data, error } = await supabase.storage.from('avatars').download(path)
  if (!data){
    data =  (await supabase.storage.from('avatars').download('public/placeholder.jpeg')).data;
  };
  const url = URL.createObjectURL(data)
  return url;
}

//NUSModsAPI
const lessonTypeMap = {
  "DLEC": "DesignLecture",
  "LAB": "Laboratory",
  "LEC": "Lecture",
  "PLEC": "PackagedLecture",
  "PTUT": "PackagedTutorial",
  "REC": "Recitation",
  "SEC": "SectionalTeaching",
  "SEM": "Seminar-StyleModuleClass",
  "TUT": "Tutorial",
  "TUT2": "TutorialType2",
  "TUT3": "TutorialType3",
  "WS": "Workshop"
}

const getAcademicYear = (year) => {
  const today = new Date();
  const academicYearEnd = new Date(year, 7, 4); //4th august

  if (today < academicYearEnd) {
    return `${year - 1}-${year}`;
  } else {
    return `${year}-${year + 1}`;
  }
}

const getFirstMonday = (year, month) => {
  let date = new Date(year, month, 1);
  let dayOfWeek = date.getDay();

  if (dayOfWeek != 1){ //if not already monday, get the next possible monday
    const daysToAdd = (dayOfWeek === 0) ? 1 : (8 - dayOfWeek)
    date = addToDate(date, {days: daysToAdd })
  }

  return date;
}

const getSecondMonday = (year, month) => {
  const firstMonday = getFirstMonday(year, month);
  return addToDate(firstMonday, {days: 7});
}

const getAcademicStartDate = (year,sem) => {
  if (sem == 1){
    return getFirstMonday(year, 7);
  }else{
    return getSecondMonday(year, 0);
  }
}
const base_url = 'https://api.nusmods.com/v2'

const parseQueryString = (queryString) => {
  const url = new URL(queryString);
  const params = new URLSearchParams(url.search);
  const semester = Number(url.pathname.split('/')[2].slice(-1)); // Extract the semester part from the URL

  const modules = {};

  params.forEach((value, key) => {
    const slots = value.split(',').map(slot => {
      const [type, code] = slot.split(':');
      return { type, code };
    });
    modules[key] = slots;
  });

  return {
    semester,
    modules
  };
}

export const getModules = async (index,url) => {
  const { semester, modules }  = parseQueryString(url);
  const year = new Date().getFullYear();
  const acad_year = getAcademicYear(year);
  const semStart = getAcademicStartDate( year, semester );
  console.log('semester',semester,'semStart',semStart);
  const new_events = [];
  const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

  const generateEvents = (module_code,timetable) => {

    const { day, startTime, endTime, weeks, venue, lessonType } = timetable;
    const weekday = days.findIndex(d => d == day)
    let startDate = semStart;

    const weekToDays = (week) => {if (week > 6) week++; return week*7}
    const createDate = (week) => addToDate(startDate,{days: weekday + weekToDays(week)});
    const formatTime = (date,time) => formatDate(date,'YYYY-MM-DD ') + time.substr(0,2) + ':' + time.substr(2);
    const createEvent = (date) => ({
      id: ++index,
      title: module_code + ' - ' + lessonType,
      description: lessonType,
      location: venue,
      start: formatTime(date,startTime),
      end: formatTime(date,endTime),
    })

    if (!Array.isArray(weeks)){
      const { start, end } = weeks;
      let startDate = new Date(start);
      const endDate = new Date(end);
      while (startDate < endDate){
        new_events.push(createEvent(startDate));
        startDate = addToDate(startDate,{days: 7});
      }
    }else{
      for (const week of weeks) new_events.push(createEvent(createDate(week)))
    }
  }

  const processTimetable = (type,code,module_code,timetables) => {
    const matchClass = ({classNo, lessonType}) => (classNo == code && lessonTypeMap[type] == lessonType)
    timetables.forEach(timetable => {
      if (matchClass(timetable)) generateEvents(module_code,timetable)
    })
  }

  const getModuleByCode =  async (module_code) => {
    //cache fetch requests to save NUSMods server costs :)
    let cached = localStorage.getItem(module_code);
    if(cached){
      cached = JSON.parse(cached);
    }else{
      const resp = await axios.get(base_url + `/` + acad_year + '/modules/' + module_code + '.json');
      cached = resp.data.semesterData;
      localStorage.setItem(module_code,JSON.stringify(cached));
    }
    const lessons = modules[module_code];
    const semester_data = cached.find(s => s.semester == semester).timetable;
    lessons.forEach(({type,code}) => processTimetable(type,code,module_code,semester_data));
  }

  const codes = Object.keys(modules);
  for (const code of codes) await getModuleByCode(code,acad_year);
  return { new_events, new_index: index };
}
