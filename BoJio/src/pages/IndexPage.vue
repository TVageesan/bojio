<script setup>
import { ScheduleXCalendar } from '@schedule-x/vue'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createResizePlugin } from '@schedule-x/resize'
import { createCurrentTimePlugin } from '@schedule-x/current-time'
import { createCalendar, viewDay, viewWeek, viewMonthGrid, viewMonthAgenda } from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import { date } from 'quasar'
//date-utils
const { formatDate } = date;

const toDate = (date) => formatDate(date,'YYYY-MM-DD')
const toTime = (date) => formatDate(date,'YYYY-MM-DD HH:mm')
const getCurrentDate = () => toTime(new Date());

//schedule-x
const events = createEventsServicePlugin();

const calendarApp = createCalendar({
  selectedDate: getCurrentDate(),
  views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
  defaultView: viewWeek.name,
  events: [],
  plugins:[
    events,
    createEventModalPlugin(),
    createDragAndDropPlugin(15),
    createResizePlugin(15),
    createCurrentTimePlugin({ fullWeekWidth: true })
  ]
})

const handleCreate = (event) => {
  events.add(event)
}
import HeaderComponent from 'src/components/HeaderComponent.vue'
</script>

<template>
  <HeaderComponent @drawer="$emit('drawer')" title="Your Schedule"/>
  <q-page>
    <ScheduleXCalendar :calendar-app="calendarApp" />
  </q-page>
</template>
