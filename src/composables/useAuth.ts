import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useAuth = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token") || '');
  const isAuth = ref(false);

  function setToken(_token: string) {
    localStorage.setItem("token", _token);
    token.value = _token;
  }

  const isAuthenticated = computed(() => {
    const token = localStorage.getItem('token');

    return token && token === 'undefined';
  });

  return {
    setToken,
    isAuthenticated,
    isAuth,
  };
});
