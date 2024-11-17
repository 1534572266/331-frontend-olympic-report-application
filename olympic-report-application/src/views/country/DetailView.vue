<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useCountryStore } from '@/stores/country';
import CountryCard from '@/components/CountryCard.vue';
import { useRoute } from 'vue-router';
import CountryService from '@/services/CountryService';

const countryStore = useCountryStore();
const { countries } = storeToRefs(countryStore);

const route = useRoute();
const isLoading = ref(true);

onMounted(async () => {
  try {
    const id = parseInt(route.params.id as string);
    await CountryService.getCountry(id);
    isLoading.value = false;
  } catch (error) {
    console.error('There was an error!', error);
    isLoading.value = false;
  }
});

const id = parseInt(route.params.id as string);
const country = computed(() => countries.value[id]);
</script>

<template>
  <div v-if="isLoading" class="container mx-auto p-4 flex justify-center items-center h-screen">
    <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-else-if="country" class="container mx-auto p-4">
    <h1 class="text-4xl font-bold mb-8 text-center">{{ country.name }} Details</h1>
    <CountryCard :country="country" class="mb-8" />

    <div
      class="bg-white shadow-md rounded-lg overflow-hidden p-6 transition duration-500 ease-in-out transform hover:scale-105">
      <h2 class="text-2xl font-bold mb-4 text-gray-800">Medal Summary</h2>
      <div class="grid grid-cols-3 gap-4">
        <div class="flex flex-col items-center">
          <span class="text-4xl font-bold text-yellow-500">{{ country.gold }}</span>
          <img src="https://gstatic.olympics.com/s1/t_original/static/srm/paris-2024/medalGold.svg" alt="Gold"
            class="w-12 h-12 mt-2" />
          <p class="font-semibold text-gray-700">Gold Medals</p>
        </div>
        <div class="flex flex-col items-center">
          <span class="text-4xl font-bold text-gray-400">{{ country.silver }}</span>
          <img src="https://gstatic.olympics.com/s1/t_original/static/srm/paris-2024/medalSilver.svg" alt="Silver"
            class="w-12 h-12 mt-2" />
          <p class="font-semibold text-gray-700">Silver Medals</p>
        </div>
        <div class="flex flex-col items-center">
          <span class="text-4xl font-bold text-brown-500">{{ country.bronze }}</span>
          <img src="https://gstatic.olympics.com/s1/t_original/static/srm/paris-2024/medalBronze.svg" alt="Bronze"
            class="w-12 h-12 mt-2" />
          <p class="font-semibold text-gray-700">Bronze Medals</p>
        </div>
      </div>
      <div class="mt-6">
        <h2 class="text-2xl font-bold mb-4 text-gray-800">Total Medals: {{ country.totalMedals }}</h2>
      </div>
    </div>
  </div>
  <div v-else class="container mx-auto p-4 flex justify-center items-center h-screen">
    <h1 class="text-4xl font-bold mb-8 text-center">No Data Available</h1>
  </div>
</template>

<style scoped>
.spinner-border {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  vertical-align: text-bottom;
  border: 0.25em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  box-sizing: border-box;
  animation: spinner-border 0.75s linear infinite;
}

@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
}
</style>
