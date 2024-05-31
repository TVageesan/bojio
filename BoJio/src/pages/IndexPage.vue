<script setup>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import { ref } from "vue";
import { useQuasar } from 'quasar'

const events = ref([]);
const dialogModel = ref(false);
const $q = useQuasar()

const newEvent = () => {
  $q.dialog({
    title: 'New Event',
    message: 'Event Name',
    newEvent: {
      model: '',
      isValid: val => val.length > 2, 
      type: 'text'
    },
    cancel: true,
    persistent: true
  }).onOk(data => {
    // need to do some console log stuff
  })
}
</script>

<template>
  <q-page>

    <!-- "Add" Button -->
    <div class="q-pa-md q-gutter-sm">
      <q-btn round color="black" icon="add" @click="newEvent" label="" />
    </div>

    <!-- Calendar -->
    <vue-cal
      :selected-date="new Date()"
      :time-from="6 * 60"
      :time-to="25 * 60"
      :disable-views="['years', 'year']"
      editable-events
      :events="events"
      @event-create="(evt) => console.log(evt)"
      class="vuecal--full-height-delete"
    >
    </vue-cal>
  </q-page>
</template>
