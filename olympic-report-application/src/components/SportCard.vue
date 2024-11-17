<script setup lang="ts">
import { defineProps, ref, computed } from 'vue';

interface MedalDetail {
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

const props = defineProps<{
  medalDetails: MedalDetail[];
}>();

const currentPage = ref(1);
const itemsPerPage = ref(1);

const paginatedMedalDetails = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return props.medalDetails.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(props.medalDetails.length / itemsPerPage.value);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const changePageSize = (size: number) => {
  itemsPerPage.value = size;
  currentPage.value = 1; // Reset to first page when changing page size
};
</script>

<template>
  <div
    class="bg-white shadow-md rounded-lg overflow-hidden p-6 mt-8 transition duration-500 ease-in-out transform hover:scale-105">
    <h2 class="text-2xl font-bold mb-4 text-gray-800">Medal Details by Sport</h2>

    <!-- Page Size Selector -->
    <div class="mb-4 flex items-center space-x-4">
      <label for="pageSize" class="text-gray-700">Items per page:</label>
      <select id="pageSize" v-model="itemsPerPage" @change="changePageSize(itemsPerPage)"
        class="border rounded px-2 py-1">
        <option value="1">1</option>
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
    </div>

    <ul class="grid grid-cols-1 gap-4">
      <li v-for="(detail, index) in paginatedMedalDetails" :key="index"
        class="flex flex-col items-center border p-4 rounded-lg shadow-sm">
        <strong class="mb-2 text-gray-700">{{ detail.sport }}</strong>
        <div class="flex items-center space-x-4">
          <span class="flex items-center">
            <img src="https://gstatic.olympics.com/s1/t_original/static/srm/paris-2024/medalGold.svg" alt="Gold"
              class="w-6 h-6 mr-1" />
            <span class="text-yellow-500 font-bold">{{ detail.gold }}</span>
          </span>
          <span class="flex items-center">
            <img src="https://gstatic.olympics.com/s1/t_original/static/srm/paris-2024/medalSilver.svg" alt="Silver"
              class="w-6 h-6 mr-1" />
            <span class="text-gray-400 font-bold">{{ detail.silver }}</span>
          </span>
          <span class="flex items-center">
            <img src="https://gstatic.olympics.com/s1/t_original/static/srm/paris-2024/medalBronze.svg" alt="Bronze"
              class="w-6 h-6 mr-1" />
            <span class="text-brown-500 font-bold">{{ detail.bronze }}</span>
          </span>
        </div>
        <div class="mt-2 flex items-center">
          <strong>Total:</strong>
          <span class="font-bold ml-1">{{ detail.total }}</span>
        </div>
      </li>
    </ul>
    <div class="flex justify-between mt-4">
      <button @click="prevPage" :disabled="currentPage === 1"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none transition duration-300 ease-in-out disabled:opacity-50">
        Previous
      </button>
      <button @click="nextPage" :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none transition duration-300 ease-in-out disabled:opacity-50">
        Next
      </button>
    </div>
  </div>
</template>
