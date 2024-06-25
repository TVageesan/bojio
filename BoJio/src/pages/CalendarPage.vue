<script setup>
import HeaderComponent from 'src/components/HeaderComponent.vue'
import CalendarView from 'src/components/CalendarView.vue'
import TimeInput from 'src/components/TimeInput.vue';
import { getEvents, postEvents, deleteEvents } from 'src/api';
import { onMounted, watch, ref, computed, inject } from 'vue'
import { getCurrentDate } from 'src/utils/getDate'

const emit = defineEmits(['drawer'])
const session = inject('session');
const cal = ref(null);
const events = computed(() => cal.value?.events); //ref to events plugin of schedule-x
let count = -1;

watch(events, (eventPlugin, _) => {
  getEvents().then(resp => {
    const stored_events = resp.data.map(
      evt => ({
        id: evt.evt_id,
        start: evt.start_time,
        end: evt.end_time,
        title: evt.title,
      })
    )
    eventPlugin.set(stored_events);
    count = stored_events.length;
  });
})

const addDialog = ref(false);
const editDialog = ref(false);

const currEvent = ref(null)
let deletedEvents = [];


const newEvent = ref({
  title: 'New Event',
  start: getCurrentDate(),
  end: getCurrentDate(),
  location: 'Add Location',
  description: 'Add Description'
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
  console.log('adding',newEvent.value)
  events.value.add({...newEvent.value,id:count++})
}

const save = () => {
  postEvents(session, events.value.getAll()).then(resp => console.log('post resp', resp));
  if (deletedEvents.length > 0) deleteEvents(deletedEvents).then(resp => console.log('delete resp',resp));
}

onMounted(() => {
  console.log('curr count',count);
})

</script>

<template>
  <q-dialog v-model="addDialog">
    <q-card style="min-width: 400px; min-height: 100px;">
      <q-card-section>
        <div class="text-h6">New Event</div>
      </q-card-section>
      <q-card-section class="row justify-center">
        <q-input v-model="newEvent.title" label="Event Title" class="q-ma-md" style="width: 100%;">
          <template v-slot:label>
            <span style="font-size: 1.5rem;">Event Title</span>
          </template>
        </q-input>
        <TimeInput v-model="newEvent.start" label="Start"/>
        <TimeInput v-model="newEvent.end" label="End" />
        <q-input v-model="newEvent.location" label="Location" class="q-ma-md" style="width: 100%;">
          <template v-slot:before>
            <q-icon name="place" />
          </template>
        </q-input>
        <q-input v-model="newEvent.description" label="Description" class="q-ma-md" style="width: 100%;">
          <template v-slot:before>
            <q-icon name="notes" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat color="positive" label="Add" @click="addEvent" v-close-popup/>
        <q-btn flat color="negative" label="Cancel" v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog :v-model="false">
    <q-card style="min-width: 400px; min-height: 100px">
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

  <q-btn @click="addDialog = true">Add Event</q-btn>
  <HeaderComponent @drawer="$emit('drawer')" @save="save" title="Your Schedule" />
  <q-page>
    <CalendarView ref="cal" @evt-click="editEvent" />
  </q-page>
</template>
