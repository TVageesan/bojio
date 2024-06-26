<script setup>
import { ref, inject } from 'vue';
import { uploadImage } from 'src/api.js';
const open = defineModel();
const uploading = ref(null);
const url = inject('pUrl');
const text = inject('pText');
const session = inject('session');

const upload = async () => {
  if (!uploading.value){
    console.log('no file to upload');
  }
  else{
    if (url.value == ''){
      console.log('uploading',uploading.value);
      uploadImage(session,uploading.value);
    }else{
      console.log('url check failed',url.value);
      uploadImage(session,uploading.value);
    }
  }
  uploading.value = null;
}

</script>

<template>
  <q-dialog v-model="open" persistent>
    <q-card>
      <q-card-actions class="row justify-between">
        <div class="text-h6">Profile</div>
        <q-btn flat label="Close" v-close-popup />
      </q-card-actions>
      <q-card-section>
        <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />
        <q-file outlined v-model="uploading" label="Outlined">
          <template v-slot:append>
            <q-btn icon="upload" flat @click="upload"/>
          </template>
        </q-file>
        <q-input v-model="text" label="Name" />
        <div>
          {{ console.log('file',uploading) }}
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
