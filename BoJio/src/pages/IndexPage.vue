<script setup>
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

const handleCreate = (event) => { //to add event to schedule,
  events.add(event)
}

</script>

<template>
  <div>
    <ScheduleXCalendar :calendar-app="calendarApp" />
  </div>
</template>
