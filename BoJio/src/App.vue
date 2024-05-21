<script setup>
import { ref, provide } from "vue";
import { useSupabase } from 'vue-3-supabase'
import LoginScreen from "./components/LoginScreen.vue";

const token = ref('');
const refreshToken = ref('');
const showDialog = ref(true);

const login = (email,password,sign_in) => {
  let promise = null;

  //user authentication
  if (sign_in){
    promise = useSupabase().auth.signInWithPassword({
      email,
      password
    })
  }else{
    promise = useSupabase().auth.signUp({
      email,
      password
    })
  }

  showDialog.value = false;
  promise.then(resp => {
    console.log(resp)
  });
}


provide("token",token);
</script>

<template>
  <q-dialog v-model="showDialog">
    <LoginScreen @login = "(email,password,signin) => login(email,password,signin)" />
  </q-dialog>
  <router-view />
</template>

<style>
  .q-dialog__backdrop
  {
    backdrop-filter: blur(7px);
  }
</style>
