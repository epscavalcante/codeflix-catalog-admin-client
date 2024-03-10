<template>
  <section class="container">
    <header class="flex justify-between">
      <h3 class="mb-10 font-black text-2xl">
        Edit cast member {{ route.params.id }}
      </h3>
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
      <form action="#" class="flex flex-col gap-y-4 mb-8">
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Name</span>
        </label>
        <input
          type="text"
          v-model="castMember.name"
          placeholder="Type here"
          class="input input-bordered w-full"
        />
      </div>


      <div class="form-control w-36">
        <label class="cursor-pointer label">
          <select name="type" id="type" class="w-full" v-model="castMember.type">
            <option value="null">Select</option>
            <option value="1">Director</option>
            <option value="2">Actor</option>
          </select>
        </label>
      </div>
    </form>
    </form>

    <button @click="submit" class="btn btn-outline btn-neutral">Save</button>

    <pre>{{ castMember }}</pre>
  </section>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import CastMemberGateway from "../../infra/gateway/cast-member/CastMemberGateway";

const route = useRoute();
let castMemberGateway: CastMemberGateway;
const castMember = ref({
  name: "",
  type: null as any
});
onMounted(async () => {
  castMemberGateway = inject("castMemberGateway") as CastMemberGateway;
  const castMemberResponse = await castMemberGateway.find(
    route.params.id as string
  );
  castMember.value.name = castMemberResponse.name;
  castMember.value.type = castMemberResponse.type;
});

const formIsValid = computed(
  () => castMember.value.name.length > 1 && !!castMember.value.type
);

const router = useRouter();
async function submit() {
  try {
    const res = await castMemberGateway.update(route.params.id as string, {
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