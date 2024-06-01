// functions to get data from supabase
import { supabase } from "./utils/supabaseClient";

const getUser = (session) => session.value.user.id;

export const getEvents = () => supabase.from("events").select()

export const deleteEvents = (ids) => supabase.from("events").delete().in('event_id',ids)

export const postEvents = (session, events) => {
  const output = events.map(evt =>
    ({
      evt_id: evt.id,
      user_id: getUser(session),
      start_time: evt.start,
      end_time: evt.end,
      title: evt.title,
      description: 'test',
      location: 'test'
    })
  )
  return supabase.from("events").upsert(output);
};
