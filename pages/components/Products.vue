<template>
  <div class="container">
    <div class="filter-container">
      <!-- Categories Section -->

      <div class="categories-section" ref="categoriesRef">
        <div
          class="categories-btn"
          @click.stop="toggleCategories"
          style="display: flex; gap: 10px"
        >
          <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
          Categories
        </div>
        <div v-show="showCategories" class="categories-dropdown">
          <ul>
            <div
              @click="handleCategoryClick(null)"
              :class="{
                active: selectedCategory === null,
                'category-item': true,
              }"
            >
              <div class="category-content">
                <div class="category-info">
                  <span class="category-name">All Categories</span>
                </div>
              </div>
            </div>

            <div
              v-for="category in categoriesBySlug"
              :key="category.id"
              @click="handleCategoryClick(category)"
              :class="{
                active: selectedCategory && selectedCategory.id === category.id,
                'category-item': true,
              }"
            >
              <div class="category-content">
                <img
                  :src="category.preview_img_path"
                  :alt="category.name"
                  class="category-image"
                />
                <div class="category-info">
                  <span class="category-name">{{ category.name }}</span>
                  <span class="category-slug">{{ category.slug }}</span>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>

      <!-- Price Filter -->
      <div class="price-filter">
        <button
          @click="togglePriceFilter"
          style="display: flex; align-items: center; gap: 10px"
        >
          <img src="../image/filter.svg" style="width: 15px" />Filter
        </button>

        <div v-show="showPriceFilter" class="dropdown">
          <label for="min-price">Min Price: </label>
          <input type="number" v-model="minPrice" id="min-price" />
          <label for="max-price">Max Price: </label>
          <input type="number" v-model="maxPrice" id="max-price" />
          <button
            @click="applyPriceFilter"
            style="width: 100%; padding: 5px 10px"
          >
            Apply
          </button>
        </div>
      </div>

      <div class="search-container">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search..."
          @input="filterProducts"
          class="search-input"
        />
      </div>
    </div>

    <!-- Categories Section -->

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
            style="border-radius: 10px"
          />
          <div class="product-detail">
            <div class="product-info-left">
              <h3 style="font-family: monospace">{{ product.name }}</h3>
              <p class="stock">Còn lại: {{ product.stock }}</p>
              <div class="cart-small">
                <button
                  style="border-radius: 20px; padding: 10px; border: white"
                >
                  Detail Product
                </button>
              </div>
            </div>
            <div class="product-info-right">
              <p>
                <strong style="color: #cc1414; font-size: 18px">
                  ${{ product.price }}
                </strong>
              </p>
              <img
                src="../image/cart.png"
                alt="Cart Icon"
                class="icon-image"
                @click="addToCart(product)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sentinel (dùng để load thêm dữ liệu) -->
    <div ref="sentinel" class="sentinel"></div>

    <div v-if="loading" class="loading-spinner">Loading...</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useCookie } from "#app";
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
const showPriceFilter = ref(false);
const listProductCookie = useCookie("list-products");
const searchQuery = ref("");
const sentinel = ref(null);

const loadProducts = async () => {
  if (currentPage.value <= totalPages.value && !loading.value) {
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
      filteredProducts.value = products.value;
      currentPage.value += 1;
      totalPages.value = response.last_page;
    } catch (err) {
      console.error("Error loading products:", err);
    } finally {
      loading.value = false;
    }
  }
};

const handleIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadProducts();
    }
  });
};

onMounted(() => {
  const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  });

  if (sentinel.value) {
    observer.observe(sentinel.value);
  }
});

const categoriesBySlug = ref([]);
const selectedCategory = ref(null);
const showCategories = ref(false);

const toggleCategories = () => {
  showCategories.value = !showCategories.value;
};

const fetchCategories = async () => {
  try {
    const response = await $fetch(`${API_URL}/categories`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    categoriesBySlug.value = response.data;
  } catch (err) {
    console.error("Error loading categories:", err);
  }
};

const handleCategoryClick = (category) => {
  selectedCategory.value = category;
  filterProducts();
  showCategories.value = false;
};

const togglePriceFilter = () => {
  showPriceFilter.value = !showPriceFilter.value;
};

const filterProducts = () => {
  filteredProducts.value = products.value.filter((product) => {
    const matchesName = product.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    const matchesCategory = selectedCategory.value
      ? product.category_id === selectedCategory.value.id
      : true;
    const matchesPrice =
      product.price >= minPrice.value && product.price <= maxPrice.value;

    return matchesName && matchesCategory && matchesPrice;
  });
};

watch([searchQuery, minPrice, maxPrice, selectedCategory], () => {
  filterProducts();
});

const filterByPrice = () => {
  filterProducts();
};

const { data: list } = await useAsyncData("loadList", async () => {
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
    listProductCookie.value = response.data;
    return response.data;
  } catch (err) {
    console.error("Error loading products:", err);
  } finally {
    loading.value = false;
  }
});

const addToCart = (product) => {
  const arrCartSession = JSON.parse(sessionStorage.getItem("cart")) || [];
  const existingProduct = arrCartSession.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    const data = {
      id: product.id,
      product: product,
      quantity: 1,
    };
    arrCartSession.push(data);
  }
  sessionStorage.setItem("cart", JSON.stringify(arrCartSession));
};

onMounted(() => {
  fetchCategories();
});

watch([minPrice, maxPrice, selectedCategory], () => {
  filterProducts();
});
</script>

<style scoped>
.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-input {
  width: 100%;
  max-width: 500px;
  padding: 12px;
  border-radius: 20px;
  border: 1px solid #ccc;
  font-size: 16px;
  margin-top: 8px;
}

.filter-container {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0 150px;
  margin-top: 50px;
}

.categories-btn {
  background: linear-gradient(to bottom, white, white, #a4d2fd);
  border-radius: 50px;
  padding: 15px;
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-family: monospace;
  font-size: 16px;
  color: rgb(78, 72, 72);
}

.price-filter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.category-item {
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.category-item:hover {
  background-color: #f0f0f0;
}

.category-item.active {
  background-color: #e0e0e0;
}

.category-content {
  display: flex;
  align-items: center;
}

.category-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
}
.sentinel {
  height: 1px;
}

.category-info {
  display: flex;
  flex-direction: column;
}
.categories-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 300%;
  height: 700%;
  overflow-y: auto;
  z-index: 1000;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding: 10px;
}

.categories-section {
  position: relative;
}
.container {
  width: 100%;
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 2px;
}

.hamburger span {
  display: block;
  width: 20px;
  height: 2px;
  background-color: currentColor;
}
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px 100px;
}

.product-item {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 20px;
  height: auto;
}

.product-image {
  width: 100%;
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
  align-items: flex-start;
  margin-right: 20px;
  gap: 10px;
  height: 220px;
}

.product-info-right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}

.product-info-right img {
  width: 30px;
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

.price-filter label {
  font-size: 16px;
}

.price-filter input {
  padding: 5px;
  border-radius: 20px;
  border-color: #e2e5ea;
}

.price-filter button:hover {
  background-color: #3182ce;
}
.price-filter {
  position: relative;
}
.price-filter button {
  background: linear-gradient(to bottom, white, white, #a4d2fd);
  border-radius: 20px;
  padding: 15px;
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-family: monospace;
  font-size: 16px;
  color: rgb(0, 0, 0);
  border: #a4d2fd;
}
.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.dropdown input {
  width: 80%;
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
