<script setup>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import { ref } from "vue";

const events = ref([]);

const newEvent = () => {
  //TODO add logic
  console.log("button clicked!");
};
</script>

<template>
  <q-page>

    <!-- "Add" Button -->
    <div class="q-pa-md q-gutter-sm">
      <q-btn round color="black" icon="add" @click="newEvent" label="" />
    </div>

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
