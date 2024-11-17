import { defineStore } from 'pinia'
import type { Country, Comment } from '@/types'
import CountryService from '@/services/CountryService'

interface State {
  countries: Record<number, Country>
}

export const useCountryStore = defineStore('country', {
  state: (): State => ({
    countries: {},
  }),
  actions: {
    setCountry(country: Country) {
      if (!country.comments) {
        country.comments = []
      }
      this.countries[country.id] = country
    },
    addComment(countryId: number, comment: Comment) {
      if (this.countries[countryId]) {
        if (!this.countries[countryId].comments) {
          this.countries[countryId].comments = []
        }
        this.countries[countryId].comments.push(comment)
      }
    },
    clearComments(countryId: number) {
      if (this.countries[countryId]) {
        this.countries[countryId].comments = []
      }
    },
    async fetchCountry(id: number) {
      try {
        const response = await CountryService.getCountry(id)
        const data: Country = response.data
        this.setCountry(data)
      } catch (error) {
        console.error('There was an error fetching the country:', error)
      }
    },
  },
})
