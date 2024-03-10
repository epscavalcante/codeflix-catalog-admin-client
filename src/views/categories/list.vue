<template>
  <header class="flex justify-between">
    <h1 class="text-3xl font-semibold mb-10">Categories</h1>

    <RouterLink
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
    </RouterLink>
  </header>

  <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-500">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">ID</th>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3">Description</th>
          <th scope="col" class="px-6 py-3">Created At</th>
          <th scope="col" class="px-6 py-3">Status</th>
          <th scope="col" class="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-500 hover:text-gray-800"
          v-for="(category, index) of data.categories"
          :key="index"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ category.id }}
          </th>
          <td class="px-6 py-4">{{ category.name }}</td>
          <td class="px-6 py-4">{{ category.description }}</td>
          <td class="px-6 py-4">{{ category.createdAt }}</td>
          <td class="px-6 py-4">{{ category.isActive }}</td>
          <td class="px-6 py-4">
            <RouterLink
              :to="{
                name: 'categories.edit',
                params: { id: category.id },
              }"
            >
              Edit
            </RouterLink>

            <button @click="removeItem(category.id as string)">Del</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <div class="join">
      <button class="join-item btn">«</button>
      <button class="join-item btn">Page {{ data.meta.currentPage }}</button>
      <button class="join-item btn">»</button>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, reactive } from "vue";
import Category from "../../domain/Category.entity";
import CategoryGateway from "../../infra/gateway/category/CategoryGateway";
const data: { categories: Category[]; meta: {} } = reactive({
  categories: [],
  meta: {},
});
let categoryGateway: CategoryGateway;
onMounted(async () => {
  categoryGateway = inject("categoryGateway") as CategoryGateway;
  await getItems();
});

async function getItems() {
  const categoriesResponse = await categoryGateway.list();
  data.categories = categoriesResponse.data;
  data.meta = categoriesResponse.meta;
}

async function removeItem(id: string) {
  await categoryGateway.destroy(id);
  await getItems();
}
</script>

<style scoped></style>
