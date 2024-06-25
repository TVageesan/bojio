<script setup>
import TimeInput from "src/components/TimeInput.vue";
const currEvent = defineModel();
const { isEditable } = defineProps(['isEditable'])
</script>
<template>
  <q-card style="min-width: 400px">
    <q-card-section class="q-pa-none bg-grey-3">
      <q-card-actions align="between">
        <div class="text-h6 q-pl-sm">Create Event</div>
        <q-btn flat size="md" icon="close" color="black" v-close-popup />
      </q-card-actions>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-input
        class="q-pa-md q-pb-lg"
        v-model="currEvent.title"
        input-class="text-h6"
        placeholder="New Event"
      />

      <div class="q-px-md row">
        <q-icon size="sm" name="schedule" class="q-pr-md text-grey-6" />
        <div class="col">
          <TimeInput v-model="currEvent.start" label="Start" class="q-mb-sm" />
          <TimeInput v-model="currEvent.end" label="End" />
        </div>
      </div>

      <q-input
        class="q-pa-md q-ma-none"
        v-model="currEvent.location"
        placeholder="Add location"
      >
        <template v-slot:before>
          <q-icon name="location_on" class="q-ma-none text-grey-6" />
        </template>
      </q-input>

      <q-input
        class="q-pa-md"
        v-model="currEvent.description"
        placeholder="Add description"
        filled
        type="textarea"
      >
        <template v-slot:before>
          <q-icon name="subject" class="text-grey-6" />
        </template>
      </q-input>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn
        v-if="isEditable"
        size="md"
        unelevated
        label="Delete"
        color="red"
        class="q-pr-sm"
        @click="$emit('delete')"
        v-close-popup
      />
      <q-btn
        size="md"
        unelevated
        label="Save"
        class="bg-primary text-white"
        @click="$emit('add')"
        v-close-popup
      />
    </q-card-actions>
  </q-card>
</template>
