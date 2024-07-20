<script setup>
import { ref, inject, watch } from 'vue';
import { uploadImage, downloadImage, getUsername, putUsername, logoutUser } from 'src/api.js';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';


const router = useRouter();
const open = ref(false);
const uploading = ref(null);
const session = inject('session');
const text = ref('New user');
const url = ref(null);

const upload = async () => {
  if (!uploading.value) {
    return;
  }

  await uploadImage(session, uploading.value);
  url.value = URL.createObjectURL(uploading.value);
  console.log()
  uploading.value = null;
}

const logout = async () => {
  await logoutUser();
  router.push('/');
}

const save = async () => {
  const result = await putUsername(session,text.value);
}

const loadData = async () => {
  url.value = await downloadImage(session);
  const name = (await getUsername(session)).data[0]?.name;
  if (name) text.value = name;
}

watch(session,() => loadData());
onMounted(loadData);
</script>

<template>
  <q-item clickable v-ripple @click="open = true">
    <q-item-section avatar>
      <q-avatar>
        <img :src="url" />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      {{ text }}
    </q-item-section>
    <q-tooltip anchor="center left" self="center right" style="white-space: nowrap">
      View/Edit your profile
    </q-tooltip>
  </q-item>

  <q-dialog v-model="open">
    <q-card>
      <q-card-section class="q-pa-none bg-grey-3">
        <q-card-actions align="between">
          <div class="text-h6 q-pl-sm">Profile</div>
          <q-btn flat size="md" icon="close" color="black" v-close-popup />
        </q-card-actions>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-card-section avatar class="row justify-center items-end edit">
          <div>
            <q-avatar color="black" style="width:200px;height:200px;">
              <img class="q-pa-xs" loading="eager" :src="url" />
            </q-avatar>
            <q-icon size="sm" class="text-grey icon" name="edit">
              <q-popup-edit v-model="text" class="text-white">
                <q-file outlined v-model="uploading" label="Upload a new profile picture">
                  <template v-slot:append>
                    <q-btn icon="upload" flat @click="upload" />
                  </template>
                </q-file>
              </q-popup-edit>
            </q-icon>
          </div>
        </q-card-section>
        <q-card-section class="row justify-center edit">
          <div class="row items-center cursor-pointer">
            <div class="text-h4">{{ text }}</div>
            <q-icon size="sm" color="grey" name="edit" class="icon">
              <q-popup-edit v-model="text" class="bg-primary text-white" v-slot="scope">
                <q-input dark color="white" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
                  <template v-slot:append>
                    <q-icon name="check" @click="scope.set" />
                  </template>
                </q-input>
              </q-popup-edit>
            </q-icon>
          </div>

        </q-card-section>

        <q-card-actions align="right">
          <q-btn size="md" unelevated label="Save" color="green" class="q-pr-sm" @click="save" v-close-popup />
          <q-btn size="md" unelevated label="Logout" color="black" @click="logout" v-close-popup />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<style scoped>
.edit .icon {
  visibility: hidden;
  opacity: 0;
  transition: .3s;
}

.edit:hover .icon {
  visibility: visible;
  opacity: 1;
  transition: .3s;
}
</style>
