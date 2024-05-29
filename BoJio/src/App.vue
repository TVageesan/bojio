<script setup>
import { ref, onMounted, computed, inject } from "vue";
import { supabase } from "./utils/supabaseClient";
import LoginScreen from "./components/LoginScreen.vue";

const session = ref(null);
inject("session", session);

const showDialog = computed(() => session.value == null);

const handleLogin = async (email, password) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
};

const handleSignUp = async (email, password) => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
};

const onSignIn = (email, password, signIn) => {
  const handler = signIn ? handleLogin : handleSignUp;
  handler(email, password);
};

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
  });

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
  });
});
</script>

<template>
  <q-dialog v-model="showDialog">
    <LoginScreen @login="onSignIn" />
  </q-dialog>
  <router-view />
</template>

<style>
.q-dialog__backdrop {
  backdrop-filter: blur(7px);
}
</style>
