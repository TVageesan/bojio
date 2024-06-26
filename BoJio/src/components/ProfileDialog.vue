<script setup>
import { ref, inject } from 'vue';
import { uploadImage, downloadImage } from 'src/api.js';
import { onMounted } from 'vue';
const open = defineModel();
const uploading = ref(null);
const text = inject('pText');
const session = inject('session');
const url = ref(null);

const upload = async () => {
  if (!uploading.value){
    console.log('no file to upload');
    return;
  }
  if (url.value == ''){
    console.log('uploading',uploading.value);
    uploadImage(session,uploading.value);
  }else{
    console.log('url check failed',url.value);
    uploadImage(session,uploading.value);
  }
  url.value = URL.createObjectURL(uploading.value);
  uploading.value = null;
}

onMounted(async () => {
  url.value = await downloadImage(session);
})

</script>

<template>
  <q-dialog v-model="open" persistent>
    <q-card>
      <q-card-actions class="row justify-between">
        <div class="text-h6">Profile</div>
        <q-btn flat label="Close" v-close-popup />
      </q-card-actions>
      <q-card-section>
        <q-img :src="url" />
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
