<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useCountryStore } from '@/stores/country';
import CountryService from '@/services/CountryService';
import type { Country } from '@/types';

const countryStore = useCountryStore();
const sortBy = ref('name');

onMounted(async () => {
  try {
    const perPage = 9999;
    const page = 1;
    const response = await CountryService.getCountries(perPage, page);
    const countries: Country[] = response.data;
    countries.forEach(country => {
      countryStore.setCountry(country);
    });
  } catch (error) {
    console.error('There was an error fetching countries!', error);
  }
});

const sortedCountries = computed(() => {
  const countriesArray = Object.values(countryStore.countries);

  switch (sortBy.value) {
    case 'name':
      return countriesArray.sort((a, b) => a.name.localeCompare(b.name));
    case 'gold':
      return countriesArray.sort((a, b) => b.gold - a.gold);
    case 'silver':
      return countriesArray.sort((a, b) => b.silver - a.silver);
    case 'bronze':
      return countriesArray.sort((a, b) => b.bronze - a.bronze);
    case 'total':
      return countriesArray.sort((a, b) => (b.gold + b.silver + b.bronze) - (a.gold + a.silver + a.bronze));
    default:
      return countriesArray;
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
    <div
      class="max-w-5xl w-full space-y-8 transition duration-500 ease-in-out transform hover:scale-105 bg-white shadow-md rounded-lg overflow-hidden p-6">
      <h1 class="text-4xl font-extrabold text-center mb-8 text-indigo-900">National Medal Ranking</h1>

      <div class="mb-6 flex justify-end">
        <label for="sort" class="mr-2 text-gray-700 font-medium">Sort by:</label>
        <select id="sort" v-model="sortBy"
          class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-green-500">
          <option value="name">Alphabetical Order</option>
          <option value="gold">Gold Medals</option>
          <option value="silver">Silver Medals</option>
          <option value="bronze">Bronze Medals</option>
          <option value="total">Total Medals</option>
        </select>
      </div>

      <table class="w-full border-collapse table-auto">
        <thead>
          <tr class="bg-gray-200">
            <th class="p-4 font-bold text-left">Ranking</th>
            <th class="p-4 font-bold text-left">Nation</th>
            <th class="p-4 font-bold text-right">Number of Gold Medals</th>
            <th class="p-4 font-bold text-right">Number of Silver Medals</th>
            <th class="p-4 font-bold text-right">Number of Bronze Medals</th>
            <th class="p-4 font-bold text-right">Total Medals</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(country, index) in sortedCountries" :key="country.id"
            class="border-b last:border-b-0 hover:bg-gray-100 transition-colors duration-300">
            <td class="p-4">{{ index + 1 }}</td>
            <td class="p-4">{{ country.name }}</td>
            <td class="p-4 text-right">{{ country.gold }}</td>
            <td class="p-4 text-right">{{ country.silver }}</td>
            <td class="p-4 text-right">{{ country.bronze }}</td>
            <td class="p-4 text-right">{{ country.gold + country.silver + country.bronze }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
