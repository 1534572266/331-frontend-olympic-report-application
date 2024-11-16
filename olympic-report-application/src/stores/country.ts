import type { CountryState, Country } from '@/types'
import { defineStore } from 'pinia'

export const useCountryStore = defineStore('country', {
  state: (): CountryState => ({
    countries: [] as Country[],
    currentCountry: null as Country | null,
    totalCountries: 0,
  }),
  actions: {
    setCountries(countries: Country[], totalCountries: number): void {
      this.countries = countries
      this.totalCountries = totalCountries
    },
    setCurrentCountry(country: Country): void {
      this.currentCountry = country
    },
  },
})
