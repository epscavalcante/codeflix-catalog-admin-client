<template>
  <section class="container">
    <header class="flex justify-between">
      <h3 class="mb-10 font-black text-2xl">Create cast member</h3>
      <router-link
        class="btn btn-sm btn-outline btn-neutral"
        :to="{ name: 'castMembers.list' }"
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
        <label for="name">Name</label>
        <input
          id="name"
          type="text"
          v-model="castMember.name"
          placeholder="Type here"
          class="form-input"
        />
      </div>

      <div class="flex flex-col">
        <label for="type">Type</label>
        <select
          name="type"
          id="type"
          class="form-select"
          v-model="castMember.type"
        >
          <option value="null">Select</option>
          <option value="1">Director</option>
          <option value="2">Actor</option>
        </select>
      </div>
    </form>
    <button @click="submit" class="btn btn-outline btn-neutral">Save</button>
  </section>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import CastMemberGateway from "../../infra/gateway/cast-member/CastMemberGateway";
import Category from "../../domain/Category.entity";

let castMemberGateway: CastMemberGateway;
onMounted(() => {
  castMemberGateway = inject("castMemberGateway") as CastMemberGateway;
});

const castMember = ref({
  name: "",
  type: null,
});

const formIsValid = computed(
  () =>
    castMember.value.name.length > 1 &&
    [1, 2].includes(castMember.value.type as any)
);

const router = useRouter();
async function submit() {
  try {
    const res = await castMemberGateway.create({
      name: castMember.value.name,
      type: Number(castMember.value.type),
    });

    router.push({ name: "castMembers.list" });
  } catch (error) {
    console.log("deu erro", error);
  }
}
</script>

<style scoped></style>
