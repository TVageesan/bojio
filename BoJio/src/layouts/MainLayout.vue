<template>
  {{console.log('select',select)}}
  <q-layout view="lHh lpR lFf">
    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      bordered
      :width="220"
      :breakpoint="500"
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
        <q-list padding seperator>
          <q-item v-if="miniState">
            <q-item-section avatar>
              <q-icon name="mood" />
            </q-item-section>
          </q-item>
          <q-item header class = "text-h5 text-black" v-else>
            <b>BoJio</b>
          </q-item>
          <q-item :class="{ selected : select == index }" v-for="(menuItem, index) in menuList" :key="index" @click="select = index" clickable v-ripple>
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>
              {{ menuItem.label }}
            </q-item-section>
            <q-tooltip anchor="center left" self="center right" style="white-space: nowrap">
              {{ menuItem.tooltip }}
            </q-tooltip>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view @drawer="drawer = !drawer" />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

const drawer = ref(false);
const miniState = ref(true);
const select = ref(null);

// List items
const menuList = [
  {
    icon: "calendar_today",
    label: "Calendar",
    tooltip: "View your personal calendar"
  },
  {
    icon: "groups",
    label: "Groups",
    tooltip: "View your friend groups"
  },
  {
    icon: "search",
    label: "Browse",
    tooltip: "Search for activities"
  },
  {
    icon: "event",
    label: "Events",
    tooltip: "Explore events near you"
  },
];
</script>
<style>
.selected{
  background-color: black;
  color:white;

}
</style>
