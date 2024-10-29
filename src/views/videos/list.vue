<template>
  <header class="flex justify-between">
    <h1 class="text-3xl font-semibold mb-10">Vídeos</h1>

    <RouterLink
      class="btn btn-sm btn-outline btn-neutral"
      :to="{ name: 'videos.create' }"
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
          <th scope="col" class="px-6 py-3">Vídeo</th>
          <th scope="col" class="px-6 py-3">Year lauched</th>
          <th scope="col" class="px-6 py-3">Duration</th>
          <th scope="col" class="px-6 py-3">Rating</th>
          <th scope="col" class="px-6 py-3">IsPublished</th>
          <th scope="col" class="px-6 py-3">IsOpened</th>
          <th scope="col" class="px-6 py-3">CreatedAt</th>
          <th scope="col" class="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-500 hover:text-gray-800"
          v-for="(video, index) of data.items"
          :key="index"
        >
          <!-- <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ video.id }}
          </th> -->
          <td class="px-6 py-4">
            {{ video.title }} <br> {{ video.description }}
          </td>
          <td class="px-6 py-4">
            {{ video.yearLaunched}}
          </td>
          <td class="px-6 py-4">
            {{ video.duration}}
          </td>
          <td class="px-6 py-4">
            {{ video.rating}}
          </td>
          <td class="px-6 py-4">
            {{ video.isPublished}}
          </td>
          <td class="px-6 py-4">
            {{ video.isOpened}}
          </td>
          <td class="px-6 py-4">{{ video.createdAt }}</td>
          <td class="px-6 py-4">
            <RouterLink
              :to="{
                name: 'videos.edit',
                params: { id: video.id },
              }"
            >
              Edit
            </RouterLink>

            <button @click="removeItem(video.id as string)">Del</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, reactive, ref } from "vue";
import Video from "../../domain/Video.entity";
import VideoGateway from "../../infra/gateway/video/VideoGateway";
import { getToken } from "@josempgon/vue-keycloak";

const data = reactive({
  items: [] as Array<Video>,
  meta: {},
});
let videoGateway: VideoGateway;

onMounted(async () => {
  videoGateway = inject("videoGateway") as VideoGateway;
  await getItems();
});

async function getItems() {
  const token = await getToken();
  const videoResponse = await videoGateway.list({ headers: {
    'Authorization' : `Bearer ${token}`
  }});
  data.items = videoResponse.data;
  data.meta = videoResponse.meta;
}

async function removeItem(id: string) {
  await videoGateway.destroy(id);
  await getItems();
}
</script>

<style scoped></style>
