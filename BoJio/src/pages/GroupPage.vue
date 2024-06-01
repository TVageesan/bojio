<script setup>
import HeaderComponent from 'src/components/HeaderComponent.vue'
import GroupList from 'src/components/GroupList.vue'
import CalendarView from 'src/components/CalendarView.vue'
import { getGroupEvents } from 'src/api';
import { ref, computed, inject } from 'vue'


const emit = defineEmits(['drawer','select','delete'])
const session = inject('session');

const cal = ref(null);
const groups = [
  {
    name: 'We go Jim',
    owner: '27082bdb-4e07-4cac-b498-5b35f1ea9f43',
    users:[
      '129cb36b-d07c-464d-9aac-6a16bdc30211',
      '27082bdb-4e07-4cac-b498-5b35f1ea9f43'
    ]
  },
  {
    name: 'PF Class',
    owner:'129cb36b-d07c-464d-9aac-6a16bdc30211',
    users:[
      '129cb36b-d07c-464d-9aac-6a16bdc30211',
      '27082bdb-4e07-4cac-b498-5b35f1ea9f43',
      'c603c299-9803-4cbc-bdd8-be90fc771df6'
    ]
  }
]

const events = computed(() => cal.value?.events); //ref to events plugin of schedule-x

const loadEvents = (index) => {
  let selected = groups[index].users
  if (cal.value && selected.length>0) {
    getGroupEvents(selected).then(resp => {
      const stored_events = resp.data.map(evt => ({
        id: evt.evt_id,
        start: evt.start_time,
        end: evt.end_time,
        title: evt.title,
        calendarId: evt.user_id,
      }));
      events.value.set(stored_events);
    });
  }
};
</script>

<template>
  <HeaderComponent @drawer="$emit('drawer')" title="Group's Shared Schedule" />
  <q-page class="row no-wrap">
    <div class="col-auto q-pa-md">
        <GroupList :groups="groups" @group-selected="loadEvents"/>
    </div>
    <div class="col" style="overflow-y: auto; height: 100vh;">
      <CalendarView :edit="false" ref="cal"/>
    </div>
  </q-page>

</template>
