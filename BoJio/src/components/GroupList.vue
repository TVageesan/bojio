<script setup>
import { ref } from 'vue';
const select = ref(-1);
const isCollapsed = ref(false);
const props = defineProps(['groups']);
</script>

<template>
    <div :class="['sidebar', { 'collapsed': isCollapsed }]">
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
      <q-btn
        @click="isCollapsed = !isCollapsed"
        class="toggle-btn"
        icon="keyboard_arrow_right"
        round
        dense
      />
    </div>
</template>

<style scoped>
.selected{
  background-color: black;
  color: white;
}
.sidebar {
  width: 300px;
  background-color: #f5f5f5;
  transition: width 0.3s;
  position: relative;
}

.sidebar.collapsed {
  width: 20px;
}

.toggle-btn {
  position: absolute;
  top: 50%;
  right: -10px;
  transform: translateY(-50%);
}

.sidebar.collapsed .toggle-btn {
  right: -10px;
  transform: rotate(180deg) translateY(-50%);
}

.section{
  height:40px
}
</style>
