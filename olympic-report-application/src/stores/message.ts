import { defineStore } from 'pinia'

interface MessageState {
  message: string
  componentID: string
}

export const useMessageStore = defineStore('message', {
  state: (): MessageState => ({
    message: '',
    componentID: '',
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
  },
})
