<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
const store = useMessageStore()
const { message, componentID } = storeToRefs(store)


</script>

<template>
  <SpeedInsights />
  <div class="text-center font-sans text-gray-700 antialias">
    <header class="bg-white shadow">
      <div id="flashMessage" class="animate-fade" v-if="message && componentID === 'app'">
        <h4 class="text-yellow-500 p-2">{{ message }}</h4>
      </div>
      <h1 class="text-3xl font-bold mb-4">Deploy with Vercel</h1>
      <div class="wrapper">
        <nav class="py-6">

          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500"
            :to="{ name: 'event-list-view' }">Event</RouterLink>
          |
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'about' }">About
          </RouterLink>
        </nav>
      </div>
    </header>

    <RouterView class="mt-8" />
  </div>
</template>

