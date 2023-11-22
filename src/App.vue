<template>
  <section class="flex">
    <Navbar class="py-6 border-r-2 border-neutral" />

    <main class="flex-1 bg-gray-800 py-6">
      <RouterView />
    </main>
  </section>
  <BaseModal />
</template>

<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import { markRaw } from "vue";
import BaseModal from "./components/BaseModal.vue";
import useModal from "./composables/useModal";
import NewVideoModal from "./components/NewVideoModal.vue";
function openModal() {
  useModal().open({
    component: markRaw(NewVideoModal),
    width: "w-3/5 lg:w-5/7",
  });
}
</script>

<style scoped></style>
