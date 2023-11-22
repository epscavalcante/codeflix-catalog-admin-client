<template>
  <section class="max-w-screen-lg mx-auto">
    <h1 class="text-3xl text-gray-200 font-semibold mb-16">
      Categories

      <button class="btn btn-sm btn-outline btn-neutral" @click="openModal">
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
      </button>
    </h1>

    <section>
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>CreatedAt</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr v-for="(category, index) of data.categories" :key="index">
              <td>
                <div class="font-bold">{{ category.props.name }}</div>
              </td>
              <td>
                <div
                  class="badge gap-2"
                  :class="[
                    category.props.isActive ? 'badge-success' : 'badge-error',
                  ]"
                >
                  {{ category.props.isActive ? "SIM" : "Não" }}
                </div>
              </td>
              <td>{{ category.props.createdAt }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { inject, onMounted, reactive } from "vue";
import CategoryService from "../domain/CategoryService.interface";
import Category from "../domain/Category.entity";
import { markRaw } from "vue";
import useModal from "../composables/useModal";
import NewVideoModal from "../components/NewVideoModal.vue";
function openModal() {
  useModal().open({
    component: markRaw(NewVideoModal),
    // width: "w-3/5 lg:w-5/7",
  });
}

const data: { categories: Category[] } = reactive({
  categories: [],
});

onMounted(async () => {
  const categoriesService = inject("CategoryService") as CategoryService;

  data.categories = await categoriesService.getCategories();
});
</script>

<style scoped></style>
