<template>
  <section class="flex">
    <Navbar class="py-6 border-r-2 border-neutral" />

    <main class="flex-1 bg-gray-800 py-6">
      <div class="max-w-4xl mx-auto">
        <RouterView />
      </div>
    </main>
  </section>
</template>

<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>
<style scoped></style>
