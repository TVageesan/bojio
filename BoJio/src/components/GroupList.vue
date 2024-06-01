<script setup>
import { ref } from 'vue';
const isCollapsed = ref(true);
const props = defineProps(['groups']);

</script>

<template>
    <!-- Sidebar -->
    <div :class="['sidebar', { 'collapsed': isCollapsed }]">
      <q-list v-if="!isCollapsed" dense>
        <q-item v-for="(item,index) in groups" :key="index" clickable>
          <q-item-section>{{ item.name }}</q-item-section>
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
