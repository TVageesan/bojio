<script setup>
import GroupList from 'src/components/GroupList.vue'
import CalendarView from 'src/components/CalendarView.vue'
import { getGroupEvents } from 'src/api';
import { ref, computed, inject, watch } from 'vue'


const emit = defineEmits(['drawer','select','delete'])
const session = inject('session');

const cal = ref(null);
const groups = [
  {
    name: 'We go Jim',
    owner: '27082bdb-4e07-4cac-b498-5b35f1ea9f43',
    icon: 'fitness_center',
    users:[
      '129cb36b-d07c-464d-9aac-6a16bdc30211',
      '27082bdb-4e07-4cac-b498-5b35f1ea9f43'
    ]
  },
  {
    name: 'PF Class',
    owner:'129cb36b-d07c-464d-9aac-6a16bdc30211',
    icon: 'menu_book',
    users:[
      '129cb36b-d07c-464d-9aac-6a16bdc30211',
      '27082bdb-4e07-4cac-b498-5b35f1ea9f43',
      'c603c299-9803-4cbc-bdd8-be90fc771df6',
      'c10abc55-4b46-4366-8f17-cdee60d5d211'
    ]
  }
]

const users = ref([
  '129cb36b-d07c-464d-9aac-6a16bdc30211',
  '27082bdb-4e07-4cac-b498-5b35f1ea9f43',
  'c603c299-9803-4cbc-bdd8-be90fc771df6',
  'c10abc55-4b46-4366-8f17-cdee60d5d211'
])

const events = computed(() => cal.value?.events); //ref to events plugin of schedule-x

const loadEvents = (index) => {
  let selected = groups[index].users
  console.log('selected group',selected.concat(session.value.user.id));
  if (cal.value && selected.length>0) {
    getGroupEvents(selected.concat(session.value.user.id)).then(resp => {
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
  <q-page class="row no-wrap">
    <div class="col-auto q-pa-md">
        <GroupList :groups="groups" @group-selected="loadEvents"/>
    </div>
    <div class="col" style="overflow-y: auto; height: 100vh;">
      <CalendarView :users ="users" :edit="false" ref="cal"/>
    </div>
  </q-page>
</template>
