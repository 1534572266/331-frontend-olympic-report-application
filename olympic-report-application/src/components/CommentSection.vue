<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useMessageStore } from '@/stores/message'

const store = useMessageStore()
const { addComment, getCommentsByCountry } = store

const props = defineProps<{
  countryId: number
}>()

const commentText = ref('')
const comments = ref<string[]>([])

watchEffect(() => {
  comments.value = getCommentsByCountry(props.countryId) || []
})

const submitComment = () => {
  if (commentText.value.trim()) {
    addComment(props.countryId, commentText.value)
    commentText.value = ''
  }
}
</script>

<template>
  <div class="mt-8">
    <h2 class="text-2xl font-bold mb-4">Comments</h2>
    <textarea
      v-model="commentText"
      rows="4"
      placeholder="Write your comment here..."
      class="w-full p-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500"
    ></textarea>
    <button
      @click="submitComment"
      class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
    >
      Submit Comment
    </button>
    <ul class="mt-4 space-y-2">
      <li v-for="(comment, index) in comments" :key="index" class="bg-white p-4 rounded-md shadow-sm">
        {{ comment }}
      </li>
    </ul>
  </div>
</template>
