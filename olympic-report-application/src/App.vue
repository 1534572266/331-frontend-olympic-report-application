<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'

const store = useMessageStore()
const { message, componentID } = storeToRefs(store)
</script>

<template>
  <div id="app" class="min-h-screen flex flex-col items-center bg-white">
    <header class="w-full flex justify-center items-center p-4 bg-blue-500 text-white shadow-lg">
      <nav class="flex items-center gap-x-8 text-xl">
        <RouterLink to="/" class="px-4 hover:text-yellow-500 transition duration-300 ease-in-out">Home</RouterLink>
        <RouterLink to="/rank" class="px-4 hover:text-yellow-500 transition duration-300 ease-in-out">Ranking
        </RouterLink>
        <RouterLink to="/about" class="px-4 hover:text-yellow-500 transition duration-300 ease-in-out">About
        </RouterLink>
      </nav>
    </header>
    <main class="container mx-auto p-4 w-full max-w-7xl">
      <SpeedInsights />
      <div class="text-center font-sans text-gray-700 antialias">
        <header class="bg-white shadow">
          <div id="flashMessage" class="animate-fade" v-if="message && componentID === 'app'">
            <h4 class="text-yellow-500 p-2">{{ message }}</h4>
          </div>
          <RouterView />
        </header>
      </div>
    </main>
    <footer class="w-full flex justify-center items-center p-4 bg-blue-500 text-white shadow-lg">
      &copy; 2024 Paris Olympics Medal Standings
    </footer>
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header nav a.router-link-exact-active {
  color: #42b983;
}
</style>
