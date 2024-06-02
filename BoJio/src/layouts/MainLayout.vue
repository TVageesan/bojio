<script setup>
import { ref } from 'vue';
const drawer = ref(false);
const miniState = ref(true);
const select = ref();
const menuList = [
  {
    icon: "calendar_today",
    label: "Calendar",
    tooltip: "View your personal calendar",
    route: '/',
  },
  {
    icon: "groups",
    label: "Groups",
    tooltip: "View your friend groups",
    route: '/group',
  },
  {
    icon: "search",
    label: "Browse",
    tooltip: "Search for activities",
    route: '/',
  },
  {
    icon: "event",
    label: "Events",
    tooltip: "Explore events near you",
    route: '/',
  },
];

</script>

<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff">
      <q-drawer
        v-model="drawer"
        show-if-above
        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        :width="160"
        :breakpoint="500"
        class="bg-grey-3"
      >
        <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
          <q-list padding>
            <q-item v-if="miniState">
              <q-item-section avatar>
                <q-icon name="mood" />
              </q-item-section>
            </q-item>
            <q-item class = "text-h5 text-black text-bold" v-else>
              BoJio
            </q-item>
            <q-item
              v-for="(menuItem, index) in menuList"
              :key="index"
              :class="{ selected: select == index }"
              @click="select = index;$router.push(menuItem.route)" clickable v-ripple
            >
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
        <router-view @drawer="drawer = !drawer"></router-view>
      </q-page-container>
    </q-layout>
  </div>
</template>

<style>
.selected{
  background-color: black;
  color:white;
}

.example::-webkit-scrollbar {
    display: none;
}
.scroll {

  overflow: hidden;
}

/* Hide scrollbar for IE, Edge and Firefox */
.example {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
