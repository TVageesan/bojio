<script setup>
import HeaderComponent from 'src/components/HeaderComponent.vue'
import CalendarView from 'src/components/CalendarView.vue'
import { getEvents } from 'src/api';
import { onMounted, watch, ref, computed, inject } from 'vue'
import { getCurrentDate } from 'src/utils/getDate'

const emit = defineEmits(['drawer'])
const session = inject('session');
const cal = ref(null);
const events = computed(() => cal.value?.events); //ref to events plugin of schedule-x

watch(events, (eventPlugin, _) => {
  getEvents().then(resp => {
    const stored_events = resp.data.map(
      evt => ({
        id: evt.evt_id,
        start: evt.start_time,
        end: evt.end_time,
        title: evt.title,
      })
    )
    eventPlugin.set(stored_events);
    count = stored_events.length;
  });
})

const currEvent = ref(null)

const save = () => {}

onMounted(() => {})
</script>

<template>
  <HeaderComponent @drawer="$emit('drawer')" @save="save" title="Group's Shared Schedule" />
  <q-page>
    <CalendarView ref="cal" @evt-click="editEvent" />
  </q-page>
</template>
