// functions to get data from supabase

import { supabase } from "./utils/supabaseClient";

const getUser = (session) => session.value.user.id;

export const getEvents = (session) => supabase.from("events").select().eq("user_id", getUser(session));

export const  getGroupEventsNew = (session) => supabase.rpc('get_group_events', {input_id: getUser(session)})

export const getGroupEvents = (user_ids) => supabase.from("events").select().in("user_id", user_ids);

// SELECT ug1.user_id,events.*,ug2.group_id
// FROM events
// JOIN user_groups AS ug1 ON events.user_id = ug1.user_id
// JOIN user_groups AS ug2 ON ug1.group_id = ug2.group_id
// WHERE ug2.user_id = 'c10abc55-4b46-4366-8f17-cdee60d5d211';,

// const { data, error } = await supabase
//   .from('events')
//   .select('ug1.user_id, events.*, ug2.group_id')
//   .join('user_groups AS ug1', { 'events.user_id': 'ug1.user_id' })
//   .join('user_groups AS ug2', { 'ug1.group_id': 'ug2.group_id' })
//   .eq('ug2.user_id', user_id);

export const deleteEvents = (session, ids) => supabase
    .from("events")
    .delete()
    .eq("user_id", getUser(session))
    .in("evt_id", ids);

export const postEvents = (session, events) => {
  const output = events.map((evt) => ({
    evt_id: evt.id,
    user_id: getUser(session),
    start_time: evt.start,
    end_time: evt.end,
    title: evt.title,
    description: evt.description,
    location: evt.location,
  }));
  return supabase.from("events").upsert(output).select();
};
