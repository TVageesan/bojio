// functions to get data from supabase
/**EVENTS:
id int8
user_id uuid
title varchar
location int8
start
end
**/
import { supabase } from "./utils/supabaseClient";

const getUser = (session) => session.value.user.id;

export const getEvents = (session) => supabase.from("events").select().eq("user_id", getUser(session));

export const postEvents = (session, events) => {
  console.log('events',events)
  //return supabase.from("events").upsert();
};
