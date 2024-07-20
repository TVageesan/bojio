<script setup>
import GroupList from "src/components/GroupList.vue";
import CalendarView from "src/components/CalendarView.vue";
import {
  getGroups,
  getGroupEvents,
  joinGroup,
  postGroup,
  putGroup,
  deleteGroup,
  getProfileImage,
} from "src/api";
import { ref, computed, inject, onMounted } from "vue";

const cal = ref(null);
const events = computed(() => cal.value?.events); //ref to events plugin of schedule-x
const colors = computed(() => cal.value?.calendars);
const session = inject("session");
const loading = inject("loading");
const groups = ref([]);
const group = ref(null);
const users = ref([]); // to keep track of group member color
const user_details = ref({});

const addDialog = ref(false);
const userDialog = ref(false);
const newName = ref("");
const inviteLink = ref("");
const splitterModel = ref(20);

const updateUserDetails = async (id, name) => {
  if (!user_details.value[id]) {
    user_details.value[id] = {
      name,
      url: await getProfileImage(id),
    };
  }
};

const getColor = async (id,name) => {
  const search = users.value.indexOf(id);
  updateUserDetails(id,name);
  if (search == -1) {
    users.value.push(id);
    return users.value.length - 1;
  } else {
    return search;
  }
};

const getCalendarColor = (id) => {
  const color = colors.value[id];
  console.log('ccc',color);
  if (!color) return 'red';
  return color.lightColors.main;
}

const loadEvents = async (index) => {
  group.value = groups.value.find(({ group_id }) => group_id == index);

  const { data: evtData, error: evtErr } = await getGroupEvents(index);
  if (evtErr) console.log("evtError", evtErr);

  users.value = [];

  const promises = evtData.map(async (evt) => ({
      id: evt.user_id + evt.evt_id,
      start: evt.start_time,
      end: evt.end_time,
      title: evt.title,
      description: evt.description,
      location: evt.location,
      people: [evt.name],
      calendarId: await getColor(evt.user_id, evt.name),
    })
  );

  events.value.set(await Promise.all(promises));
  console.log("created users", users.value, user_details.value);
};

const reloadGroups = async () => {
  const { data } = await getGroups(session);
  groups.value = data;
};

const handleJoinGroup = async () => {
  //add link validation here
  await joinGroup(session, inviteLink.value);
  await reloadGroups();
  addDialog.value = false;
  inviteLink.value = "";
};

const handleAddGroup = async () => {
  await postGroup(session, newName.value);
  await reloadGroups();
  addDialog.value = false;
  newName.value = "";
};

const editGroup = async (newName) => {
  const { error } = await putGroup(newName, group.value.group_id);
  if (error) console.log('edit Group Error', error);
}

const handleDeleteGroup = async (id = group.value.group_id) => {
  const { error } = await deleteGroup(id);
  events.value.set([]);
  groups.value = groups.value.filter(({ group_id }) => id != group_id);
  if (error) console.log("deleteGroups error", error);
};

onMounted(async () => {
  loading.show({ message: "Getting your groups..." });
  const { data, error } = await getGroups(session);
  if (error) console.log("getGroups error", error);
  const promises = data.map(async (group) => ({
    ...group,
    url: await getProfileImage(group.owner_id),
  }));
  groups.value = await Promise.all(promises);
  loading.hide();
});
</script>

<template>
  <q-dialog v-model="userDialog">
    <q-card style="min-width: 400px; min-height: 100px">
      <q-card-section>
        <div class="text-h6 text-center">Invite Code</div>
        <div class="text-body text-center">
          Share this with your friends to add them to your group:
        </div>
        <div class="text-h7 text-center text-primary">{{ group.invite }}</div>
      </q-card-section>
      <q-separator class="col" />
      <q-card-section>
        <div class="text-h6 text-center">Your Group Members</div>
        <q-list>
          <q-item
            v-for="(user, index) in users"
            :key="index"
            class="group-member-item"
          >
            <q-item-section avatar>
              <q-avatar size="40px" rounded>
                <img :src="user_details[user].url" />
              </q-avatar>
            </q-item-section>
            <q-item-section avatar>
              <q-avatar size="40px" rounded :style="{backgroundColor:getCalendarColor(index)}">
              </q-avatar>
            </q-item-section>
            <q-item-section class="user-name">
              <q-item-label>{{ user_details[user].name }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="addDialog">
    <q-card style="min-width: 400px; min-height: 100px">
      <q-card-section>
        <div class="text-h6 q-pb-md text-center">Create a Group</div>
        <q-input outlined label="Your Group Name" v-model="newName">
          <template v-slot:append>
            <q-btn icon="add" flat color="green" @click="handleAddGroup" />
          </template>
        </q-input>
      </q-card-section>
      <div class="row fit no-wrap items-center">
        <q-separator class="col" />
        <div class="col-grow q-mx-sm text-h6">OR</div>
        <q-separator class="col" />
      </div>
      <q-card-section>
        <div class="text-h6 q-pb-md text-center">Join an existing one</div>
        <q-input outlined label="Your invite code" v-model="inviteLink">
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
      style="min-height: inherit"
      separator-class="bg-gray"
      separator-style="width: 7px"
      :limits="[10, 40]"
    >
      <template v-slot:before>
        <GroupList
          :groups="groups"
          @group-selected="loadEvents"
          @group-add="addDialog = true"
        />
      </template>
      <template v-slot:separator>
        <q-icon color="grey" size="30px" name="more_vert" />
      </template>
      <template v-slot:after>
        <q-toolbar class="bg-black text-white">
          <q-toolbar-title v-if="group">
            {{ group.name }}
            <q-btn v-if="group?.owner_id == session.user.id" icon="edit"></q-btn>
            <q-popup-edit v-model="group.name" auto-save v-slot="scope" v-if="group?.owner_id == session.user.id">
              <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set();editGroup(scope.value)" />
            </q-popup-edit>
          </q-toolbar-title>
          <q-btn
            flat
            round
            dense
            icon="menu"
            v-if="group?.owner_id == session.user.id"
          >
            <q-menu auto-close>
              <q-list style="min-width: 100px">
                <q-item clickable @click="handleDeleteGroup" v-ripple>
                  <q-item-section> Delete Group </q-item-section>
                </q-item>
                <q-item clickable @click="userDialog = true" v-ripple>
                  <q-item-section> Manage Users </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-toolbar>
        <CalendarView v-if="group" :edit="false" ref="cal" />
        <div v-else class="empty-state">
          <h2>Select A Group To Get Started</h2>
        </div>
      </template>
    </q-splitter>
  </q-page>
</template>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  color: #555;
}

h2 {
  font-size: 1.5rem;
  color: #333;
}

.group-member-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
}

.user-name {
  font-size: 1rem;
  font-weight: 500;
  margin-left: 16px;
}
</style>
