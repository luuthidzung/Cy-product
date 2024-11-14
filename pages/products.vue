<template>
  <div>
    <div class="products">
      <div class="product-list">
        <div
          v-for="product in list?.data"
          :key="product.id"
          class="product-item"
        >
          <img
            :src="product.preview_img_path"
            :alt="product.name"
            class="product-image"
          />
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p class="stock">Còn lại: {{ product.stock }}</p>
            <div
              class="cart-small"
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <button
                style="
                  padding: 10px;
                  border-radius: 20px;
                  border: 2px;
                  font-weight: bold;
                  color: gray;
                  cursor: pointer;
                "
              >
                Detail Product
              </button>
              <div>
                <p>
                  <strong>{{ product.price }} USD</strong>
                </p>
                <img
                  src="./image/cart.png"
                  alt="Cart Icon"
                  class="icon-image"
                  @click="addToCart(product)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAsyncData } from "#app";

// Constants
const API_URL = "http://152.42.240.131/api/v1";
const ITEMS_PER_PAGE = 10;

// // Refs
const username = ref(null);
const products = ref([]);
const loading = ref(true);
const error = ref(null);
const pagination = ref({
  current_page: 1,
  last_page: 1,
  total: 0,
});
const currentPage = ref(1);
const cart = ref([]);

const token = useCookie("auth_token").value;
const { data: list, error: fetchError } = await useAsyncData("callData", () => {
  return $fetch("http://152.42.240.131/api/v1/products", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
});
// console.log(list);
onMounted(() => {
  console.log(products.value);
});
</script>

<style scoped>
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.product-item {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 15px;
}

.product-info h3 {
  font-size: 18px;
  margin: 0 0 10px;
}

.product-info p {
  margin: 8px 0;
  color: #666;
}

.stock {
  color: #2c5282;
  font-size: 14px;
}

.actions {
  margin-top: 15px;
}

.actions button {
  background-color: #4299e1;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.actions button:hover {
  background-color: #3182ce;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
}

.page-button {
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.page-button.active {
  background-color: #4299e1;
  color: white;
  border-color: #4299e1;
}

.page-button:disabled {
  background-color: #edf2f7;
  cursor: not-allowed;
}
</style>
