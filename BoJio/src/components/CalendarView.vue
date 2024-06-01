<script setup>
import { ScheduleXCalendar } from '@schedule-x/vue'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createResizePlugin } from '@schedule-x/resize'
import { createCurrentTimePlugin } from '@schedule-x/current-time'
import { createCalendar, viewDay, viewWeek, viewMonthGrid, viewMonthAgenda } from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import { getCurrentDate } from 'src/utils/getDate'

const events = createEventsServicePlugin();
const emit = defineEmits(['evt-click'])
const { edit } = defineProps(['edit']);
let plugins = [events, createCurrentTimePlugin({ fullWeekWidth: true })]
if (edit) plugins = plugins.concat([createDragAndDropPlugin(15),createResizePlugin(15)])


const calendarApp = createCalendar({
  selectedDate: getCurrentDate(),
  callbacks:{
    onEventClick(evt) {
      emit('evt-click',evt)
    }
  },
  views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
  defaultView: viewWeek.name,
  events: [],
  plugins
})

defineExpose({ events })
</script>

<template>
  <ScheduleXCalendar :calendar-app="calendarApp" />
</template>
