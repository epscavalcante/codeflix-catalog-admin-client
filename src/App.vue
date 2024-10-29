<template>
  <RouterView v-if="!isLoading" />

  <div
    v-else
    class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <h1 class="font-black text-3xl">Aguarde...</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from "vue";
import { useKeycloak } from "@josempgon/vue-keycloak";
import { useRouter } from "vue-router";

const isLoading = ref(true);

const router = useRouter();

const { isPending, isAuthenticated, keycloak } = useKeycloak();

watch(isPending, (isPending) => {
  if (isAuthenticated.value) {
    router.push({ name: "dashboard" });
    isLoading.value = false;
  }
  else keycloak.value.login();
});
</script>
<style scoped></style>
