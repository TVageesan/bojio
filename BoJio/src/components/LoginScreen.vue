<!--
<script setup>
import { ref } from "vue";
const email = ref("");
const password = ref("");
const signIn = ref(true);
const emit = defineEmits("login");
//TODO: login/signup validation
const vEmail = (email) => true; //validate email
const vPassword = (password, signIn) => {
  if (signIn) {
    //validate password exists
    return true;
  } else {
    //validate password strength: minimum 6 chars, etc.
    return true;
  }
};
const sendDetails = () => {
  if (vEmail(email.value) && vPassword(password.value, signIn.value)) {
    emit("login", email.value, password.value, signIn.value);
  } else {
    console.log("insufficient details");
  }
};
</script>

<template>
  <q-card class="q-pa-md shadow-2 my_card" bordered>
    <q-card-section class="text-center">
      <div class="text-grey-9 text-h5 text-weight-bold">
        {{ signIn ? "Sign in" : "Sign up" }}
      </div>
      <div class="text-grey-8">
        {{
          signIn
            ? "Sign in below to access your account"
            : "Sign up below to create your account"
        }}
      </div>
    </q-card-section>
    <q-card-section>
      <q-input dense outlined v-model="email" label="Email Address"></q-input>
      <q-input
        dense
        outlined
        class="q-mt-md"
        v-model="password"
        type="password"
        label="Password"
        @keydown.enter.prevent="sendDetails"
      ></q-input>
    </q-card-section>
    <q-card-section>
      <q-btn
        style="border-radius: 8px"
        color="dark"
        rounded
        size="md"
        :label="signIn ? 'Sign in' : 'Sign up'"
        no-caps
        class="full-width"
        @click="sendDetails"
      ></q-btn>
    </q-card-section>
    <q-card-section class="text-center q-pt-none">
      <div class="text-grey-8">
        {{ signIn ? "Don't have an account yet?" : "Already have an account?"
        }}<a
          @click="signIn = !signIn"
          class="text-dark text-weight-bold cursor-pointer"
          style="text-decoration: none"
          >{{ signIn ? " Sign up." : " Sign in." }}</a
        >
      </div>
    </q-card-section>
  </q-card>
</template>
-->