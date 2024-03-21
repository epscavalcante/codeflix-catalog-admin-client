<template>
  <section class="container">
    <header class="flex justify-between">
      <h3 class="mb-10 font-black text-2xl">
        Editar categoria {{ route.params.id }}
      </h3>
      <router-link
        class="btn btn-sm btn-outline btn-neutral"
        :to="{ name: 'categories.list' }"
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
      <div class="flex flex-col">
        <label for="name">Name </label>
        <input
          id="name"
          type="text"
          v-model="category.name"
          placeholder="Type here"
          class="form-input"
        />
      </div>

      <div class="flex flex-col">
        <label for="description">Description </label>
        <textarea
          id="description"
          v-model="category.description"
          placeholder="Type here"
          class="form-textarea"
        >
        </textarea>
      </div>

      <label for="isActive" class="flex items-center gap-2">
        <input
          id="isActive"
          type="checkbox"
          v-model="category.isActive"
          class="toggle toggle-primary"
          checked
        />

        Active?
      </label>
    </form>

    <button @click="submit" class="btn btn-outline btn-neutral">Save</button>
  </section>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, ref } from "vue";
import CategoryGateway from "../../infra/gateway/category/CategoryGateway";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
let categoryGateway: CategoryGateway;
const category = ref({
  name: "",
  description: "",
  isActive: false,
});
onMounted(async () => {
  categoryGateway = inject("categoryGateway") as CategoryGateway;
  const categoryResponse = await categoryGateway.find(
    route.params.id as string
  );
  category.value.name = categoryResponse.name;
  category.value.description = categoryResponse.description ?? "";
  category.value.isActive = categoryResponse.isActive;
});

const formIsValid = computed(
  () => category.value.name.length > 1 && category.value.isActive !== undefined
);

const router = useRouter();
async function submit() {
  try {
    const res = await categoryGateway.update(route.params.id as string, {
      name: category.value.name,
      description: category.value.description,
      isActive: category.value.isActive,
    });

    router.push({ name: "categories.list" });
  } catch (error) {
    console.log("deu erro", error);
  }
}
</script>

<style scoped></style>
