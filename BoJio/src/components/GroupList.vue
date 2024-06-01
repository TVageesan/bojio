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
          v-for="(item,index) in groups"
          :key="index"
          clickable
          :class="{selected:select == index}"
          @click ="select=index;$emit('group-selected',index)">
          <q-item-section class="text-h6">
            {{ item.name }}
          </q-item-section>
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
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
</style>
