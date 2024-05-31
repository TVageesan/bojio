<script setup>
import { ref } from 'vue';
import { ScheduleXCalendar } from '@schedule-x/vue'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createResizePlugin } from '@schedule-x/resize'
import { createCurrentTimePlugin } from '@schedule-x/current-time'

import {
  createCalendar,
  viewDay,
  viewWeek,
  viewMonthGrid,
  viewMonthAgenda,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'

const events = createEventsServicePlugin();

const calendarApp = createCalendar({
  selectedDate: '2023-12-19',
  views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
  defaultView: viewWeek.name,
  events: [],
  plugins:[
    events,
    createEventModalPlugin(),
    createDragAndDropPlugin(),
    createResizePlugin(),
    createCurrentTimePlugin()
  ]
})

const handleCreate = (event) => { //to add event to schedule, just call this function with ur evt object
  events.add(event)
}

//NOTE: I wrote below how I would've written this dialog, just to show the easier way

//How I would've written this^:
//I think this way gives you more fine-tune of the dialog styling + way less mafan to write imo lol
const openDialog = ref(false); // set to true to trigger dialog open
const exampleInput = ref(''); // keep track of your input fields with refs
//with more refs for each input you want track...

const handleSubmit = () => {
  let newEvt = {
    title: exampleInput.value, // extract the info you need from your refs
    //start: startTime.value, etc...
  }
  handleCreate(newEvt) // then send the created event to my calendar
}
//Also see below in template for rest of the dialog code
</script>

<template>
  <!-- How I would've written it pt.2 -->
  <q-dialog v-model="openDialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">New Event</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Event Name
      </q-card-section>

      <q-input label="example input" v-model="exampleInput"></q-input>

      <q-card-actions align="right">
        <q-btn color="primary" label="Add" @click="addEvent" />
          <q-btn color="negative" label="Cancel" @click="openDialog = false" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <div class="q-pa-md q-gutter-sm">
    <q-btn round color="black" icon="add" @click="openDialog = true" label="" />
  </div>
  <!-- How I would've written it ^-->

  <div>
    <ScheduleXCalendar :calendar-app="calendarApp" />
  </div>
</template>
