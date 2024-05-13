<script setup>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import { ref } from 'vue'
import getEvents from 'src/api.js'

const events =  ref([
  {
    start: '2018-11-20 14:00',
    end: '2018-11-20 17:30',
    title: 'Boring event',
    content: '<i class="icon material-icons">block</i><br>I am not draggable, not resizable and not deletable.',
    class: 'blue-event',
    deletable: false,
    resizable: false,
    draggable: true
  }
])

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

