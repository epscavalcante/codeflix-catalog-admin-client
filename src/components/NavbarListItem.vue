<template>
  <li
    class="hover:bg-neutral p-4 text-center flex flex-col rounded-md w-full cursor-pointer"
  >
    <a
      href="#"
      class="text-center flex flex-col items-center justify-center gap-y-2 text-white text-xs"
    >
      <slot />
    </a>
  </li>
</template>

<script setup lang="ts"></script>

<style scoped></style>
