<template>
    <q-list>
      <q-item v-for="item in items" :key="item.id" @click="select = index /*some routing needed*/ " clickable v-ripple>
        <q-item-section avatar>
        <q-icon :name="item.icon" />
      </q-item-section>
        <q-item-section>{{ item.name }}</q-item-section>
      </q-item>
    </q-list>
  </template>
  
  <script setup>
  import { ref } from 'vue';

  const items = [
  {
    icon: "calendar_today",
    name: "Group 1",
    route: '/',
  },
  {
    icon: "calendar_today",
    name: "Group 2",
    route: '/',
  },
  {
    icon: "calendar_today",
    name: "Group 3",
    route: '/',
  },
];
  </script>