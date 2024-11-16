import type { MessageState } from '@/types'
import { defineStore } from 'pinia'

export const useMessageStore = defineStore('message', {
  state: (): MessageState => ({
    message: '',
    componentID: '',
    comments: {} as Record<number, string[]>,
  }),
  actions: {
    updateMessage(message: string, componentID: string): void {
      this.message = message
      this.componentID = componentID
    },
    resetMessage(): void {
      this.message = ''
      this.componentID = ''
    },
    addComment(countryId: number, comment: string): void {
      if (!this.comments[countryId]) {
        this.comments[countryId] = []
      }
      this.comments[countryId].push(comment)
    },
    getCommentsByCountry(countryId: number): string[] | undefined {
      return this.comments[countryId]
    },
  },
})
