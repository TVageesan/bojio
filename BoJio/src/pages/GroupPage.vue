<script setup>
import GroupList from 'src/components/GroupList.vue'
import CalendarView from 'src/components/CalendarView.vue'
import { getGroups, getGroupEvents, joinGroup, postGroup, putGroup, deleteGroup, getGroupReferral } from 'src/api';
import { ref, computed, inject, onMounted } from 'vue'

const emit = defineEmits(['drawer','select','delete'])
const session = inject('session');

const cal = ref(null);
const events = computed(() => cal.value?.events); //ref to events plugin of schedule-x
const groups = ref(null);
const groupTitle = ref('');
const groupId = ref(0);
const groupInvite = ref('');
const groupOwner = ref(false);

const addDialog = ref(false);
const userDialog = ref(false);
const newName = ref('');
const inviteLink = ref('');
const splitterModel = ref(20);

const loadEvents = async (index,name) => {
  const rrr = await getGroupReferral(index);
  const resp = await getGroupEvents(index);
  groupInvite.value = rrr.data[0].invite;
  groupTitle.value = name;
  groupId.value = index;
  groupOwner.value = rrr.data[0].owner_id == session.value.user.id;

  let users = []; // to generate calendar ids for each user
  let user_names = [];

  const getColor = (user,name) => {
    const search = users.indexOf(user)
    if (search != -1) return search;
    user_names.push(name);
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
      people: [evt.name],
      calendarId: getColor(evt.user_id)
    })
  })

  events.value.set(evts);
}

const reloadGroups = async () => {
  groups.value = (await getGroups(session)).data;
}

const handleJoinGroup = async () => {
  //add link validation here
  addDialog.value = false;
  await joinGroup(session,inviteLink.value);
  inviteLink.value = '';
  await reloadGroups();
}

const handleAddGroup = async () => {
  addDialog.value = false;
  await postGroup(session, newName.value);
  newName.value = ''
  await reloadGroups();
}

const handleDeleteGroup = async () => {
  groupTitle.value = null;
  events.value.set([]);
  const id = groupId.value;
  groups.value = groups.value.filter(({group_id}) => id != group_id);
  await deleteGroup(id);
}

onMounted(async () => {
  const resp = await getGroups(session);
  groups.value = resp.data;
});

</script>

<template>
  <q-dialog v-model="userDialog">
    <q-card style="min-width: 400px; min-height: 100px">
      <q-card-section>
        <div class="text-h6 text-center"> Invite Code </div>
        <div class="text-body ">Share this with your friends to add them to your group:</div>
        <div class="text-h7 text-primary"> {{ groupInvite }}</div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="addDialog">
    <q-card style="min-width: 400px; min-height: 100px">
      <q-card-section>
        <div class="text-h6  q-pb-md text-center">Create a Group</div>
        <q-input outlined label="Your Group Name" v-model="newName">
          <template v-slot:append>
            <q-btn icon="add" flat color="green" @click="handleAddGroup" />
          </template>
        </q-input>
      </q-card-section>
      <div class="row fit no-wrap items-center">
        <q-separator class="col"/>
        <div class="col-grow q-mx-sm text-h6">OR</div>
        <q-separator class="col"/>
      </div>
      <q-card-section>
        <div class="text-h6 q-pb-md text-center">Join an existing one</div>
        <q-input outlined label= "Your invite code" v-model="inviteLink">
          <template v-slot:append>
            <q-btn icon="add" flat color="green" @click="handleJoinGroup" />
          </template>
        </q-input>
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
          <q-btn flat round dense icon="menu" v-if="groupOwner">
            <q-menu auto-close>
              <q-list style="min-width: 100px">
                <q-item clickable @click="handleDeleteGroup" v-ripple>
                  <q-item-section> Delete Group </q-item-section>
                </q-item>
                <q-item clickable @click="userDialog = true" v-ripple>
                  <q-item-section> Add Users </q-item-section>
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
