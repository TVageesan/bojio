<script setup>
import { ref, computed } from "vue";

const props = defineProps(["groups"]);
const emit = defineEmits(["groupSelected", "groupAdd"]);
const select = ref(-1);
const search = ref("");

const filteredGroups = computed(() => {
  if (!search.value) {
    return props.groups;
  }
  return props.groups.filter((group) =>
    group.name.toLowerCase().includes(search.value.toLowerCase())
  );
});
</script>

<template>
  <q-input
    rounded
    outlined
    v-model="search"
    placeholder="Search"
    class="q-pa-md"
  >
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
  </q-input>
  <q-list>
    <q-item
      v-for="{ group_id, name, url } in filteredGroups"
      :key="group_id"
      clickable
      class="section"
      :class="{ 'selected-rounded': select == group_id }"
      @click="
        select = group_id;
        $emit('group-selected', group_id);
      "
    >
      <q-item-section avatar>
        <q-img :src="url" class="rounded-image" ratio="1" />
      </q-item-section>

      <q-item-section class="text-h6">
        {{ name }}
      </q-item-section>
    </q-item>

    <q-item class="row q-pb-md q-mb-md">
      <q-btn
        class="bg-green text-white col-grow q-ma-xs"
        icon="add"
        flat
        @click="$emit('group-add')"
      />
    </q-item>
  </q-list>
</template>

<style lang="scss">
.rounded-image {
  border-radius: 50%;
}

.q-item:hover:not(.selected-rounded) {
  background-color: grey-3;
  color: black;
}

.selected-rounded {
  background-color: $primary;
  color: white;
}
</style>
