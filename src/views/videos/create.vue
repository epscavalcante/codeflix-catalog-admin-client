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
          <span class="label-text">Title</span>
        </label>
        <input
          type="text"
          v-model="video.title"
          placeholder="Type here"
          class="input input-bordered w-full"
        />
      </div>

      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Description</span>
        </label>
        <textarea
          v-model="video.description"
          name="description"
          id="description"
          rows="10"
          class="w-full"
        ></textarea>
      </div>

      <section>
        <label
          :for="category.id"
          v-for="(category, index) of categories.items"
          :key="index"
          class="mr-2"
        >
          <input
            :id="category.id"
            name="categories[]"
            type="checkbox"
            :value="category.id"
            v-model="video.categoriesId"
            true-value="no"
            false-value="no"
          />
          {{ category.name }}
        </label>
      </section>

      <section>
        <label
          :for="genre.id"
          v-for="(genre, index) of genres.items"
          :key="index"
          class="mr-2"
        >
          <input
            :id="genre.id"
            name="genres[]"
            type="checkbox"
            :value="genre.id"
            v-model="video.genresId"
            true-value="no"
            false-value="no"
          />
          {{ genre.name }}
        </label>
      </section>

      <section>
        <label
          :for="castMember.id"
          v-for="(castMember, index) of castMembers.items"
          :key="index"
          class="mr-2"
        >
          <input
            :id="castMember.id"
            name="castMembers[]"
            type="checkbox"
            :value="castMember.id"
            v-model="video.castMembersId"
            true-value="no"
            false-value="no"
          />
          {{ castMember.name }}
        </label>
      </section>

      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Year launched</span>
        </label>
        <input
          type="number"
          v-model="video.yearLaunched"
          placeholder="Type here"
          class="input input-bordered w-full"
        />
      </div>

      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Duration</span>
        </label>
        <input
          type="number"
          v-model="video.duration"
          placeholder="Type here"
          class="input input-bordered w-full"
        />
      </div>

      <section>
        <label
          :for="rating.value"
          v-for="(rating, index) of ratings"
          :key="index"
          class="mr-2"
        >
          <input
            :id="rating.label"
            name="rating"
            type="radio"
            :value="rating.value"
            v-model="video.rating"
            true-value="no"
            false-value="no"
          />
          {{ rating.label }}
        </label>
      </section>

      <section>
        <label for="isOpened" class="mr-2">
          <input
            id="isOpened"
            name="isOpened"
            type="checkbox"
            v-model="video.isOpened"
            true-value="true"
            false-value="false"
          />
          Featured
        </label>
      </section>
    </form>

    <pre>{{ video }}</pre>

    <button @click="submit" class="btn btn-outline btn-neutral">Save</button>
  </section>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import GenreGateway from "../../infra/gateway/genre/GenreGateway";
import CategoryGateway from "../../infra/gateway/category/CategoryGateway";
import VideoGateway from "../../infra/gateway/video/VideoGateway";
import Category from "../../domain/Category.entity";
import Genre from "../../domain/Genre.entity";
import CastMemberGateway from "../../infra/gateway/cast-member/CastMemberGateway";
import CastMember from "../../domain/CastMember.entity";
import Video from "../../domain/Video.entity";

let videoGateway: VideoGateway;
let genreGateway: GenreGateway;
let categoryGateway: CategoryGateway;
let castMemberGateway: CastMemberGateway;

const categories: { items: Category[]; meta: {} } = reactive({
  items: [],
  meta: {},
});

const genres: { items: Genre[]; meta: {} } = reactive({
  items: [],
  meta: {},
});

const castMembers: { items: CastMember[]; meta: {} } = reactive({
  items: [],
  meta: {},
});

const ratings = computed(() => {
  return [
    { label: "L", value: "RL" },
    { label: "10", value: "10" },
    { label: "12", value: "12" },
    { label: "14", value: "14" },
    { label: "16", value: "16" },
    { label: "18", value: "18" },
  ];
});

const video = ref(new Video({}));

async function getGenres() {
  const genresResponse = await genreGateway.list();
  genres.items = genresResponse.data;
  genres.meta = genresResponse.meta;
}

async function getCategories() {
  const categoriesResponse = await categoryGateway.list();
  categories.items = categoriesResponse.data;
  categories.meta = categoriesResponse.meta;
}

async function getCastMembers() {
  const castMembersResponse = await castMemberGateway.list();
  castMembers.items = castMembersResponse.data;
  castMembers.meta = castMembersResponse.meta;
}

const router = useRouter();
async function submit() {
  try {
    const res = await videoGateway.create({
      title: video.value.title,
      description: video.value.description,
      yearLaunched: Number(video.value.yearLaunched),
      duration: Number(video.value.duration),
      rating: video.value.rating,
      isOpened: Boolean(video.value.isOpened),
      genresId: video.value.genresId as [],
      categoriesId: video.value.categoriesId as [],
      castMembersId: video.value.castMembersId as [],
    });

    console.log(res);

    router.push({ name: "videos.list" });
  } catch (error) {
    console.log("deu erro", error);
  }
}

onMounted(async () => {
  videoGateway = inject("videoGateway") as VideoGateway;
  genreGateway = inject("genreGateway") as GenreGateway;
  categoryGateway = inject("categoryGateway") as CategoryGateway;
  castMemberGateway = inject("castMemberGateway") as CastMemberGateway;

  await Promise.all([getGenres(), getCategories(), getCastMembers()]);
});
</script>

<style scoped></style>
