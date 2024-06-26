<script setup>
import { ref, provide } from 'vue';
import { useRouter } from 'vue-router';
import ProfileDialog from 'src/components/ProfileDialog.vue';

const router = useRouter();
const drawer = ref(false);
const miniState = ref(true);
const select = ref(-1);
const profileDialog = ref(false);
const profileText = ref('');
const profileUrl = ref('');
provide('pText',profileText);
provide('pUrl',profileUrl);
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
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        :width="160"
        :breakpoint="500"
        class="bg-grey-3 column"
      >
        <q-list style="flex: 1">
          <q-item avatar>
            <q-item-section
              class="text-h5 text-black text-bold"
              v-if="!miniState"
            >
              BoJio
            </q-item-section>
            <q-item-section
              side
              @click="miniState = !miniState"
              class="text-black"
            >
              <q-icon name="menu" v-if="miniState" />
              <q-icon name="close" v-else />
            </q-item-section>
          </q-item>

          <q-separator />
          <q-item
            v-for="(menuItem, index) in menuList"
            :key="index"
            :class="{ selected: menuItem.route == $route.path }"
            @click="$router.push(menuItem.route)"
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
        </q-list>

        <q-item
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            Profile
          </q-item-section>
          <q-tooltip
            anchor="center left"
            self="center right"
            style="white-space: nowrap"
          >
            View your profile
          </q-tooltip>
        </q-item>

      </q-drawer>
      <q-page-container>
        <router-view @drawer="drawer = !drawer"></router-view>
      </q-page-container>

      <ProfileDialog v-model="profileDialog" />
    </q-layout>
  </div>
</template>
