<script setup>
import { ref, computed } from 'vue';
const select = ref(-1);
const isCollapsed = ref(false);
const props = defineProps(['groups']);
const search = ref('');

const filteredGroups = computed(() => {
  if (!search.value) {
    return groups.value;
  }
  return groups.value.filter(group => group.name.toLowerCase().includes(search.value.toLowerCase()));
});
</script>

<template>
  <q-list v-if="!isCollapsed" >
    <q-item
      v-for="(group,index) in filteredGroups"
      :key="index"
      clickable
      class = "section"
      :class="{'selected-rounded':select == index}"
      @click ="select=index;$emit('group-selected',index,group.name)">

      <q-item-section avatar>
        <!-- <q-icon :name="item.icon" /> -->
        <q-img src="https://cdn.quasar.dev/img/mountains.jpg"
        class="rounded-image"
        ratio="1"/>
      </q-item-section>

      <q-item-section class="text-h6">
        {{ group.name }}
      </q-item-section>

    </q-item>

    <q-item class="row q-pb-md q-mb-md">
      <q-btn
        class = "bg-green text-white col-grow q-ma-xs"
        icon="add"
        flat
        @click="$emit('group-add')"
      />
    </q-item>
  </q-list>
</template>

<style scoped>
.rounded-image {
  border-radius: 50%;
}

.q-item:hover:not(.selected-rounded){
  background-color: grey-3;
  color: black;
  border-radius: 10px;
}

.selected-rounded{
  background-color: black;
  color: white;
  border-radius: 10px;
}
</style>
