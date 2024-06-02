<script setup>
const props = defineProps(['title','save'])
</script>
<template>
  <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
    <q-toolbar>
      <q-btn flat @click="$emit('drawer')" round dense icon="menu" />
      <q-toolbar-title> {{ title }} </q-toolbar-title>
      <q-btn v-if="save" flat @click="$emit('save')">Save</q-btn>
    </q-toolbar>
  </q-header>
</template>
