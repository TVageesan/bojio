// functions to get data from supabase

import { supabase } from "./utils/supabaseClient";

const getUser = (session) => session.value.user.id;

export const getEvents = (session) => supabase.from("events").select().eq('user_id',getUser(session));

export const getGroupEvents = (user_ids) => supabase.from("events").select().in('user_id',user_ids);

export const deleteEvents = (session,ids) => supabase.from("events").delete().eq('user_id',getUser(session)).in('evt_id',ids)

export const postEvents = (session, events) => {
  const output = events.map(evt =>
    ({
      evt_id: evt.id,
      user_id: getUser(session),
      start_time: evt.start,
      end_time: evt.end,
      title: evt.title,
      description: evt.description,
      location: evt.location
    })
  )
  return supabase.from("events").upsert(output).select();
};
