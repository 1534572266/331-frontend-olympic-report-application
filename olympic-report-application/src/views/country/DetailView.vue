<script setup lang="ts">
import CountryCard from '@/components/CountryCard.vue'
import CommentSection from '@/components/CommentSection.vue'
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCountryStore } from '@/stores/country'
import { useMessageStore } from '@/stores/message'
import CountryService from '@/services/CountryService'

const route = useRoute()
const router = useRouter()
const countryId = parseInt(route.params.id as string)
const countryStore = useCountryStore()
const messageStore = useMessageStore()

const country = computed(() => countryStore.currentCountry)

onMounted(() => {
  if (!country.value || country.value.index !== countryId) {
    CountryService.getCountry(countryId)
      .then((response) => {
        countryStore.setCurrentCountry(response.data.country)
      })
      .catch((error) => {
        console.error('There was an error!', error)
        messageStore.updateMessage('Failed to load country details.', 'detailView')
        router.push({ name: 'not-found' })
      })
  }
})
</script>

<template>
  <div v-if="country" class="container mx-auto p-4">
    <h1 class="text-4xl font-bold mb-8 text-center">{{ country.name }} Details</h1>
    <CountryCard :country="country" class="mb-8" />
    <CommentSection :country-id="countryId" />
  </div>
</template>
