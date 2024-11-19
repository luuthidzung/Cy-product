<template>
  <div class="login-container">
    <div class="login-form">
      <h2>Đăng nhập</h2>
      <form @submit.prevent="handleLogin">
        <input
          v-model="email"
          type="text"
          placeholder="Email/Số điện thoại/Tên đăng nhập"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Mật khẩu"
          required
        />
        <button type="submit">ĐĂNG NHẬP</button>
      </form>
      <div class="login-options">
        <a href="#" class="forgot-password">Quên mật khẩu</a>
        <span>Đăng nhập với SMS</span>
      </div>
      <div class="social-login">
        <button class="social-btn facebook">Facebook</button>
        <button class="social-btn google">Google</button>
      </div>
      <p class="register-link">
        Bạn mới biết đến Luuz? <router-link to="/signup">Đăng ký</router-link>
      </p>
      <p v-if="message" class="message">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const message = ref("");
const router = useRouter();

const isValidEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailPattern.test(email);
};

const handleLogin = async () => {
  try {
    const response = await fetch("http://152.42.240.131/api/v1/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("User data received:", data.user);
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log("Stored user data:", localStorage.getItem("user"));
      // localStorage.setItem("user", JSON.stringify(data.user));

      document.cookie = `auth_token=${data.token}; path=/; secure; samesite=strict`;
      message.value = "Đăng nhập thành công!";
      router.push("/");
    } else {
      message.value = data.message || "Đăng nhập thất bại!";
    }
  } catch (error) {
    message.value = "Lỗi kết nối. Vui lòng thử lại!";
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background-color: #ffffff;
  color: #fff;
  font-family: Arial, sans-serif;
}

.login-logo {
  flex: 1;
  text-align: center;
  padding: 2rem;
}

.login-logo img {
  width: 100px;
  margin-bottom: 1rem;
}

.login-logo p {
  font-size: 1.1rem;
  max-width: 300px;
  margin: 0 auto;
  line-height: 1.4;
}

.login-form {
  flex: 1;
  max-width: 400px;
  padding: 2.5rem;
  background-color: #ffffff;
  color: #333;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.login-form:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
}

.login-form h2 {
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

.login-options {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #333;
  margin-top: 1rem;
}

.login-options a,
.login-options span {
  color: #f53d2d;
  cursor: pointer;
  text-decoration: underline;
}

.social-login {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}

.social-btn {
  flex: 1;
  padding: 0.8rem;
  margin: 0 0.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
  transition: opacity 0.3s ease;
}

.social-btn:hover {
  opacity: 0.8;
}

.facebook {
  background-color: #3b5998;
}

.google {
  background-color: #db4437;
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
