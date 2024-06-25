<script setup>
import { ref } from 'vue';
const select = ref(-1);
const isCollapsed = ref(false);
const props = defineProps(['groups']);
</script>

<template>
  <q-list v-if="!isCollapsed" dense>
    <q-item
      v-for="group in groups"
      :key="group.group_id"
      clickable
      class = "section"
      :class="{selected:select == group.group_id}"
      @click ="select=group.group_id;$emit('group-selected',group.group_id)">
      <q-item-section class="text-h6">
        {{ group.name }}
      </q-item-section>
      <q-item-section avatar>
        <!-- <q-icon :name="item.icon" /> -->
        AVATAR
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
