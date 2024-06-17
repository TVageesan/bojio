<script setup>
import { ScheduleXCalendar } from "@schedule-x/vue";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import { createResizePlugin } from "@schedule-x/resize";
import { createCurrentTimePlugin } from "@schedule-x/current-time";
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
const corePlugins = [events, createCurrentTimePlugin({ fullWeekWidth: true })]
const editPlugins = [createDragAndDropPlugin(15), createResizePlugin(15)]
const createPlugins = () => edit ? corePlugins.concat(editPlugins) : corePlugins

const createCalendarStyling = () => {
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
    return parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2
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
  dayBoundaries: {
    start: "06:00",
    end: "22:00",
  },
  calendars: createCalendarStyling(),
  callbacks: {
    onEventClick(evt) {
      emit("evt-click", evt);
    },
    onEventUpdate(evt) {
      emit("update", evt);
    },
  },
  views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
  defaultView: viewWeek.name,
  events: [],
  plugins: createPlugins(),
});

defineExpose({ events });
</script>

<template>
  <ScheduleXCalendar :calendar-app="calendarApp"/>
</template>

