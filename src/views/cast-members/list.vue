<template>
  <header class="flex justify-between">
    <h1 class="text-3xl font-semibold mb-10">CastMembers</h1>

    <RouterLink
      class="btn btn-sm btn-outline btn-neutral"
      :to="{ name: 'castMembers.create' }"
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
          <th scope="col" class="px-6 py-3">Type</th>
          <th scope="col" class="px-6 py-3">Created At</th>
          <th scope="col" class="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-500 hover:text-gray-800"
          v-for="(castMember, index) of data.items"
          :key="index"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ castMember.id }}
          </th>
          <td class="px-6 py-4">{{ castMember.name }}</td>
          <td class="px-6 py-4">{{ castMember.type }}</td>
          <td class="px-6 py-4">{{ castMember.createdAt }}</td>
          <td class="px-6 py-4">
            <RouterLink
              :to="{
                name: 'castMembers.edit',
                params: { id: castMember.id },
              }"
            >
              Edit
            </RouterLink>

            <button @click="removeItem(castMember.id as string)">Del</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, reactive, } from "vue";
import CastMember from "../../domain/CastMember.entity";
import CastMemberGateway from "../../infra/gateway/cast-member/CastMemberGateway";

const data: { items: CastMember[]; meta: {} } = reactive({
  items: [],
  meta: {},
});
let castMemberGateway: CastMemberGateway;
onMounted(async () => {
  castMemberGateway = inject("castMemberGateway") as CastMemberGateway;
  await getItems();
});

async function getItems() {
  const castMemberResponse = await castMemberGateway.list();
  data.items = castMemberResponse.data;
  data.meta = castMemberResponse.meta;
}

async function removeItem(id: string) {
  await castMemberGateway.destroy(id);
  await getItems();
}
</script>

<style scoped></style>
