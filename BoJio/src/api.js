// functions to get data from supabase

import { supabase } from "./utils/supabaseClient";

const evtToPost = (session,evt) => ({
    evt_id: evt.id,
    user_id: getUser(session),
    start_time: evt.start,
    end_time: evt.end,
    title: evt.title,
    description: evt.description,
    location: evt.location,
})

const evtToFetch = (evt) => ({
  id: evt.evt_id,
  start: evt.start_time,
  end: evt.end_time,
  title: evt.title,
  description: evt.description,
  location: evt.location,
})

const getUser = (session) => session.value.user.id;

export const getEvents = async (session) => {
  const { data } = await supabase.from("events").select().eq("user_id", getUser(session));
  return data.map(e => evtToFetch(e));
}

export const deleteEvent = (session,evt_id) => supabase.from('events').delete().match({evt_id, user_id: getUser(session)});

export const postEvent = (session, evt) => supabase.from("events").insert(evtToPost(session,evt));

export const putEvent = (session,evt) => supabase.from("events").update(evtToPost(session,evt)).match({evt_id: evt.id, user_id: getUser(session)})

export const putEvents = (session,evts) => supabase.from("events").upsert(evts.map(evt => evtToPost(session,evt)));



export const  getGroupEventsNew = (session) => supabase.rpc('get_group_events', {input_id: getUser(session)})

export const getGroupEvents = (user_ids) => supabase.from("events").select().in("user_id", user_ids);


