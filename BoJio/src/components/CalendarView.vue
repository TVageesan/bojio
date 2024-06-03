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
const { edit, users } = defineProps(['edit','users']);
let plugins = [events, createCurrentTimePlugin({ fullWeekWidth: true })]
if (edit) plugins = plugins.concat([createDragAndDropPlugin(15),createResizePlugin(15)])

const getRandomHexColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Function to lighten or darken a color
const adjustColor = (color, amount) => {
  return '#' + color.replace(/^#/, '').replace(/../g, (color) =>
    ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)
  );
};

// Function to generate a color object
const createColorObj = (user) => {
  const mainColor = getRandomHexColor();
  const containerColor = adjustColor(mainColor, 80); // Lighten the main color
  const onContainerColor = adjustColor(mainColor, -80); // Darken the main color

  return {
    colorName: user,
    lightColors:{
      main: mainColor,
      container: containerColor,
      onContainer: onContainerColor,
    }
  };
};


let calendars = {};
users.forEach(user => calendars[user] = createColorObj(user))
console.log('calendars',calendars);

const calendarApp = createCalendar({
  selectedDate: getCurrentDate(),
  dayBoundaries: {
    start: '06:00',
    end: '22:00',
  },
  calendars,
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
