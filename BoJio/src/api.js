// functions to get data from supabase
/**EVENTS:
id int8
user_id uuid
title varchar
location int8
start
end
**/
export const getEvents = (session) => {
  return supabase.from("events").select();
};

export const postEvents = (session, events) => {
  return supabase.from("events").insert({
    user_id: session.user.id,
    ...events,
  });
};
