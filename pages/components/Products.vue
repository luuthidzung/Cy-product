<template>
  <div class="container">
    <!-- Price Filter -->
    <div class="price-filter">
      <label for="min-price">Min Price: </label>
      <input type="number" v-model="minPrice" id="min-price" />
      <label for="max-price">Max Price: </label>
      <input type="number" v-model="maxPrice" id="max-price" />
      <button @click="filterByPrice">Filter</button>
    </div>

    <div class="products">
      <div class="product-list">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="product-item"
        >
          <img
            :src="product.preview_img_path"
            :alt="product.name"
            class="product-image"
          />
          <div class="product-detail">
            <div class="product-info-left">
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
              </div>
            </div>
            <div class="product-info-right">
              <p>
                <strong>$ {{ product.price }} </strong>
              </p>
              <img
                src="../image/cart.png"
                alt="Cart Icon"
                class="icon-image"
                @click="addToCart(product)"
                :disabled="!isLoggedIn"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="!loading && currentPage <= totalPages"
      class="load-more-container"
    >
      <button @click="loadProducts" class="load-more-button">Load More</button>
    </div>

    <div v-if="loading" class="loading-spinner">Loading...</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { defineProps } from "vue";
const props = defineProps({
  addToCart: Function,
});
const API_URL = "http://152.42.240.131/api/v1";
const ITEMS_PER_PAGE = 10;
const cart = ref([]);
const products = ref([]);
const filteredProducts = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const totalPages = ref(1);
const token = useCookie("auth_token").value;
const minPrice = ref(0);
const maxPrice = ref(1000);

const filterByPrice = () => {
  filteredProducts.value = products.value.filter(
    (product) =>
      product.price >= minPrice.value && product.price <= maxPrice.value
  );
};

const loadProducts = async () => {
  if (currentPage.value <= totalPages.value) {
    loading.value = true;
    try {
      const response = await $fetch(
        `${API_URL}/products?page=${currentPage.value}&per_page=${ITEMS_PER_PAGE}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      products.value = [...products.value, ...response.data];
      currentPage.value += 1;
      totalPages.value = response.last_page;
      filteredProducts.value = products.value;
    } catch (err) {
      console.error("Error loading products:", err);
    } finally {
      loading.value = false;
    }
  }
};

const addToCart = (product) => {
  const existingProduct = cart.value.find((item) => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.value.push({ ...product, quantity: 1 });
  }
  console.log("Current cart:", cart.value);
  alert(`Đã thêm ${product.name} vào giỏ hàng!`);
};

onMounted(() => {
  loadProducts();
});
</script>

<style scoped>
.container {
  width: 1200px;
}
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.product-item {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 10px;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-detail {
  display: flex;
  margin: auto;
}
.product-info {
  padding: 15px;
}
.product-info-left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.product-info-right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}
.product-info-right img {
  width: 20px;
  cursor: pointer;
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
.price-filter {
  margin-bottom: 20px;
}

.price-filter label {
  font-size: 16px;
}

.price-filter input {
  width: 50px;
  padding: 5px;
  margin-right: 10px;
  border-radius: 20px;
  border-color: #e2e5ea;
}

.price-filter button {
  padding: 5px 10px;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.price-filter button:hover {
  background-color: #3182ce;
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

.load-more-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.load-more-button {
  padding: 10px 20px;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.load-more-button:hover {
  background-color: #3182ce;
}
.icon-cart {
  cursor: pointer;
}
.loading-spinner {
  text-align: center;
  font-size: 18px;
  color: #666;
}
.cart {
  background-color: #f9f9f9;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.cart-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>
{}
