<script setup>
import HeaderComponent from 'src/components/HeaderComponent.vue'
import GroupList from 'src/components/GroupList.vue'
import CalendarView from 'src/components/CalendarView.vue'
import { getEvents } from 'src/api';
import { onMounted, watch, ref, computed, inject } from 'vue'
import { getCurrentDate } from 'src/utils/getDate'

const emit = defineEmits(['drawer'])
const session = inject('session');
const cal = ref(null);
const events = computed(() => cal.value?.events); //ref to events plugin of schedule-x
let count = 0;

watch(events, (eventPlugin, _) => {})

const currEvent = ref(null)

// const loadGroupData = (user_ids) => {
//   const
// }

const save = () => {}

onMounted(() => {})
</script>

<template>
  <HeaderComponent @drawer="$emit('drawer')" @save="save" title="Group's Shared Schedule" />
  <q-page>
    <div class="col-4">
    </div>
    <div class="col-auto">
      <CalendarView ref="cal"/>
    </div>
  </q-page>
</template>
