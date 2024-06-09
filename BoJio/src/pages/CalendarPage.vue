<script setup>
import CalendarView from 'src/components/CalendarView.vue'
import TimeInput from 'src/components/TimeInput.vue';
import { getEvents, postEvents, deleteEvents } from 'src/api';
import { watch, ref, computed, inject, onBeforeUnmount, onBeforeMount } from 'vue'
import { getCurrentDate } from 'src/utils/getDate'

const emit = defineEmits(['drawer']);
const session = inject('session');
const cal = ref(null);
const events = computed(() => cal.value?.events); //ref to events plugin of schedule-x
let index = 0;

const loadEvents = () => {
  if (events.value && session.value) {
    getEvents(session).then(resp => {
      const stored_events = resp.data.map(evt => ({
        id: evt.evt_id,
        start: evt.start_time,
        end: evt.end_time,
        title: evt.title,
      }));
      events.value.set(stored_events);
      stored_events.forEach(e => {if (e.id > index) index = e.id})
      console.log('load events',stored_events)
    });
  }
};

watch(cal, (eventPlugin) => {
  loadEvents();
});

watch(session, (eventPlugin) => {
  loadEvents();
});



const addDialog = ref(false);
const editDialog = ref(false);

const currEvent = ref(null);
let deletedEvents = [];

const newEvent = ref({
  title: 'New Event',
  start: getCurrentDate(),
  end: getCurrentDate()
})

const editEvent = (evt) => {
  currEvent.value = evt;
  editDialog.value = true;
}

const editEventUpdate = () => {
  events.value.update(currEvent.value);
}

const editEventDelete = () => {
  deletedEvents.push(currEvent.value.id);
  events.value.remove(currEvent.value.id);
}

const addEvent = () => {
  events.value.add({...newEvent.value,id:index++})
  console.log('getall',events.value.getAll());
}

const save = () => {
  postEvents(session, events.value.getAll()).then(resp => console.log('post resp', resp));
  if (deletedEvents.length > 0) deleteEvents(session,deletedEvents).then(resp => console.log('delete resp',resp));
}

onBeforeMount(() => {
  window.addEventListener("mouseup", save)
});

</script>

<template>
  <q-dialog v-model="addDialog">
    <q-card style="min-width: 400px; min-height: 100px;">
      <q-card-section>
        <div class="text-h6">New Event</div>
      </q-card-section>
      <q-card-section class="row justify-center">
        <q-input   v-model="newEvent.title" label="Event Title" class="q-ma-md" style="width: 100%;"></q-input>
        <TimeInput v-model="newEvent.start" label="Start"/>
        <TimeInput v-model="newEvent.end"   label="End" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat color="positive" label="Add" @click="addEvent" v-close-popup/>
        <q-btn flat color="negative" label="Cancel" v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="editDialog">
    <q-card style="min-width: 400px; min-height: 100px;">
      <q-card-section>
        <div class="text-h6">Editing {{currEvent.title}}</div>
      </q-card-section>
      <q-card-section class="row justify-center">
        <q-input   v-model="currEvent.title" label="Event Title" class="q-ma-md" style="width: 100%;"></q-input>
        <TimeInput v-model="currEvent.start" label="Start"/>
        <TimeInput v-model="currEvent.end"   label="End" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat color="positive" label="Edit" @click="editEventUpdate" v-close-popup/>
        <q-btn flat color="negative" label="Delete" @click="editEventDelete" v-close-popup/>
        <q-btn flat color="primary" label="Cancel" v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-page>
    <q-btn
        class="float"
        icon="add"
        @click="addDialog = true"
        size="lg"
      >
      Add Event
      </q-btn>
    <CalendarView :users="[]" :edit="true" ref="cal" @evt-click="editEvent" />
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
