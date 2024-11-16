import type { MedalDetail } from '@/types'
import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getMedalDetails(perPage: number, page: number) {
    return apiClient.get<{ medalDetails: MedalDetail[] }>('/medal-details?_limit=' + perPage + '&_page=' + page)
  },
  getMedalDetail(id: number) {
    return apiClient.get<{ medalDetail: MedalDetail }>('/medal-details/' + id)
  },
  saveMedalDetail(medalDetail: MedalDetail) {
    return apiClient.post<{ medalDetail: MedalDetail }>('/medal-details', medalDetail)
  },
}
