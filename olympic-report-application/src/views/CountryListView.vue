<script setup lang="ts">
import CountryCard from '@/components/CountryCard.vue'
import { ref, onMounted, computed, watch } from 'vue'
import CountryService from '@/services/CountryService'
import type { Country } from '@/types'

const countries = ref<Country[]>([])
const filteredCountries = ref<Country[]>([])
const totalCountries = ref(0)
const pageSize = ref(1)
const hasNexPage = computed(() => {
  const totalPages = Math.ceil(totalCountries.value / pageSize.value)
  return page.value < totalPages
})

const props = defineProps<{
  page: number
  size: number
}>()
const page = computed(() => props.page)

const selectedRegion = ref('')
const searchQuery = ref('')
const selectedCountry = ref('')

onMounted(() => {
  fetchCountries()
})

const fetchCountries = () => {
  CountryService.getCountries(9999, 1)
    .then((response) => {
      countries.value = response.data
      totalCountries.value = response.data.length
      console.log('Total Countries:', totalCountries.value)
      filterCountries()
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
}

const filterCountries = () => {
  let result = countries.value

  if (searchQuery.value) {
    result = result.filter(country =>
      country.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedRegion.value) {
    result = result.filter(country =>
      country.region.toLowerCase() === selectedRegion.value.toLowerCase()
    )
  }

  if (selectedCountry.value) {
    result = result.filter(country =>
      country.name.toLowerCase() === selectedCountry.value.toLowerCase()
    )
  }

  totalCountries.value = result.length
  filteredCountries.value = result.slice((page.value - 1) * pageSize.value, page.value * pageSize.value)
}

watch([selectedRegion, searchQuery, selectedCountry], () => {
  filterCountries()
}, { immediate: true })

watch(page, () => {
  filterCountries()
})

watch(pageSize, () => {
  filterCountries()
})
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold mb-8 text-center">Countries List</h1>
    <p class="text-2xl font-semibold mb-6 text-center">Total Countries: {{ totalCountries }}</p>

    <div class="mb-6 flex justify-center items-center space-x-4">
      <label for="pageSize" class="mr-2">Page Size:</label>
      <input id="pageSize" v-model.number="pageSize" type="number" min="1"
        class="border rounded-lg px-3 py-2 focus:outline-none focus:border-green-500" />

      <label for="region" class="mr-2">Region:</label>
      <select id="region" v-model="selectedRegion"
        class="border rounded-lg px-3 py-2 focus:outline-none focus:border-green-500">
        <option value="">All Regions</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>

      <label for="country" class="mr-2">Country:</label>
      <select id="country" v-model="selectedCountry"
        class="border rounded-lg px-3 py-2 focus:outline-none focus:border-green-500">
        <option value="">Select a Country</option>
        <option v-for="country in countries" :key="country.id" :value="country.name.toLowerCase()">
          {{ country.name }}
        </option>
      </select>

      <label for="search" class="mr-2">Search:</label>
      <input id="search" v-model="searchQuery" type="text" placeholder="Search by country name"
        class="border rounded-lg px-3 py-2 focus:outline-none focus:border-green-500" />
    </div>

    <div class="grid grid-cols-1 gap-4 justify-items-center">
      <div v-for="country in filteredCountries" :key="country.id" class="w-full max-w-xl cursor-pointer">
        <CountryCard :country="country" />
      </div>
    </div>

    <div class="pagination flex justify-between w-full max-w-md mb-4 mx-auto mt-12">
      <RouterLink id="page-prev" class="font-bold text-gray-700 hover:text-green-500"
        :to="{ name: 'country-list-view', query: { page: page - 1, size: pageSize } }" rel="prev" v-if="page != 1">
        &#60; Prev Page
      </RouterLink>
      <RouterLink id="page-next" class="font-bold text-gray-700 hover:text-green-500"
        :to="{ name: 'country-list-view', query: { page: page + 1, size: pageSize } }" rel="next" v-if="hasNexPage">
        Next Page &#62;
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.pagination a {
  @apply flex items-center px-4 py-2 bg-white border rounded-lg shadow-md hover:bg-green-100;
}
</style>
