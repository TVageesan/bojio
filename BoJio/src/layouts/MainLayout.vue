<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer
      v-model="drawer"
      show-if-above
      :width="200"
      :breakpoint="500"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
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

const menuList = [
  {
    icon: "inbox",
    label: "Calendar",
    separator: false,
  },
  {
    icon: "send",
    label: "Groups",
    separator: false,
  },
  {
    icon: "delete",
    label: "Browse",
    separator: false,
  },
  {
    icon: "feedback",
    label: "Events",
    separator: false,
  },
];
</script>
