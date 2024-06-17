<script setup>
import CalendarView from 'src/components/CalendarView.vue'
import TimeInput from 'src/components/TimeInput.vue';
import { getEvents, putEvent, postEvent, deleteEvent } from 'src/api';
import { watch, ref, computed, inject } from 'vue'
import { getCurrentDate } from 'src/utils/getDate'

const session = inject("session");
const cal = ref(null);
const events = computed(() => cal.value?.events); //ref to events plugin of schedule-x

let index = 0;

const max_index = (arr) => {
  let curr = -1
  for (const item in arr){
    if (curr < item.id) curr = item.id;
  }
  return curr;
}

const loadEvents = async () => {
  const evts = await getEvents(session);
  events.value.set(evts);
  index = max_index(evts);
};

watch([cal, session], () => {if (events.value && session.value) loadEvents()});

//DIALOG

const addDialog = ref(false);
const editDialog = ref(false);

const newEvent = () => ({
  title: "New Event",
  start: getCurrentDate(),
  end: getCurrentDate(),
});

const currEvent = ref();

const addDialogTrigger = () => {
  currEvent.value = newEvent();
  addDialog.value = true;
}

const handleEditEvent = (evt) => {
  currEvent.value = evt;
  editDialog.value = true;
};

//EVENTS CRUD
const editEventUpdate = () => {
  const evt = currEvent.value;
  events.value.update(evt);
  putEvent(session, evt);
};

const editEventDelete = () => {
  const id = currEvent.value.id;
  events.value.remove(id);
  deleteEvent(session, id);
};

const addEvent = async () => {
  const evt = { ...currEvent.value, id: ++index };
  const resp = await postEvent(session, evt);
  //console.log('post resp',resp)
  //add error handling: notify user something went wrong
  events.value.add(evt);
};

const handleUpdateEvent = (evt) => {
  console.log('received',evt);
  putEvent(session,evt).then(resp => console.log('put resp',resp));
}
</script>

<template>
  <q-dialog v-model="addDialog">
    <q-card style="min-width: 400px; min-height: 100px">
      <q-card-section>
        <div class="text-h6">New Event</div>
      </q-card-section>
      <q-card-section class="row justify-center">
        <q-input
          v-model="currEvent.title"
          label="Event Title"
          class="q-ma-md"
          style="width: 100%"
        ></q-input>
        <TimeInput v-model="currEvent.start" label="Start" />
        <TimeInput v-model="currEvent.end" label="End" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          flat
          color="positive"
          label="Add"
          @click="addEvent"
          v-close-popup
        />
        <q-btn flat color="negative" label="Cancel" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="editDialog">
    <q-card style="min-width: 400px; min-height: 100px">
      <q-card-section>
        <div class="text-h6">Editing {{ currEvent.title }}</div>
      </q-card-section>
      <q-card-section class="row justify-center">
        <q-input
          v-model="currEvent.title"
          label="Event Title"
          class="q-ma-md"
          style="width: 100%"
        ></q-input>
        <TimeInput v-model="currEvent.start" label="Start" />
        <TimeInput v-model="currEvent.end" label="End" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          flat
          color="positive"
          label="Edit"
          @click="editEventUpdate"
          v-close-popup
        />
        <q-btn
          flat
          color="negative"
          label="Delete"
          @click="editEventDelete"
          v-close-popup
        />
        <q-btn flat color="primary" label="Cancel" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-page>
    <q-btn class="float" icon="add" @click="addDialogTrigger" size="lg">
      Add Event
    </q-btn>
    <CalendarView
      :users="[]"
      :edit="true"
      ref="cal"
      @evt-click="handleEditEvent"
      @update = "handleUpdateEvent"
    />
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
