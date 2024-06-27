<script setup>
import GroupList from 'src/components/GroupList.vue'
import CalendarView from 'src/components/CalendarView.vue'
import { getGroups, getGroupEvents, postGroup, putGroup, deleteGroup, getModules } from 'src/api';
import { ref, computed, inject, onMounted } from 'vue'

const emit = defineEmits(['drawer','select','delete'])
const session = inject('session');

const cal = ref(null);
const events = computed(() => cal.value?.events); //ref to events plugin of schedule-x
const groups = ref(null);
const groupTitle = ref('');

const addDialog = ref(false);
const newName = ref('');
const splitterModel = ref(20);

const loadEvents = async (index,name) => {
  const resp = await getGroupEvents(index);
  groupTitle.value = name;
  let users = []; // to generate calendar ids for each user

  const getColor = (user) => {
    const search = users.indexOf(user)
    if (search != -1) return search;
    users.push(user);
    return users.length - 1;
  }

  let evts = [];

  resp.data.forEach(evt => {
    evts.push({
      id: evt.user_id + evt.evt_id,
      start: evt.start_time,
      end: evt.end_time,
      title: evt.title,
      description: evt.description,
      location: evt.location,
      calendarId: getColor(evt.user_id)
    })
  })

  events.value.set(evts);
}

onMounted(async () => {
  const resp = await getGroups(session);
  groups.value = resp.data;
});

</script>

<template>
  <q-dialog v-model="addDialog" seperator-class="sep">
    <q-card style="min-width: 400px; min-height: 100px">
      <q-card-section>
        <div class="text-h6 text-center">Create a Group</div>
        <q-input lable="Your Group Name" v-model="newName"/>
        <q-btn label="create" />
      </q-card-section>
      <div class="row fit no-wrap items-center">
        <q-separator class="col"/>
        <div class="col-grow q-mx-sm text-h6">OR</div>
        <q-separator class="col"/>
      </div>
      <q-card-section>
        <div class="text-h6 text-center">Join an existing one</div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-page>
    <q-splitter
      v-model="splitterModel"
      separator-class="bg-gray"
      separator-style="width: 7px"
      :limits="[10, 40]"
    >
      <template v-slot:before>
        <GroupList :groups="groups" @group-selected="loadEvents" @group-add="addDialog = true"/>
      </template>
      <template v-slot:separator>
        <q-icon color="grey" size="30px" name="more_vert" />
      </template>
      <template v-slot:after>
        <q-toolbar class="bg-black text-white" >
          <q-toolbar-title> {{ groupTitle ? groupTitle : 'No Group Selected' }}</q-toolbar-title>
          <q-btn flat round dense icon="menu">
            <q-menu>
              <q-list>
                <q-item>
                  <q-item-section>
                    Delete
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    Manage Users
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-toolbar>
        <CalendarView :edit="false" ref="cal"/>
      </template>
    </q-splitter>
  </q-page>
</template>
