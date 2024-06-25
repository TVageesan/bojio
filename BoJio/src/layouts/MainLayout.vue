<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { QDrawer, QScrollArea, QList, QItem, QItemSection, QIcon, QTooltip, QLayout, QPageContainer } from 'quasar';
import ProfileDialog from 'src/components/ProfileDialog.vue';

const router = useRouter();
const drawer = ref(false);
const miniState = ref(true);
const select = ref(-1);
const profileDialog = ref(false);

const menuList = [
  {
    icon: "calendar_today",
    label: "Calendar",
    tooltip: "View your personal calendar",
    route: "/",
  },
  {
    icon: "groups",
    label: "Groups",
    tooltip: "View your friend groups",
    route: "/group",
  },
  {
    icon: "search",
    label: "Browse",
    tooltip: "Search for activities",
    route: "/search",
  },
  {
    icon: "event",
    label: "Events",
    tooltip: "Explore events near you",
    route: "/events",
  },
  {
    icon: "person",
    label: "Profile",
    tooltip: "View Profile",
    action: () => { profileDialog.value = true; },
  },
];

const handleMenuClick = (menuItem, index) => {
  select.value = index;
  if (menuItem.route) {
    router.push(menuItem.route);
  } else if (menuItem.action) {
    menuItem.action();
  }
};
</script>

<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff">
      <q-drawer
        v-model="drawer"
        show-if-above
        :mini="miniState"
        :width="160"
        :breakpoint="500"
        class="bg-grey-3"
      >
        <q-list padding>
          <q-item avatar>
            <q-item-section
              class="text-h5 text-black text-bold"
              v-if="!miniState"
            >
              BoJio
            </q-item-section>
            <q-item-section side @click="miniState = !miniState" class="text-black">
              <q-icon name="menu" v-if="miniState"/>
              <q-icon name="close" v-else />
            </q-item-section>
          </q-item>

          <q-separator />
          <div>
            <q-item
            v-for="(menuItem, index) in menuList"
            :key="index"
            :class="{ selected: menuItem.route == $route.path }"
            @click="
              select = index;
              $router.push(menuItem.route);
            "
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>
              {{ menuItem.label }}
            </q-item-section>
            <q-tooltip
              anchor="center left"
              self="center right"
              style="white-space: nowrap"
            >
              {{ menuItem.tooltip }}
            </q-tooltip>
          </q-item>
          </div>

          <q-item>
            <q-item-section avatar>
              <q-icon name="delete" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>

      <q-page-container>
        <router-view></router-view>
      </q-page-container>

      <ProfileDialog :isOpen="profileDialog" @update:isOpen="profileDialog = $event" />
    </q-layout>
  </div>
</template>

<style>
.selected {
  background-color: black;
  color:  white;
}
</style>