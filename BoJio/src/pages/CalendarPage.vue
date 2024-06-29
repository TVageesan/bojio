<script setup>
import CalendarView from "src/components/CalendarView.vue";
import EventDialog from "src/components/EventDialog.vue";
import {
  getEvents,
  putEvent,
  postEvent,
  deleteEvent,
  getModules,
  overwriteEvents,
  importEvents
} from "src/api";
import { watch, ref, computed, inject } from "vue";
import { toTime, toTimePlusHour } from "src/utils/getDate";


const session = inject("session");
const cal = ref(null);
const index = ref(0);
const events = computed(() => cal.value?.events); //ref to events plugin of schedule-x
const imported = ref(false);

const max_index = (arr) => {
  let curr = -1;
  for (const item of arr) {
    if (curr < item.id) curr = item.id;
    if (item.imported) imported.value = true;
  }
  return curr;
};

const importNUSMods = async (url) => {
  imported.value = true;
  const { new_events, new_index } = await getModules(index.value, url);
  index.value = new_index;
  let curr_events = events.value.getAll()

  if (imported.value) {
    await overwriteEvents(session);
    curr_events = curr_events.filter(({imported}) => imported == false);
  }
  await importEvents(session,new_events);
  events.value.set(curr_events.concat(new_events));
};

const handleImport = (url) => {
  importNUSMods(url);
  openDialog.value = false;
}

const loadEvents = async () => {
  if (!events.value || !session.value) return;
  const evts = await getEvents(session);
  index.value = max_index(evts);
  events.value.set(evts);
  //importNUSMods(test); //for testing
};

watch([cal, session], loadEvents);

//DIALOG
const openDialog = ref(false); //flag to trigger dialog open
const isEditDialog = ref(false); //track which type of dialog is being opened

const currEvent = ref({});

const addDialogTrigger = () => {
  currEvent.value = newEvent();
  openDialog.value = true;
  isEditDialog.value = false;
};

const editDialogTrigger = (evt) => {
  currEvent.value = evt;
  openDialog.value = true;
  isEditDialog.value = true;
};

const newEvent = () => {
  const current = new Date();
  return({
    title: "",
    start: toTime(current),
    end: toTimePlusHour(current),
    location: "",
    description: "",
  })
};

//EVENTS CRUD
const editEventUpdate = () => {
  const evt = currEvent.value;
  events.value.update(evt);
  putEvent(session, evt);
};

const editEventDelete = (id = currEvent.value.id) => {
  events.value.remove(id);
  deleteEvent(session, id);
};

const addEvent = () => {
  const evt = { ...currEvent.value, id: ++index.value };
  if (evt.title == '') evt.title = 'New Event';
  events.value.add(evt);
  postEvent(session, evt);
};

const handleUpdateEvent = (evt) => {
  //triggers on drag/drop or resize
  putEvent(session, evt);
};
</script>

<template>
  <q-dialog v-model="openDialog">
    <EventDialog
      v-model="currEvent"
      :imported="imported"
      :isEditable = "isEditDialog"
      @add="addEvent"
      @update="editEventUpdate"
      @delete="editEventDelete"
      @import="handleImport"
    />
  </q-dialog>
  <q-page>
    <q-btn class="float" icon="add" @click="addDialogTrigger" size="lg">
      Add Event
    </q-btn>
    <CalendarView
      :edit="true"
      ref="cal"
      @edit="editDialogTrigger"
      @update="handleUpdateEvent"
      @delete="editEventDelete"
    >
    </CalendarView>
  </q-page>
</template>

<style>
.float {
  position: fixed;
  background-color: white;
  color: black;
  bottom: 16px;
  right: 16px;
  z-index: 1000;
}
</style>
