<script setup>
import { defineProps, defineEmits } from 'vue';
const props = defineProps({
  isOpen: Boolean
});
const emit = defineEmits(['update:isOpen']);
const closeDialog = () => {
  emit('update:isOpen', false);
};
</script>

<template>
  <q-dialog :model-value="isOpen" @update:model-value="closeDialog" persistent>
    <q-card>
        <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />
        <q-uploader
          url="http://localhost:4444/upload"
          label="Change Profile Picture"
          style="max-width: 300px"
        />
      <q-card-section class="text-h6">
        Profile
      </q-card-section>
      <q-card-section>
        Your profile details go here.
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Close" @click="closeDialog" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>