import type { MedalDetail } from '@/types'
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

export default {
  getMedalDetails(perPage: number, page: number) {
    return apiClient.get<{ medalDetails: MedalDetail[] }>(
      '/medal-details?_limit=' + perPage + '&_page=' + page,
    )
  },
  getMedalDetail(id: number) {
    return apiClient.get<{ medalDetail: MedalDetail }>('/medal-details/' + id)
  },
  saveMedalDetail(medalDetail: MedalDetail) {
    return apiClient.post<{ medalDetail: MedalDetail }>('/medal-details', medalDetail)
  },
}
