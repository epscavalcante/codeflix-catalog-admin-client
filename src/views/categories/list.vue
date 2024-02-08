<template>
  <section class="container">
    <header class="flex justify-between">
      <h1 class="text-3xl text-gray-200 font-semibold mb-16">Categories</h1>

      <router-link
        class="btn btn-sm btn-outline btn-neutral"
        :to="{ name: 'categories.create' }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </router-link>
    </header>

    <section>
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>CreatedAt</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(category, index) of data.categories" :key="index">
              <td>
                <div class="font-bold">{{ category.name }}</div>
              </td>
              <td>
                {{ category.description }}
              </td>
              <td>
                <div
                  class="badge gap-2"
                  :class="[category.isActive ? 'badge-success' : 'badge-error']"
                >
                  {{ category.isActive ? "SIM" : "Não" }}
                </div>
              </td>
              <td>{{ category.createdAt }}</td>
            </tr>
          </tbody>
        </table>

        <div class="join">
          <button class="join-item btn">«</button>
          <button class="join-item btn">Page {{ data.meta.currentPage }}</button>
          <button class="join-item btn">»</button>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { inject, onMounted, reactive } from "vue";
import Category from "../../domain/Category.entity";
import CategoryGateway from "../../infra/gateway/CategoryGateway";
const data: { categories: Category[], meta: {} } = reactive({
  categories: [],
  meta: {}
});

onMounted(async () => {
  const categoryGateway = inject("categoryGateway") as CategoryGateway;
  const categoriesResponse = await categoryGateway.list();
  data.categories = categoriesResponse.data;
  data.meta = categoriesResponse.meta;
});
</script>

<style scoped></style>
