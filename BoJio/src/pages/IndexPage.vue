<script setup>
import { QCalendarDay, today } from '@quasar/quasar-ui-qcalendar/src/index.js'
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarDay.sass'
import NavigationBar from '../components/NavigationBar.vue'

import { ref } from 'vue';

const selectedDate = ref(today());

const calendar = ref("calendar")

const onToday = () => calendar.value.moveToToday();
const onPrev = () => calendar.value.prev();
const onNext = () => calendar.value.next();
</script>


<template>
  <div class="subcontent">
    <navigation-bar
      @today="onToday"
      @prev="onPrev"
      @next="onNext"
    />

    <div class="row justify-center">
      <div style="display: flex; max-width: 800px; width: 100%; height: 400px;">
        <q-calendar-day
          ref="calendar"
          v-model="selectedDate"
          dark
          animated
          @change="(data) => console.log(data)"
          @moved="(data) => console.log(data)"
          @click-date="(data) => console.log(data)"
          @click-time="(data) => console.log(data)"
          @click-interval="(data) => console.log(data)"
          @click-head-intervals="(data) => console.log(data)"
          @click-head-day="(data) => console.log(data)"
        />
      </div>
    </div>
  </div>
</template>

