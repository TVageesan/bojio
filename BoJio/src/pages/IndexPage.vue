<script setup>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import { ref } from 'vue'
import getEvents from 'src/api.js'

const events =  ref([])

getEvents(1).then(e => events.value = e.data.map(data => ({
    start: data.start,
    end: data.end,
    title: data.title,
    content: data.content,
    class: 'blue-event',
    deletable: true,
    resizable: true,
    draggable: true
})));

</script>


<template>
  <q-page>
    <vue-cal selected-date="2018-11-19"
      :time-from="10 * 60"
      :time-to="23 * 60"
      :disable-views="['years', 'year']"
      hide-view-selector
      hide-weekends
      :editable-events="{ title: false, drag: true, resize: true, delete: true, create: true }"
      :events="events"
      class="vuecal--full-height-delete">
    </vue-cal>
  </q-page>
</template>

