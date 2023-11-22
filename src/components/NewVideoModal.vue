<template>
  <h3 class="mb-10 font-black text-2xl">Adicionar categoria</h3>

  <form action="#" class="flex flex-col gap-y-4 mb-8">
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">Category name</span>
      </label>
      <input
        type="text"
        placeholder="Type here"
        class="input input-bordered w-full"
      />
    </div>

    <div class="form-control w-36">
      <label class="cursor-pointer label">
        <span class="label-text">Active?</span>
        <input type="checkbox" class="toggle toggle-primary" checked />
      </label>
    </div>
  </form>

  <button class="btn btn-outline btn-neutral">Save</button>
</template>

<script setup lang="ts"></script>

<style scoped></style>
