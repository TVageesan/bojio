<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './utils/supabaseClient'

const countries = ref([])

async function getCountries() {
  const { data } = await supabase.from('countries').select()
  countries.value = data
}

onMounted(() => {
  getCountries();
  console.log(process.env.FOO);
})
</script>

<template>
  <ul>
    <li v-for="country in countries" :key="country.id">{{ country.name }}</li>
  </ul>
  <router-view />
</template>
