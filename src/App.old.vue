<template>
  <div class="flex overflow-hidden">
    <section
      class="bg-gray-950 flex flex-col p-5 min-h-screen min-w-max flex-1"
    >
      <h1 class="text-5xl font-black mb-5">CodeFlix</h1>

      <section class="flex">
        <div class="w-5/12">
          <div class="flex flex-col">
            <div class="card bg-base-100 shadow-xl min-h-screen">
              <div class="card-body">
                <div role="tablist" class="tabs tabs-boxed mb-4">
                  <a role="tab" class="tab tab-active">Genres</a>
                  <a role="tab" class="tab">Categories</a>
                  <a role="tab" class="tab">CastMembers</a>
                  <a role="tab" class="tab">Subscribers</a>
                </div>

                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end">
                  <button class="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="w-7/12">
          <h1>Assinantes</h1>
        </div>
      </section>
    </section>
    <aside
      class="bg-black w-4/6 lg:w-3/6 xl:w-4/12 p-5 h-screen overflow-y-scroll"
    >
      <section class="flex justify-between">
        <h2 class="mb-10 text-4xl font-black">Vídeos</h2>
        <button class="btn btn-outline btn-neutral" @click="openModal">
          Novo vídeo
        </button>
      </section>

      <section class="flex items-start mb-4">
        <div class="form-control w-full">
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full"
          />
          <label class="label">
            <span class="label-text-alt">Bottom Left label</span>
            <span class="label-text-alt">Bottom Right label</span>
          </label>
        </div>

        <button class="btn btn-outline btn-neutral">
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
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
            />
          </svg>
        </button>
      </section>
      <template v-for="i of 4" :key="i">
        <div
          class="card card-side bg-base-100 shadow-xl mb-3 border border-neutral-300"
        >
          <!-- <figure>
            <img src="/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie" />
          </figure> -->
          <div class="w-56 h-52 bg-slate-950 flex items-center justify-center">
            Imagem
          </div>
          <div class="card-body">
            <h2 class="card-title">New movie is released!</h2>
            <p class="text-sm">Click the button to watch on Jetflix app.</p>
            <div class="card-actions justify-end">
              <button class="btn btn-outline btn-neutral">Watch</button>
            </div>
          </div>
        </div>
      </template>
    </aside>
  </div>
  <BaseModal />
</template>

<script setup lang="ts">
import { markRaw } from "vue";
import BaseModal from "./components/BaseModal.vue";
import useModal from "./composables/useModal";
import NewVideoModal from "./components/NewVideoModal.vue";
function openModal() {
  useModal().open({
    component: markRaw(NewVideoModal),
    width: "w-3/5 lg:w-5/7",
  });
}
</script>

<style scoped></style>
