<script setup>
import { ref, onMounted, computed, provide, watch } from "vue";
import { supabase } from "./utils/supabaseClient";
import LoginScreen from "./components/LoginScreen.vue";
import { useQuasar } from "quasar";
import { createUser } from "./api";
const $q = useQuasar()
const showNotify = (message) => {
  $q.notify({ message, color:'red' })
}

const session = ref(null);
provide("session", session);
provide("loading",$q.loading);

const showDialog = computed(() => session.value == null);

const vEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const onSignUp = async (email, password,confirm) => {
  if (!vEmail(email)){
    showNotify("Invalid Email Address");
    return;
  }
  if (password != confirm){
    showNotify("Confirm Password does not match Password");
    return;
  }
  if (password == ''){
    showNotify("Password Field cannot be empty");
    return;
  }
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) showNotify(error.message);
  else {
    await createUser(session);
    $q.loading.show({ message: 'Loading your data. Hang on...'})
  }
};

const onSignIn = async (email, password) => {
  if (email == ''){
    showNotify("Email Field cannot be empty");
    return;
  }
  if (password == ''){
    showNotify("Password Field cannot be empty");
    return;
  }
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) showNotify(error.message);
  else {
    $q.loading.show({ message: 'Loading your data. Hang on...'})
  }
};

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
    if(data.session) $q.loading.hide();
  });

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
    if(_session) $q.loading.hide();
  });
});
</script>

<template>
  <q-dialog v-model="showDialog">
    <LoginScreen @login="onSignIn" @signup="onSignUp"/>
  </q-dialog>
  <router-view/>
</template>

<style>
.q-dialog__backdrop {
  backdrop-filter: blur(7px);
}
</style>
