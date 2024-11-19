<template>
  <div>
    <h2>Log in</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="name" placeholder="name" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
    <p v-if="message">{{ message }}</p>
    <div class="register-link">
      <p>Chưa có tài khoản? <router-link to="/signup">Đăng ký</router-link></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");
const message = ref("");
const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await fetch("http://152.42.240.131/api/v1/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      document.cookie = `auth_token=${data.token}; path=/; secure; samesite=strict`;
      message.value = "Login successful!";
      router.push("/");
    } else {
      message.value = data.message || "Login failed";
    }
  } catch (error) {
    message.value = "An error occurred. Please try again.";
  }
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

h2 {
  text-align: center;
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.5rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

form input {
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  transition: border-color 0.3s ease;
}

form input:focus {
  outline: none;
  border-color: #007bff;
}

form button {
  padding: 0.8rem;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

form button:hover {
  background-color: #0056b3;
}

.register-link {
  text-align: center;
  margin-top: 1rem;
}

.register-link p {
  font-size: 0.9rem;
  color: #333;
}

.register-link a {
  color: #007bff;
  font-weight: bold;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
