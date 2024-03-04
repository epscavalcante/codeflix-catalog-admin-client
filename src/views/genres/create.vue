<template>
  <section class="container">
    <header class="flex justify-between">
      <h3 class="mb-10 font-black text-2xl">Create genre</h3>
      <router-link
        class="btn btn-sm btn-outline btn-neutral"
        :to="{ name: 'genres.list' }"
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
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </router-link>
    </header>

    <form action="#" class="flex flex-col gap-y-4 mb-8">
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Name</span>
        </label>
        <input
          type="text"
          v-model="genre.name"
          placeholder="Type here"
          class="input input-bordered w-full"
        />
      </div>

      <section>
        <label
          :for="category.id"
          v-for="(category, index) of data.items"
          :key="index"
          class="mr-2"
        >
          <input
            :id="category.id"
            name="categories[]"
            type="checkbox"
            :value="category.id"
            v-model="genre.categoriesId"
            true-value="no"
            false-value="no"
          />
          {{ category.name }}
        </label>
      </section>
    </form>

    <button @click="submit" class="btn btn-outline btn-neutral">Save</button>
  </section>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import GenreGateway from "../../infra/gateway/genre/GenreGateway";
import CategoryGateway from "../../infra/gateway/category/CategoryGateway";
import Category from "../../domain/Category.entity";

let genreGateway: GenreGateway;
let categoryGateway: CategoryGateway;

const data: { items: Category[]; meta: {} } = reactive({
  items: [],
  meta: {},
});

async function getCategories() {
  const categoriesResponse = await categoryGateway.list();
  data.items = categoriesResponse.data;
  data.meta = categoriesResponse.meta;
}

const genre = ref({
  name: "",
  categoriesId: [],
});

const router = useRouter();
async function submit() {
  try {
    const res = await genreGateway.create({
      name: genre.value.name,
      categoriesId: genre.value.categoriesId,
    });

    router.push({ name: "genres.list" });
  } catch (error) {
    console.log("deu erro", error);
  }
}

onMounted(async () => {
  genreGateway = inject("genreGateway") as GenreGateway;
  categoryGateway = inject("categoryGateway") as CategoryGateway;

  await getCategories();
});
</script>

<style scoped></style>
