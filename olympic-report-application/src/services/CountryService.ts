import type { Country } from '@/types'
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/1534572266/331-frontend-olympic-report-application',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  maxContentLength: 50000,
})

console.log('Axios Config:', apiClient.defaults);

export default {
  getCountries(perPage: number, page: number) {
    return apiClient.get<{ countries: Country[] }>('/countries?_limit=' + perPage + '&_page=' + page)
  },
  getCountry(index: number) {
    return apiClient.get<{ country: Country }>('/countries/' + index)
  },
  saveCountry(country: Country) {
    return apiClient.post<{ country: Country }>('/countries', country)
  },
}
