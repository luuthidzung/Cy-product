<template>
  <div class="order-page">
    <h2>Order Page</h2>

    <div v-if="!orderDetails">
      <!-- Form đặt hàng -->
      <div class="order-form">
        <label for="address">Address:</label>
        <input
          type="text"
          v-model="address"
          id="address"
          placeholder="Nhập địa chỉ giao hàng"
        />

        <label for="phone">Phone:</label>
        <input
          type="text"
          v-model="phone"
          id="phone"
          placeholder="Nhập số điện thoại"
        />
      </div>

      <!-- Danh sách giỏ hàng -->
      <h3>List Product</h3>
      <ul class="cart-list">
        <li v-for="item in cartItems" :key="item.product.id" class="cart-item">
          <p style="font-weight: bold; font-family: monospace">
            {{ item.product.name }}
          </p>
          <p>Quantity: {{ item.quantity }}</p>
          <p>Price: {{ item.product.price | currency }}</p>
        </li>
      </ul>

      <!-- Nút đặt hàng -->
      <button @click="submitOrder" class="order-button">Submit Order</button>
    </div>

    <div v-else>
      <!-- Thông tin đơn hàng -->
      <img src="./image/success.png" style="width: 100%" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useCookie } from "#app";

const address = ref("");
const phone = ref("");
const cartItems = ref(JSON.parse(sessionStorage.getItem("cart")) || []);
const orderDetails = ref(null); // Lưu thông tin đơn hàng

const submitOrder = async () => {
  const payload = {
    address: address.value,
    phone: phone.value,
    cart_item: cartItems.value.map((item) => ({
      product_id: item.product.id,
      quantity: item.quantity,
      price: item.product.price,
      name: item.product.name,
    })),
  };

  try {
    const token = useCookie("auth_token").value;
    const response = await axios.post(
      "http://152.42.240.131/api/v1/order",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Giả sử API trả về thông tin đơn hàng
    orderDetails.value = {
      order_id: response.data.order_id,
      order_date: response.data.order_date,
      delivery_date: response.data.delivery_date,
      items: response.data.items,
    };
    console.log("Đặt hàng thành công!", response.data);
  } catch (error) {
    console.error("Lỗi khi đặt hàng:", error);
    alert("Lỗi khi đặt hàng. Vui lòng thử lại.");
  }
};

definePageMeta({
  middleware: "auth",
});
</script>

<style>
.order-page {
  padding: 20px;
  max-width: 600px;
  margin: 40px auto;
  background-color: #ffffff;
  border-radius: 10px;
  font-family: "Arial", sans-serif;
}

.order-page h2 {
  font-size: 1.8rem;
  color: #333333;
  margin-bottom: 20px;
  text-align: center;
}

.order-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.order-form label {
  font-weight: 600;
  color: #555555;
}

.order-form input {
  padding: 10px;
  border: 1px solid #dddddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.order-form input:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  outline: none;
}

.cart-list {
  list-style-type: none;
  padding: 0;
  margin-bottom: 30px;
  background-color: #f8f9fa;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.cart-item {
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-item p {
  margin: 0;
  font-size: 1rem;
  color: #333333;
}

.cart-item p:first-of-type {
  font-size: 1.1rem;
  font-weight: bold;
  color: #000000;
}

.order-button {
  padding: 12px 25px;
  background-color: #007bff;
  color: #ffffff;
  font-weight: bold;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.order-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.order-button:active {
  background-color: #003d82;
  transform: translateY(0);
}

.order-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.order-page h3 {
  font-size: 1.5rem;
  color: #555555;
  margin-bottom: 15px;
}

.order-page p {
  margin: 5px 0;
  font-size: 1rem;
}

ul {
  padding: 0;
  list-style: none;
}

ul li {
  font-size: 1rem;
  color: #444444;
}

ul li strong {
  color: #000000;
}

@media (max-width: 768px) {
  .order-page {
    padding: 15px;
    max-width: 100%;
  }

  .order-form input {
    font-size: 0.9rem;
  }

  .order-button {
    font-size: 0.9rem;
    padding: 10px 20px;
  }
}
</style>
