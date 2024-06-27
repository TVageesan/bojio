<script setup>
import CalendarView from 'src/components/CalendarView.vue'
import TimeInput from 'src/components/TimeInput.vue';
import { getEvents, putEvent, postEvent, deleteEvent, getModules } from 'src/api';
import { watch, ref, computed, inject } from 'vue'
import { getCurrentDate } from 'src/utils/getDate'

const session = inject("session");
const cal = ref(null);
const index = ref(0);
const events = computed(() => cal.value?.events); //ref to events plugin of schedule-x

const max_index = (arr) => {
  let curr = -1
  for (const item in arr){
    if (curr < item.id) curr = item.id;
  }
  return curr;
}

const test = 'https://nusmods.com/timetable/sem-1/share?EE2026=TUT:05,LEC:01,LAB:02&EE2211=TUT:12,LEC:01&MA1100=LEC:1'

const importNUSMods = async (url) => {
  const { new_events, new_index } = await getModules(index.value,url)
  index.value = new_index;
  events.value.set(events.value.getAll().concat(new_events))
}

const loadEvents = async () => {
  if (!events.value || !session.value) return;
  const evts = await getEvents(session);
  index.value = max_index(evts);
  events.value.set(evts);
  importNUSMods(test); //for testing
};

watch([cal, session], loadEvents);

//DIALOG
const addDialog = ref(false);
const editDialog = ref(false);

const currEvent = ref({});

const addDialogTrigger = () => {
  currEvent.value = newEvent();
  addDialog.value = true;
}

const newEvent = () => ({
  title: 'New Event',
  start: getCurrentDate(),
  end: getCurrentDate(),
  location: 'Add Location',
  description: 'Add Description'
});

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

const addEvent = () => {
  const evt = { ...currEvent.value, id: ++index.value };
  events.value.add(evt);
  postEvent(session, evt);
};

const handleUpdateEvent = (evt) => { //triggers on drag/drop or resize
  putEvent(session,evt);
}
</script>

<template>
  <div>
  <q-dialog v-model="addDialog">
    <q-card style="min-width: 400px; min-height: 100px">
      <q-card-section>
        <div class="text-h6">New Event</div>
      </q-card-section>
      <q-card-section class="row justify-center">
        <q-input v-model="currEvent.title" label="Event Title" class="q-ma-md" style="width: 100%;">
          <template v-slot:label>
            <span style="font-size: 1.5rem;">Event Title</span>
          </template>
        </q-input>
        <TimeInput v-model="currEvent.start" label="Start"/>
        <TimeInput v-model="currEvent.end" label="End" />
        <q-input v-model="currEvent.location" label="Location" class="q-ma-md" style="width: 100%;">
          <template v-slot:before>
            <q-icon name="place" />
          </template>
        </q-input>
        <q-input v-model="currEvent.description" label="Description" class="q-ma-md" style="width: 100%;">
          <template v-slot:before>
            <q-icon name="notes" />
          </template>
        </q-input>
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
      :edit="true"
      ref="cal"
      @evt-click="handleEditEvent"
      @update = "handleUpdateEvent"
    />
  </q-page>
</div>
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
