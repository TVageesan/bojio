<template>
    <div>
      <q-list>
        <q-item v-for="group in groups" :key="group.id" clickable @click="selectGroup(group)">
          <q-item-section>
            {{ group.name }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmit } from 'vue';
  
  const props = defineProps({
    groups: {
      type: Array,
      required: true
    }
  });
  
  const emit = defineEmit(['group-selected']);
  
  const selectGroup = (group) => {
    emit('group-selected', group);
  };
  </script>
  
  <style scoped>
  /* Add any specific styles for your component here */
  </style>
  