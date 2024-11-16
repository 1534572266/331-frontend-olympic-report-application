<script setup lang="ts">
import CountryCard from '@/components/CountryCard.vue'
import { ref, onMounted, computed, watchEffect } from 'vue'
import CountryService from '@/services/CountryService'
import { useRoute, useRouter } from 'vue-router'
import { useCountryStore } from '@/stores/country'
import { useMessageStore } from '@/stores/message'

const route = useRoute()
const router = useRouter()
const page = computed(() => parseInt(route.query.page as string, 10) || 1)
const size = ref(parseInt(route.query.size as string, 10) || 5)

const countryStore = useCountryStore()
const messageStore = useMessageStore()

const countries = computed(() => countryStore.countries)
const totalCountries = computed(() => countryStore.totalCountries)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalCountries.value / size.value)
  return page.value < totalPages
})

const fetchCountries = () => {
  CountryService.getCountries(size.value, page.value)
    .then((response) => {
      countryStore.setCountries(response.data.countries, parseInt(response.headers['x-total-count'], 10))
    })
    .catch((error) => {
      console.error('There was an error!', error)
      messageStore.updateMessage('Failed to load countries.', 'home')
    })
}

watchEffect(fetchCountries)

const goToPage = (newPage: number) => {
  router.push({ name: 'country-list-view', query: { page: newPage, size: size.value } })
}
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold mb-8 text-center">Countries List</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <template v-for="country in countries" :key="country.index">
        <div class="country-container max-w-md w-full p-4 bg-white shadow-lg rounded-lg mb-4 border border-gray-200 flex flex-col items-center">
          <RouterLink :to="{ name: 'country-detail-view', params: { id: country.index } }">
            <CountryCard :country="country" class="w-full cursor-pointer" />
          </RouterLink>
        </div>
      </template>
    </div>
    <div class="pagination flex justify-between w-full max-w-md mx-auto mt-8">
      <button id="page-prev" class="font-bold text-gray-700 hover:text-green-500"
        @click="goToPage(page - 1)" rel="prev" v-if="page != 1">
        &#60; Prev Page
      </button>
      <button id="page-next" class="font-bold text-gray-700 hover:text-green-500"
        @click="goToPage(page + 1)" rel="next" v-if="hasNextPage">
        Next Page &#62;
      </button>
    </div>
  </div>
</template>

<style scoped>
.pagination button {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
  background: none;
  border: none;
  cursor: pointer;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
