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

const currEvent = ref(null)

const save = () => {}

onMounted(() => {})
</script>

<template>
  <HeaderComponent @drawer="$emit('drawer')" @save="save" title="Group's Shared Schedule" />
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
