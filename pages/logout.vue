<template>
  <div class="login">
    <h2>Đăng Nhập</h2>
    <form @submit.prevent="login">
      <div>
        <label for="name">Tên</label>
        <input v-model="name" type="text" id="name" required />
      </div>
      <div>
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" required />
      </div>
      <div>
        <label for="password">Mật khẩu</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">Đăng Nhập</button>
    </form>
    <div class="register-link">
      <p>Chưa có tài khoản? <router-link to="/signup">Đăng ký</router-link></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch("http://152.42.240.131/api/v1/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.loginData),
        });
        if (!response.ok) {
          throw new Error("Đăng nhập thất bại");
        }
        const data = await response.json();
        localStorage.setItem("token", data.token);
        this.$router.push("/");
      } catch (error) {
        console.error("Đăng nhập thất bại:", error);
      }
    },
  },
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

form div {
  margin-bottom: 15px;
}

form label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
}

form input {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

form button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

form button:hover {
  background-color: #0056b3;
}

.register-link {
  text-align: center;
  margin-top: 15px;
}

.register-link p {
  font-size: 14px;
}

.register-link router-link {
  color: #007bff;
  font-weight: bold;
}

.register-link router-link:hover {
  text-decoration: underline;
}
</style>
