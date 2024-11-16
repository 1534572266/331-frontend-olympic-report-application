<script setup lang="ts">
import { type Country } from '@/types'

defineProps<{
  country: Country
}>()
</script>

<template>
  <div class="flex justify-center my-4">
    <router-link :to="{ name: 'country-detail-view', params: { id: country.index } }" class="text-blue-500 hover:text-blue-700">
      <div class="bg-white shadow-md rounded-lg overflow-hidden max-w-sm w-full transform hover:scale-101 transition-transform duration-200 cursor-pointer">
        <div class="p-6">
          <h2 class="text-xl font-bold mb-2">{{ country.name }}</h2>
          <p class="text-gray-600 text-sm mb-4">Abbreviation: {{ country.abbreviation }}</p>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="font-semibold">Gold: {{ country.gold }}</p>
              <p class="font-semibold">Silver: {{ country.silver }}</p>
              <p class="font-semibold">Bronze: {{ country.bronze }}</p>
            </div>
            <div>
              <p class="font-semibold">Total Medals: {{ country.totalMedals }}</p>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>
