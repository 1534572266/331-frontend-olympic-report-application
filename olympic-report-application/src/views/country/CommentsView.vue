<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCountryStore } from '@/stores/country';
import type { Comment } from '@/types';
import { storeToRefs } from 'pinia';
import { useMessageStore } from '@/stores/message';

const route = useRoute();
const countryStore = useCountryStore();
const messageStore = useMessageStore();
const { countries } = storeToRefs(countryStore);

const id = parseInt(route.params.id as string);
const country = computed(() => countries.value[id]);

const commentInput = ref('');

const addComment = () => {
  if (commentInput.value.trim()) {
    const newComment: Comment = {
      id: Date.now(),
      content: commentInput.value.trim(),
      timestamp: new Date().toISOString(),
    };
    countryStore.addComment(id, newComment);
    commentInput.value = '';
    messageStore.updateMessage('Submit successfully!', 'sportView');
    setTimeout(() => {
      messageStore.resetMessage();
    }, 5000);
  } else {
    messageStore.updateMessage('Please enter a comment!', 'sportView');
    setTimeout(() => {
      messageStore.resetMessage();
    }, 5000);
  }
};

const commentsWithAnimation = computed(() => {
  return country.value?.comments || [];
});

const commentCount = ref(0);

const updateCommentCount = () => {
  commentCount.value = commentsWithAnimation.value.length;
};

watch(commentsWithAnimation, () => {
  updateCommentCount();
}, { immediate: true });
</script>

<template>
  <div
    class="bg-white shadow-md rounded-lg overflow-hidden p-6 mt-8 transition duration-500 ease-in-out transform hover:scale-105 max-w-3xl mx-auto">
    <h2 class="text-2xl font-bold mb-4 text-gray-800">Comments</h2>
    <div class="mb-4">
      <textarea v-model="commentInput" placeholder="Write a comment to cheer up your athletes..." rows="4"
        class="w-full p-4 border rounded-lg focus:border-blue-500 focus:outline-none resize-y"></textarea>
      <button @click="addComment"
        class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none transition duration-300 ease-in-out">Add
        Comment</button>
    </div>
    <div v-if="messageStore.componentID === 'sportView'"
      class="mt-4 p-4 bg-green-100 text-green-700 rounded relative flex items-center justify-between" role="alert">
      {{ messageStore.message }}
      <button @click="messageStore.resetMessage" class="ml-4 p-2 bg-transparent border-none cursor-pointer">
        <svg class="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20">
          <title>Close</title>
          <path
            d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 2.63a1.2 1.2 0 0 1-1.697-1.697l2.63-2.652-2.652-2.651a1.2 1.2 0 0 1 1.697-1.697L10 8.183l2.651-2.652a1.2 1.2 0 0 1 1.697 1.697l-2.652 2.651 2.651 2.652a1.2 1.2 0 0 1 0 1.698z" />
        </svg>
      </button>
    </div>
    <ul class="space-y-4">
      <li v-for="(comment, index) in country?.comments || []" :key="comment.id" class="border-b pb-4 last:border-b-0">
        <div class="flex items-start space-x-4">
          <span class="font-semibold text-gray-700">{{ index + 1 }}.</span>
          <div>
            <p class="text-gray-900">{{ comment.content }}</p>
            <small class="text-gray-500">{{ new Date(comment.timestamp).toLocaleString() }}</small>
          </div>
        </div>
      </li>
    </ul>
    <div class="relative h-48 overflow-hidden mt-6 flex justify-center">
      <div v-for="(comment, index) in commentsWithAnimation" :key="comment.id"
        class="absolute bottom-0 left-full w-full max-w-sm whitespace-pre-wrap break-all p-2 bg-blue-600 text-black rounded-lg shadow-md comment-animation"
        :style="{ animationDelay: `${index * 2}s` }">
        <p class="text-xl font-semibold">{{ comment.content }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comment-animation {
  animation: slideInLeft 5s linear forwards;
}

@keyframes slideInLeft {
  0% {
    transform: translateX(100%);
    opacity: 1;
  }

  100% {
    transform: translateX(-100%);
    opacity: 0;
  }
}
</style>
