<script setup>
import { ScheduleXCalendar } from "@schedule-x/vue";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import { createResizePlugin } from "@schedule-x/resize";
import { createCurrentTimePlugin } from "@schedule-x/current-time";
import { createEventModalPlugin } from '@schedule-x/event-modal'
import {
  createCalendar,
  viewDay,
  viewWeek,
  viewMonthGrid,
  viewMonthAgenda,
} from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/index.css";
import { getCurrentDate } from "src/utils/getDate";

const events = createEventsServicePlugin();
const emit = defineEmits(["evt-click", "update"]);

const { edit } = defineProps(["edit"]);
const corePlugins = [events, createCurrentTimePlugin({ fullWeekWidth: true }), createEventModalPlugin()]
const editPlugins = [createDragAndDropPlugin(15), createResizePlugin(15)]
const createPlugins = () => edit ? corePlugins.concat(editPlugins) : corePlugins

const createCalendarStyling = () => {
  if (edit) return {};

  //generate random hex colour
  const getRandomHexColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Function to lighten or darken a color
  const adjustColor = (color, amount) => {
    return (
      "#" +
      color
        .replace(/^#/, "")
        .replace(/../g, (color) =>
          (
            "0" +
            Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(
              16
            )
          ).substr(-2)
        )
    );
  };

  // Check if background is too dark for black text
  const isDark = (bgColor) => {
    const color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    const r = parseInt(color.substring(0, 2), 16); // hexToR
    const g = parseInt(color.substring(2, 4), 16); // hexToG
    const b = parseInt(color.substring(4, 6), 16); // hexToB
    return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186)
  }

  const createColorObj = (user) => {
    const mainColor = getRandomHexColor(); // Side bar colour
    const containerColor = adjustColor(mainColor, 80); // Main container colour

    return {
      colorName: user,
      lightColors: {
        main: mainColor,
        container: containerColor,
        onContainer: isDark(containerColor) ? '#FFFFFF' : '#000000'
      },
    };
  };

  let calendars = {};
  for (let i = 0; i < 100; i++) { //NOTE: Not best practice, but alternative (dynamic creation) is very very mafan
    calendars[i] = createColorObj(i);
  }
  return calendars;
};

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
  plugins:[
    events,
    createDragAndDropPlugin(15),
    createResizePlugin(15),
    createCurrentTimePlugin({ fullWeekWidth: true })
  ]
})

defineExpose({ events })
</script>

<template>
  <div style = "height:100vh">
    <ScheduleXCalendar :calendar-app="calendarApp">
      <template #eventModal="{ calendarEvent }">
        <q-card>
          {{ calendarEvent }}
        </q-card>
      </template>
    </ScheduleXCalendar>
  </div>
</template>
