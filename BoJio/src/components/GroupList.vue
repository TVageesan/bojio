<template>
    <q-list>
        <q-item v-for="(item, index) in Groups" 
        :key="item.id"
        :class="{ selected: select === index }" 
        @click="select.value = index; emit('groupIDSelected')"  
        clickable v-ripple>
        <q-item-section avatar>
        <q-icon :name="item.icon" />
      </q-item-section>
        <q-item-section>{{ item.name }}</q-item-section>
      </q-item>
    </q-list>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  const emit = defineEmits("groupID Selected");

  const Groups = [
  {
    icon: "calendar_today",
    name: "Group 1",
    groupID: "A"
  },
  {
    icon: "calendar_today",
    name: "Group 2",
    groupID: "B"
  },
  {
    icon: "calendar_today",
    name: "Group 3",
    groupID: "C"
  },
  {
    icon: "calendar_today",
    name: "Group 4",
    groupID: "D"
  },
  {
    icon: "calendar_today",
    name: "Group 5",
    groupID: "E"
  },
];
  </script>

<style>
.selected{
  background-color: black;
  color:white;
}
</style>