<template>
    <div class="group-list">
      <div v-for="(group, groupIndex) in groups" :key="groupIndex" class="group">
        <h3>{{ group.name }}</h3>
        <ul>
          <li v-for="(item, itemIndex) in group.items" :key="itemIndex">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  // Define props for the component
  const props = defineProps({
    groups: {
      type: Array,
      required: true,
      default: () => []
    }
  })
  </script>
  
  <style scoped>
  .group-list {
    padding: 16px;
  }
  
  .group {
    margin-bottom: 24px;
  }
  
  .group h3 {
    margin-bottom: 8px;
  }
  
  .group ul {
    list-style-type: none;
    padding-left: 0;
  }
  
  .group li {
    padding: 4px 0;
  }
  </style>
  