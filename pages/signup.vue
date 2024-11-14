<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="name" placeholder="name" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
    </form>
    <p v-if="message">{{ message }}</p>
    <div class="login-link">
      <p>Đã có tài khoản? <router-link to="/login">Đăng nhập</router-link></p>
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
const handleRegister = async () => {
  try {
    const response = await fetch("http://152.42.240.131/api/v1/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
      }),
    });

    const data = await response.json();
    if (data.status === "success") {
      message.value = "Signup successful! Please log in.";
      router.push("/login");
    } else {
      router.push("/login");
    }
  } catch (error) {
    message.value = "An error occurred. Please try again.";
  }

  //   const data = await response.json();
  //   if (data.status === "success") {
  //     message.value = "Signup successful!";
  //     router.push("/login");
  //   } else {
  //     message.value = data.message || "Signup failed";
  //   }
  // } catch (error) {
  //   message.value = "An error occurred. Please try again.";
  // }
};
</script>
<style scoped>
.signup {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
  font-weight: bold;
}

form div {
  margin-bottom: 20px;
}

form label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #555;
}

form input {
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
  box-sizing: border-box;
}

form input:focus {
  border-color: #007bff;
}

form button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

form button:hover {
  background-color: #0056b3;
}
</style>
