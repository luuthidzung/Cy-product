<template>
  <div class="register-container">
    <div class="register-form">
      <h2>Signup</h2>
      <form @submit.prevent="handleRegister">
        <input v-model="name" placeholder="name" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Signup</button>
      </form>
      <p v-if="message" class="message">{{ message }}</p>
      <div class="register-link">
        <p>Đã có tài khoản? <router-link to="/login">Đăng nhập</router-link></p>
      </div>
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
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.register-form {
  width: 100%;
  max-width: 400px;
  padding: 2.5rem;
  background-color: #ffffff;
  color: #333;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.register-form:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
}

.register-form h2 {
  text-align: center;
  color: #333;
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
}

form {
  display: flex;
  flex-direction: column;
}

form input {
  padding: 0.9rem;
  margin-bottom: 1.2rem;
  font-size: 1rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  transition: border 0.3s ease;
}

form input:focus {
  border-color: #f53d2d;
  outline: none;
}

form button {
  padding: 0.9rem;
  font-size: 1rem;
  background-color: #f53d2d;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
}

form button:hover {
  background-color: #e13320;
}

.register-link {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
}

.register-link a {
  color: #f53d2d;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;
}

.register-link a:hover {
  color: #e13320;
}

.message {
  text-align: center;
  margin-top: 1.2rem;
  color: #f53d2d;
  font-size: 0.95rem;
  font-weight: bold;
}
</style>
