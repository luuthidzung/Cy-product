<template>
  <div class="container">
    <h2>Profile</h2>
    <div class="profile-info">
      <div class="form-group">
        <label>Name:</label>
        <input type="text" v-model="profile.name" />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" v-model="profile.email" disabled />
      </div>
      <button @click="updateProfile" class="btn btn-primary">
        Update Profile
      </button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

const auth = useAuthStore();
const profile = ref({
  name: auth.user?.name,
  email: auth.user?.email,
});

async function updateProfile() {
  try {
    await $fetch("/api/profile", {
      method: "PUT",
      body: profile.value,
    });
    auth.user = { ...auth.user, ...profile.value };
  } catch (error) {
    console.error("Update failed:", error);
  }
}
</script>
