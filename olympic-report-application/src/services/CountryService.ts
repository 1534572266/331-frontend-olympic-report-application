import type { Country } from '@/types'
import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/' : 'https://your-production-url.com',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  maxContentLength: 50000,
})

console.log('Axios Config:', apiClient.defaults)

export default {
  async getCountries(perPage: number, page: number) {
    try {
      const response = await apiClient.get<{ country: Country }[]>('/olympicData.json')
      console.log('Response Data:', response.data) // 添加日志
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid data format')
      }
      const startIndex = (page - 1) * perPage
      const endIndex = startIndex + perPage
      const paginatedCountries = response.data.map(item => item.country).slice(startIndex, endIndex)
      return { data: { countries: paginatedCountries } }
    } catch (error) {
      console.error('There was an error fetching countries!', error)
      throw error
    }
  },
  async getCountry(index: number) {
    try {
      const response = await apiClient.get<{ country: Country }[]>('/olympicData.json')
      console.log('Response Data:', response.data) // 添加日志
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid data format')
      }
      const country = response.data.find(item => item.country.index === index)?.country
      if (country) {
        return { data: { country } }
      } else {
        throw new Error('Country not found')
      }
    } catch (error) {
      console.error('There was an error fetching the country!', error)
      throw error
    }
  },
  saveCountry(country: Country) {
    // For local development, you can mock this function
    console.log('Saving country:', country)
    return Promise.resolve({ data: { country } })
  },
}



