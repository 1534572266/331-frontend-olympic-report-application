<script setup lang="ts">
import { useCountryStore } from '@/stores/country'
import { storeToRefs } from 'pinia'
const store = useCountryStore()
const { country } = storeToRefs(store)
</script>
<template>
  <div v-if="country">
    <h1>{{ country.name }}</h1>
    <nav>
      <RouterLink :to="{ name: 'country-detail-view' }">Details</RouterLink>
    </nav>
    <RouterView :country="country" />
  </div>
</template>
