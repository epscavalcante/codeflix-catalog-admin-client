<template>
  <Teleport to="#modals">
    <Transition name="modal">
      <div
        v-if="state.isActive"
        class="modal-backgrop fixed left-0 flex flex-col z-60 top-0 min-w-full min-h-screen bg-black/95 justify-center items-center"
        @click.self="handleModal({ ...state, isActive: false })"
      >
        <div :class="state.width" class="relative bg-slate-800 p-14 rounded-lg">
          <div class="px-5 absolute -right-8 -top-3">
            <button
              class="btn btn-black rounded-full"
              @click="handleModal({ ...state, isActive: false })"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div class="modal-container">
            <Suspense>
              <component :is="state.component" v-bind="state.props" />

              <template #fallback> Loading... </template>
            </Suspense>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive } from "vue";
import useModal from "../composables/useModal";

export type ModalState = {
  isActive?: boolean;
  component: Object;
  props?: Object;
  width?: string;
};

const DEFAULT_WIDTH = "w-3/5 lg:w-1/3";

const state: ModalState = reactive({
  isActive: false,
  component: {},
  props: {},
  width: DEFAULT_WIDTH,
});

onMounted(() => {
  useModal().listen(handleModal);
});

onBeforeUnmount(() => {
  useModal().off(handleModal);
});

function handleModal(payload: ModalState) {
  if (payload.isActive) {
    state.isActive = payload.isActive;
    state.component = payload.component;
    state.props = payload.props;
    state.width = payload.width ?? DEFAULT_WIDTH;
  } else {
    state.isActive = false;
    state.component = {};
    state.props = {};
    state.width = DEFAULT_WIDTH;
  }
}
</script>

<style scoped>
.modal-backgrop {
  transition: opacity 0.3s ease;
}

.modal-container {
  transition: all 0.3s ease;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
