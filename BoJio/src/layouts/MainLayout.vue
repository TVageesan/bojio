<template> 
  <q-layout 
    view="hHh Lpr lFf" 
    container 
    style="height: 800px" 
    class="shadow-2 rounded-borders" 
  > 
    <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'"> 
      <q-toolbar> 
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" /> 
        <q-toolbar-title 
          ><q-icon name="mood" class="q-mr-sm" />Bojio</q-toolbar-title 
        > 
      </q-toolbar> 
    </q-header> 
 
    <q-drawer 
      v-model="drawer" 
      show-if-above 
      :mini="miniState" 
      @mouseover="miniState = false" 
      @mouseout="miniState = true" 
      :width="200" 
      :breakpoint="500" 
      bordered 
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'" 
    > 
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }"> 
        <q-list padding> 
          <template v-for="(menuItem, index) in menuList" :key="index"> 
            <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple> 
              <q-item-section avatar> 
                <q-icon :name="menuItem.icon" /> 
              </q-item-section> 
              <q-item-section> 
                {{ menuItem.label }} 
              </q-item-section> 
              <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
                <strong>Tooltip</strong> on <em>left</em>
                (<q-icon name="keyboard_arrow_left"/>)
              </q-tooltip>
            </q-item> 
            <q-separator :key="'sep' + index" v-if="menuItem.separator" /> 
          </template> 
        </q-list> 
      </q-scroll-area> 
    </q-drawer> 
 
    <q-page-container> 
      <router-view /> 
    </q-page-container> 
  </q-layout> 
</template> 
 
<script setup> 
import { ref } from "vue"; 
 
const drawer = ref(false); 
const miniState = ref(true); 
 
const menuList = [ 
  { 
    icon: "calendar_today", 
    label: "Calendar", 
    separator: false, 
  }, 
  { 
    icon: "groups", 
    label: "Groups", 
    separator: false, 
  }, 
  { 
    icon: "search", 
    label: "Browse", 
    separator: false, 
  }, 
  { 
    icon: "event", 
    label: "Events", 
    separator: false, 
  }, 
]; 
</script> 