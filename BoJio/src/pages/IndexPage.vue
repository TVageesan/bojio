<script setup>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import { ref } from 'vue'
const events =  ref([
  {
    start: '2018-11-20 14:00',
    end: '2018-11-20 17:30',
    title: 'Boring event',
    content: '<i class="icon material-icons">block</i><br>I am not draggable, not resizable and not deletable.',
    class: 'blue-event',
    deletable: true,
    resizable: true,
    draggable: true
  },
])
</script>


<template>
  <q-page>
      <vue-cal
        style = "height:800px"
        hide-view-selector
        hide-title-bar
        hide-weekends
        :time-from="7 * 60"
        :time-to="24 * 60"
        :disable-views="['years', 'year', 'month', 'day']"
        :editable-events="{ title: true, drag: true, resize: true, delete: true, create: true }"
        :events = "events"
        :drag-to-create-threshold="0">
      </vue-cal>
  </q-page>
</template>

