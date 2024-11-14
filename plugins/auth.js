// plugins/auth.js (Nuxt 3)
export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.provide('auth', {
      getToken: () => {
        return localStorage.getItem('authToken');
      },
      setToken: (token) => {
        localStorage.setItem('authToken', token);
      },
      clearToken: () => {
        localStorage.removeItem('authToken');
      }
    });
  });
  