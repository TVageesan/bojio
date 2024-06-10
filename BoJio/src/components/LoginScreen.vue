<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");
const toggleP = ref(true);
const toggleC = ref(true);
const confirmPassword = ref("");
const signIn = ref(true);

const emit = defineEmits(["login","signup"]);

const sendDetails = () => {
  if (signIn.value) {
    emit("login", email.value, password.value);
  } else {
    emit("signup", email.value, password.value, confirmPassword.value);
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
      <q-input dense outlined v-model="email" label="Email Address" />
      <q-input
        dense
        outlined
        class="q-mt-md"
        v-model="password"
        :type="toggleP ? 'password' : 'text'"
        label="Password"
        @keydown.enter.prevent="sendDetails"
      >
      <template v-slot:append>
          <q-icon
            :name="toggleP ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="toggleP = !toggleP"
          />
        </template>
      </q-input>
      <q-input
        v-if="!signIn"
        dense
        outlined
        class="q-mt-md"
        v-model="confirmPassword"
        :type="toggleC ? 'password' : 'text'"
        label="Confirm Password"
        @keydown.enter.prevent="sendDetails"
      >
      <template v-slot:append>
          <q-icon
            :name="toggleC ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="toggleC = !toggleC"
          />
        </template>
      </q-input>
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
