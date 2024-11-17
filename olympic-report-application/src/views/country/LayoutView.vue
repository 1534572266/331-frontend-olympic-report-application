<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useCountryStore } from '@/stores/country';
import { storeToRefs } from 'pinia';

const route = useRoute();
const countryStore = useCountryStore();
const { countries } = storeToRefs(countryStore);

const isLoading = ref(true);
const id = parseInt(route.params.id as string);
const country = computed(() => countries.value[id]);
const isDetailView = route.name === 'country-detail-view';

onMounted(async () => {
  try {
    await countryStore.fetchCountry(id);
    isLoading.value = false;
  } catch (error) {
    console.error('There was an error!', error);
    isLoading.value = false;
  }
});
</script>

<template>
  <div v-if="isLoading"
    class="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 text-white">
    <p class="text-2xl font-bold animate-pulse ">Loading...</p>
  </div>
  <div v-else-if="country" class="min-h-screen bg-gray-100 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
    <div
      class="max-w-3xl w-full space-y-8 transition duration-500 ease-in-out transform hover:scale-105 bg-white shadow-md rounded-lg overflow-hidden p-6">
      <h1 class="text-4xl font-extrabold text-center mb-8 text-indigo-900">{{ country.name }} Overview</h1>
      <nav v-if="!isDetailView" class="flex justify-center space-x-4 mb-8">
        <RouterLink :to="{ name: 'country-detail-view', params: { id: country.id } }"
          class="text-blue-500 hover:text-blue-700 font-semibold">Details</RouterLink>
        <span>|</span>
        <RouterLink :to="{ name: 'country-sport-view', params: { id: country.id } }"
          class="text-blue-500 hover:text-blue-700 font-semibold">Sports</RouterLink>
        <span>|</span>
        <RouterLink :to="{ name: 'country-comments-view', params: { id: country.id } }"
          class="text-blue-500 hover:text-blue-700 font-semibold">Comments</RouterLink>
      </nav>
      <div>
        <h2 class="text-2xl font-bold mb-4 text-gray-800">Basic Information</h2>
        <ul class="list-disc list-inside space-y-2 pl-6">
          <li><strong>Name:</strong> {{ country.name }}</li>
          <li><strong>Population:</strong> {{ country.population || 'N/A' }}</li>
          <li><strong>Capital:</strong> {{ country.capital || 'N/A' }}</li>
          <li><strong>Region:</strong> {{ country.region || 'N/A' }}</li>
          <li><strong>Subregion:</strong> {{ country.subregion || 'N/A' }}</li>
          <li><strong>Area:</strong> {{ country.area ? `${country.area} km²` : 'N/A' }}</li>
          <li><strong>Information:</strong> {{ country.information ? `${country.information} ` : 'N/A' }}</li>
        </ul>
      </div>
      <RouterView />
    </div>
  </div>
  <div v-else class="min-h-screen bg-gray-100 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
    <p class="text-2xl font-bold text-red-500">No Data Available</p>
  </div>
</template>
