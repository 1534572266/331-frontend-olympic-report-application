<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
const props = withDefaults(
  defineProps<{
    resource: string
  }>(),
  {
    resource: 'page'
  }
)
</script>

<template>
  <div class="not-found p-8 bg-white rounded-lg shadow-lg text-center">
    <h1 class="text-4xl font-bold text-red-500">Oops!</h1>
    <h3 class="mt-4 text-xl text-gray-700">
      The {{ props.resource }} you're looking for is not here.
    </h3>
    <router-link :to="{ name: 'event-list-view' }"
      class="mt-4 inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors duration-200">
      Back to the home page
    </router-link>
  </div>
</template>
