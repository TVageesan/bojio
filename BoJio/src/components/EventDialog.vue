<script setup>
import TimeInput from "src/components/TimeInput.vue";
import { ref } from "vue";
import { useQuasar } from "quasar";
const $q = useQuasar();
const emit = defineEmits(['import','add','delete']);
const url = ref('');
const currEvent = defineModel();
const { isEditable, imported } = defineProps(['isEditable', 'imported']);
const regex = /^https:\/\/nusmods\.com\/timetable\/sem-[12]\/share$/;

const confirmSend = (url) => {
  emit('import',url)
  $q.notify({
    timeout: 3000,
    color: 'green',
    message: 'Imported your Modules!'
  })
}

const send = (url) => {
  const baseUrl = url.split('?')[0]
  if (regex.test(baseUrl)){
    if (imported){
      $q.dialog(
        {
          title: 'Are you sure you want to import?',
          message: 'You currently have events imported from NUSMods. Importing again will replace these events with new ones.',
          multiline: true,
          cancel: true,
        }
      ).onOk(() => confirmSend(url));
    }else{
      confirmSend(url)
    }
  }else{
    $q.notify({
      timeout: 3000,
      color: 'red',
      message: 'Invalid url.'
    })
  }
}
</script>
<template>
  <q-card style="min-width: 400px">
    <q-card-section class="q-pa-none bg-grey-3">
      <q-card-actions align="between">
        <div class="text-h6 q-pl-sm">{{ isEditable ? 'Edit Event':'Create Event'}}</div>
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
      <q-toggle v-model="currEvent.recurring" label="Weekly" class="q-mb-md" />
    </q-card-section>
    <q-card-actions v-if="isEditable" align="right">
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
        @click="$emit('update')"
        v-close-popup
      />
    </q-card-actions>
    <q-card-actions v-else class="row justify-between">
      <q-btn
        size="md"
        outline
        label="NUSMods Sync"
        icon="sync"
        color="primary"
      >
        <q-popup-proxy>
          <q-card style="min-width: 300px;">
            <q-card-section class="q-pb-none">
              <div class="text-h6 q-px-sm">Sync Your Schedules</div>
              <div class="text-body q-pa-sm"> Copy a share link from NUSMods here to import your scheduled events. </div>
              <q-input v-model="url" square filled>
                <template v-slot:append>
                  <q-btn
                    @click="send(url)"
                    color="primary"
                    icon="add"
                    flat
                  />
                </template>
              </q-input>
            </q-card-section>
            <q-card-actions align="right">
            </q-card-actions>
          </q-card>
        </q-popup-proxy>
      </q-btn>
      <q-btn
        size="md"
        unelevated
        label="Create"
        class="bg-primary text-white"
        @click="$emit('add')"
        v-close-popup
      />
    </q-card-actions>
  </q-card>
</template>
