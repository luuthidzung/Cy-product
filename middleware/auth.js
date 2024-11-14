export default defineNuxtRouteMiddleware((to, from) => {
    const authCookie = document.cookie.split('; ').find(row => row.startsWith('auth_token='));
    override: true;
    if (!authCookie) {
      return navigateTo('/login');
    }
  });
  