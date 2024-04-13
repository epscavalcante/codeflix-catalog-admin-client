<template>
  <Suspense>
    <template #fallback> loading... </template>
    <template v-if="showForm" #default>
      <main>
        <form class="space-y-6">
          <div>
            <label
              for="username"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Username</label
            >
            <div class="mt-2">
              <input
                id="username"
                name="username"
                v-model="username"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Password</label
              >
              <div class="text-sm">
                <a
                  href="#"
                  class="font-semibold text-indigo-600 hover:text-indigo-500"
                  >Forgot password?</a
                >
              </div>
            </div>
            <div class="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                v-model="password"
                autocomplete="current-password"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              @click="login"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </main>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import AuthGateway from "../../infra/gateway/auth/AuthGateway";
import { useRouter } from "vue-router";
import { useAuth } from "../../composables/useAuth";
import KeycloakAuthGatewaySdk from "../../infra/gateway/auth/KeycloakAuthGatewaySdk";

let authGateway: AuthGateway;
const router = useRouter();
const username = ref("");
const password = ref("");
const showForm = ref(false);

onMounted(async () => {
  if (useAuth().isAuthenticated) await router.push({ name: "home" });
  authGateway = inject("authGateway") as AuthGateway;

  if (authGateway instanceof KeycloakAuthGatewaySdk) {
    await authGateway.login();
  } else showForm.value = true;
});

async function login() {
  try {
    const response = await authGateway.login({
      username: username.value,
      password: password.value,
    });

    // useAuth().setToken(response.access_token);
    router.push({ name: "home" });
  } catch (error) {
    console.error(error);
    alert("Erro ao fazer login");
  }
}
</script>

<style scoped></style>
