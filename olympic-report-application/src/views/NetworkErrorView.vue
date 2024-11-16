<template>
  <div class="networkError p-8 bg-white rounded-lg shadow-lg text-center">
    <h1 class="text-4xl font-bold text-red-500">Uh-Oh!</h1>
    <h3 class="mt-4 text-xl text-gray-700">
      It looks like you're experiencing some network issues, please take a breath and
      <a href="#" @click.prevent="$router.go(-1)" class="text-blue-500 hover:underline">click here</a> to try again.
    </h3>
  </div>
</template>
