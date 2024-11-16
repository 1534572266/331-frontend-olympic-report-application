<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import CountryService from '@/services/CountryService'
import MedalDetailService from '@/services/MedalDetailService'
import type { Country, MedalDetail } from '@/types'

export default defineComponent({
  setup() {
    const countries = ref<Country[]>([])
    const medalDetailsMap = new Map<number, MedalDetail[]>()

    const fetchCountries = async () => {
      try {
        const response = await CountryService.getCountries(5, 1)
        countries.value = response.data.countries
      } catch (error) {
        console.error('There was an error!', error)
      }
    }

    const loadMedalDetails = async (index: number) => {
      if (!medalDetailsMap.has(index)) {
        try {
          const response = await MedalDetailService.getMedalDetails(10, 1)
          const details = response.data.medalDetails.filter(detail => detail.countryId === index)
          medalDetailsMap.set(index, details)
        } catch (error) {
          console.error('There was an error loading medal details!', error)
        }
      }
      const country = countries.value.find(c => c.index === index)
      if (country) {
        country.medalDetails = medalDetailsMap.get(index) || []
      }
    }

    const calculateTotalMedals = (medalDetails: MedalDetail[]): number => {
      return medalDetails.reduce((total, detail) => total + detail.gold + detail.silver + detail.bronze, 0)
    }

    onMounted(() => {
      fetchCountries()
    })

    return {
      countries,
      loadMedalDetails,
      calculateTotalMedals,
    }
  },
})
</script>

<template>
  <div>
    <h1>Countries</h1>
    <ul>
      <li v-for="country in countries" :key="country.index">
        {{ country.name }} - Total Medals: {{ calculateTotalMedals(country.medalDetails) }}
        <button @click="loadMedalDetails(country.index)">Load Medal Details</button>
        <ul v-if="country.medalDetails.length > 0">
          <li v-for="detail in country.medalDetails" :key="detail.sport">
            Sport: {{ detail.sport }} - Gold: {{ detail.gold }}, Silver: {{ detail.silver }}, Bronze: {{ detail.bronze }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
