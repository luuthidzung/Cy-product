<template>
  <div v-if="arrCartSession.length > 0" class="cart">
    <h2>My Cart</h2>

    <!-- Danh sách sản phẩm trong giỏ hàng -->
    <div
      v-for="(item, index) in arrCartSession"
      :key="item.id"
      class="cart-item"
    >
      <div class="item-details" style="display: flex">
        <img
          :src="
            item.product.image ||
            'https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dw4f15eb25/images/hi-res/2024-L7-CK2-30271420-01-1.jpg?sw=756&sh=1008'
          "
          alt="Product Image"
          class="product-image"
        />
        <div class="item-info">
          <p style="font-weight: bold; font-family: monospace; font-size: 14px">
            {{ item.product.name }}
          </p>
          <p>Price: $ {{ item.product.price | currency }}</p>
          <div class="quantity-control">
            <button @click="decreaseQuantity(index)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="increaseQuantity(index)">+</button>
          </div>
        </div>
        <button @click="removeFromCart(index)" class="remove-item">
          <img src="./image/delete.svg" style="width: 20px" />
        </button>
      </div>
    </div>

    <!-- Tổng giá trị giỏ hàng -->
    <div class="cart-total">
      <p>Sum: $ {{ totalPrice | currency }}</p>
      <button @click="checkout">Go to checkout</button>
    </div>
  </div>

  <div
    v-else
    style="display: flex; align-items: center; justify-content: center"
  >
    <!-- <p>Giỏ hàng của bạn đang trống!</p> -->
    <img src="./image/404.jpg" style="height: 60vh" />
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";

// Lưu trữ giỏ hàng
const arrCartSession = ref([]);

// Khi trang tải lại, lấy dữ liệu từ sessionStorage
onMounted(() => {
  if (process.client) {
    const cartData = JSON.parse(sessionStorage.getItem("cart"));
    arrCartSession.value = cartData || [];
  }
});

// Tính tổng giá trị giỏ hàng
const totalPrice = computed(() => {
  return arrCartSession.value.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
});

// Tăng số lượng sản phẩm trong giỏ
const increaseQuantity = (index) => {
  arrCartSession.value[index].quantity++;
  updateSessionStorage();
};

// Giảm số lượng sản phẩm trong giỏ
const decreaseQuantity = (index) => {
  if (arrCartSession.value[index].quantity > 1) {
    arrCartSession.value[index].quantity--;
    updateSessionStorage();
  }
};

// Xóa sản phẩm khỏi giỏ
const removeFromCart = (index) => {
  arrCartSession.value.splice(index, 1);
  updateSessionStorage();
};

// Cập nhật lại sessionStorage khi giỏ hàng thay đổi
const updateSessionStorage = () => {
  if (process.client) {
    sessionStorage.setItem("cart", JSON.stringify(arrCartSession.value));
  }
};

// Thanh toán (tùy chọn thêm logic xử lý)
const checkout = () => {
  navigateTo("/orders");
};
</script>

<style scoped>
.cart {
  padding: 20px;
  background-color: #f9f9f9;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.item-details {
  display: flex;
  align-items: center;
}

.product-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 15px;
}

.item-info {
  display: flex;
  flex-direction: column;
}

.item-info p {
  margin: 0;
  color: #555;
}

.quantity-control {
  display: flex;
  align-items: center;
  margin-top: 8px;
}

.quantity-control button {
  padding: 5px 10px;
  font-size: 16px;
  color: #333;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.quantity-control button:hover {
  background-color: #e0e0e0;
}

.quantity-control span {
  margin: 0 8px;
  font-size: 16px;
}

.remove-item {
  background-color: #ffffff;
  color: white;
  border: none;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.remove-item:hover {
  background-color: #ff3336;
}

.cart-total {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #ddd;
  text-align: right;
}

.cart-total p {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.cart-total button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.2s;
}

.cart-total button:hover {
  background-color: #218838;
}

.empty-cart-message {
  text-align: center;
  color: #777;
  font-size: 18px;
  padding: 20px;
}
</style>
