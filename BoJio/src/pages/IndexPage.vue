<script setup>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import { ref, inject, onMounted } from "vue";
import { getEvents } from "src/api";
import { postEvents } from "src/api";

const events = ref([]);

const newEvents = ref([]);
//TODO: Link this to a dialog with QInput and QTime Picker
//Refrence for vue-cal: https://antoniandre.github.io/vue-cal/#ex--other-event-creation-methods
const showCalendarDialog = ref(false);

const session = inject("session");

const handleCreate = (evt) => {
  console.log('create',evt);
  newEvents.value.push({
    _eid: evt._eid,
    start: evt.start,
    end: evt.end,
    title: "",
    content: "",
    class: "",
  });
  console.log('newEvents',newEvents.value);
  return evt;
};

const handleDelete = (evt) => {
  newEvents.value = newEvents.value.filter(e => e._eid != evt._eid);
  console.log('newEvents',newEvents.value);
  return evt;
}

const handleChange = (evt) => {
  newEvents.value = newEvents.value.map(e => (e._eid == evt.event._eid) ? evt.event : e)
  console.log('newEvents',newEvents.value);
  return evt;
}

const save = () => {
  if (newEvents.value){
    postEvents(session,newEvents.value);
  }
};

onMounted(() => {
  getEvents(session).then(resp => events.value = resp.data);
})
</script>

<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
      <q-toolbar-title>
        Your Schedule
      </q-toolbar-title>
      <q-btn flat @click="save">Save</q-btn>
    </q-toolbar>
  </q-header>
  <q-page>
    <vue-cal
      :selected-date="new Date()"
      :time-from="6 * 60"
      :time-to="25 * 60"
      :disable-views="['years', 'year']"
      :snap-to-time="15"
      :editable-events="{ title: false, drag: true, resize: true, delete: true, create: true }"
      @event-drag-create="handleCreate"
      @event-delete="handleDelete"
      @event-duration-change="handleChange"
      @event-content-change="handleChange"
      @event-drop="handleChange"
    ></vue-cal>
  </q-page>
</template>
