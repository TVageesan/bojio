import { boot } from 'quasar/wrappers'
import supabase from 'vue-3-supabase'
import { supabaseUrl, supabaseKey } from "../../config.json";

export default boot(({ app }) => {
  app.use(supabase,{
    supabaseUrl,
    supabaseKey
  })
})
