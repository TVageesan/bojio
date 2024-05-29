<script setup>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import { ref } from "vue";

const events = ref([]);
</script>

<template>
  <q-page>
    {{ console.log(events) }}
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
