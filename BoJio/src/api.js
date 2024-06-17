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

export const getGroups = (session) => supabase.rpc('fetch_groups',{ input_id: getUser(session) });

export const getGroupEvents = (input_id) => supabase.rpc('fetch_group_events', { input_id });

export const postGroup = (session, name, url) => supabase.from("groups").insert({ name, owner_id: getUser(session), url });

export const putGroup = (name,url,group_id) => supabase.from("groups").update({ name, url }).eq("id",group_id);

export const deleteGroup = (group_id) => supabase.from("groups").delete().eq("id",group_id);
