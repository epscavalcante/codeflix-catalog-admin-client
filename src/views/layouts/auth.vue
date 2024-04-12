<template>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <Suspense>
      <template #fallback>
        Loading...

        checking login
      </template>
      <RouterView />
    </Suspense>
  </div>
</div>


    
</template>

<script setup lang="ts">
import { Suspense } from 'vue';
</script>

<style scoped></style>
