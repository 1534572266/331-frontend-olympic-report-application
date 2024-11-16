import type { Country } from '@/types'
import axios from 'axios'

const apiClient = axios.create({
  baseURL: "https://my-json-server.typicode.com/1534572266/331-frontend-olympic-report-application/",
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  maxContentLength: 50000,
})

export default {
  getCountries(perPage: number, page: number) {
    return apiClient.get<{ countries: Country[] }>('/countries?_limit=' + perPage + '&_page=' + page)
  },
  getCountry(id: number) {
    return apiClient.get<{ country: Country }>('/countries/' + id)
  },
  saveCountry(country: Country) {
    return apiClient.post<{ country: Country }>('/countries', country)
  },
}
