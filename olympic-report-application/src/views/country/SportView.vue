<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useCountryStore } from '@/stores/country';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import SportCard from '@/components/SportCard.vue';

const countryStore = useCountryStore();
const { countries } = storeToRefs(countryStore);

const route = useRoute();
const isLoading = ref(true);

onMounted(async () => {
  try {
    const id = parseInt(route.params.id as string);
    await countryStore.fetchCountry(id);
    isLoading.value = false;
  } catch (error) {
    console.error('There was an error!', error);
    isLoading.value = false;
  }
});

const id = parseInt(route.params.id as string);
const country = computed(() => countries.value[id]);

const totalMedals = computed(() => {
  if (!country.value) return 0;
  return country.value.medalDetails.reduce((total, detail) => total + detail.total, 0);
});
</script>

<template>
  <div v-if="isLoading"
    class="container mx-auto p-4 flex justify-center items-center h-screen bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
    <div class="flex flex-col items-center">
      <div class="animate-spin inline-block w-16 h-16 border-8 rounded-full border-t-8 border-white opacity-75"></div>
      <p class="mt-4 text-xl font-bold">Loading...</p>
    </div>
  </div>
  <div v-else-if="country" class="container mx-auto p-4">
    <h1 class="text-4xl font-extrabold mb-8 text-center text-indigo-900">{{ country.name }} Sports</h1>

    <div
      class="bg-white shadow-md rounded-lg overflow-hidden p-6 mt-8 transition duration-500 ease-in-out transform hover:scale-105">
      <h2 class="text-2xl font-bold mb-4 text-gray-800">Total Medals: {{ totalMedals }}</h2>
    </div>

    <SportCard :medalDetails="country.medalDetails" />
  </div>
  <div v-else class="container mx-auto p-4 flex justify-center items-center h-screen bg-gray-100 text-red-500">
    <h1 class="text-4xl font-extrabold mb-8 text-center">No Data Available</h1>
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
