<script setup>
import { ref, onMounted, computed, provide, watch } from "vue";
import { supabase } from "./utils/supabaseClient";
import LoginScreen from "./components/LoginScreen.vue";
import { useQuasar } from "quasar";
const $q = useQuasar()
const showNotify = (message) => {
  $q.notify({ message, color:'red' })
}

const session = ref(null);
provide("session", session);

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
};

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
    $q.loading.show({ message: 'Loading your data. Hang on...'})
    setTimeout(() => {
      $q.loading.hide()
    }, 1000)
  });

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
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
