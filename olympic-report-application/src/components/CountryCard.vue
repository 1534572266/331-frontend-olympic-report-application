<script setup lang="ts">
import { type Country } from '@/types'

defineProps<{
  country: Country
}>()
</script>

<template>
  <RouterLink :to="{ name: 'country-layout-view', params: { id: country.id } }"
    class="text-blue-500 hover:text-blue-700 block">
    <div
      class="bg-yellow-100 shadow-md rounded-lg overflow-hidden transform hover:scale-101 transition-transform duration-200 cursor-pointer flex flex-col md:flex-row p-4">
      <div class="flex items-center justify-center w-full md:w-1/4">
        <img :src="country.flag" :alt="'Flag of ' + country.name" class="w-24 h-16 object-cover" />
      </div>
      <div class="flex flex-col w-full md:w-3/4 px-4">
        <h2 class="text-xl font-bold mb-2">{{ country.name }}</h2>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="font-semibold">Gold: {{ country.gold }}</p>
            <p class="font-semibold">Silver: {{ country.silver }}</p>
            <p class="font-semibold">Bronze: {{ country.bronze }}</p>
          </div>
          <div class="flex justify-start space-x-6 mt-4">
            <div class="flex flex-col items-center">
              <span class="text-lg font-bold">{{ country.gold }}</span>
              <img src="https://gstatic.olympics.com/s1/t_original/static/srm/paris-2024/medalGold.svg" alt="Gold"
                class="w-6 h-6" />
            </div>
            <div class="flex flex-col items-center">
              <span class="text-lg font-bold">{{ country.silver }}</span>
              <img src="https://gstatic.olympics.com/s1/t_original/static/srm/paris-2024/medalSilver.svg" alt="Silver"
                class="w-6 h-6" />
            </div>
            <div class="flex flex-col items-center">
              <span class="text-lg font-bold">{{ country.bronze }}</span>
              <img src="https://gstatic.olympics.com/s1/t_original/static/srm/paris-2024/medalBronze.svg" alt="Bronze"
                class="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>
