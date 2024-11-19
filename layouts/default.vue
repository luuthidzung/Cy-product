<template>
  <div class="container">
    <header class="navbar">
      <nav class="navbar">
        <div class="navbar-container">
          <div class="top-nav" style="display: flex">
            <div style="display: flex; align-items: center; gap: 50px">
              <a href="/" class="logo-link">
                <img
                  src="../pages/image/logo.svg"
                  alt="Logo"
                  class="logo-img"
                  style="width: 50px"
                />
              </a>

              <div class="categories-section" ref="categoriesRef">
                <div class="categories-btn" @click.stop="toggleCategories">
                  <div class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  Categories
                </div>

                <div v-show="showCategories" class="categories-dropdown">
                  <ul>
                    <li
                      v-for="category in categoriesBySlug"
                      :key="category.id"
                      @click="handleCategoryClick(category.id)"
                      :class="{
                        active: selectedCategory === category.id,
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
                          <span class="category-id">{{ category.id }}</span>
                          <span class="category-name">{{ category.name }}</span>
                          <span class="category-slug">{{ category.slug }}</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <nav class="nav-links">
                <a href="#" class="nav-shopping">
                  <NuxtLink
                    :to="{
                      name: 'Product__Index',
                    }"
                  >
                    Shopping
                  </NuxtLink>
                </a>
              </nav>
            </div>
            <div
              class="search-container"
              style="display: flex; width: 30%; margin-left: 120px"
            >
              <input
                type="text"
                class="search-input"
                placeholder="Search for anything"
                v-model="searchQuery"
                @input="filterByName"
              />
            </div>

            <div
              class="nav-right"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 50px;
              "
            >
              <div v-if="user">{{ user.username }}</div>

              <div
                class="user-section"
                style="display: flex; align-items: center; gap: 8px"
              >
                <div class="icon" @click="toggleUserInfo">
                  <img
                    src="../pages/image/user.svg"
                    alt="User Icon"
                    class="icon-image"
                  />
                </div>

                <!-- Hiển thị username khi có user -->
                <span v-if="user" class="username">
                  {{ user.username }}
                </span>

                <!-- User dropdown -->
                <div v-if="showUserInfo && user" class="user-info-modal">
                  <p>{{ user.username }}Luu Dzung</p>
                  <p>{{ user.email }}</p>
                  <button @click="logout" class="logout-btn">Đăng xuất</button>
                </div>
              </div>
              <button class="nav-btn">
                <svg
                  class="icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  />
                </svg>
              </button>
              <button class="nav-btn">
                <svg
                  class="icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M20 12v10H4V12" />
                  <path d="M2 7h20v5H2z" />
                  <path d="M12 2v15" />
                  <path d="M12 2l5 5" />
                  <path d="M12 2l-5 5" />
                </svg>
              </button>
              <div>
                <NuxtLink to="/cart" class="icon cart-icon">
                  <img
                    src="../pages/image/cart.png"
                    alt="Cart Icon"
                    class="icon-image"
                  />
                  <span v-if="arrCartSession?.length" class="cart-count">{{
                    arrCartSession?.length
                  }}</span>
                </NuxtLink>
              </div>
            </div>
          </div>
          <!--          <CartPage-->
          <!--              v-if="showCart"-->
          <!--              :is-cart-open="showCart"-->
          <!--              :cart-items="cart"-->
          <!--              @update:cart-items="updateCart"-->
          <!--              @close="toggleCart"-->
          <!--          />-->

          <!-- Bottom Navigation -->
          <div class="bottom-nav">
            <a href="#" class="nav-link with-icon">
              <svg
                class="icon-sm"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M20 12v10H4V12" />
                <path d="M2 7h20v5H2z" />
                <path d="M12 2v15" />
                <path d="M12 2l5 5" />
                <path d="M12 2l-5 5" />
              </svg>
              Gifts
            </a>
            <a href="#" class="nav-link">Festive Finds at Every Price</a>
            <a href="#" class="nav-link">Home Favorites</a>
            <a href="#" class="nav-link">Fashion Finds</a>
            <a href="#" class="nav-link">Registry</a>
          </div>
        </div>
      </nav>
    </header>
    <slot></slot>
    <Footer></Footer>
  </div>
</template>
<script setup>
import Footer from "~/pages/components/Footer.vue";
import { onMounted, ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const searchQuery = ref("");
const user = ref(null);
const showUserInfo = ref(false);
const filteredProducts = ref([]);
const products = ref([]);
const categoriesRef = ref(null);
const showCategories = ref(false);
const selectedCategory = ref(null);
const categories = ref([]);

const categoriesBySlug = computed(() => {
  return [...categories.value].sort((a, b) => a.slug.localeCompare(b.slug));
});

const handleClickOutside = (event) => {
  if (categoriesRef.value && !categoriesRef.value.contains(event.target)) {
    showCategories.value = false;
  }
};

const toggleCategories = () => {
  console.log("Toggle clicked, current state:", showCategories.value);
  showCategories.value = !showCategories.value;
  console.log("New state:", showCategories.value);
};

const handleCategoryClick = async (categoryId) => {
  try {
    selectedCategory.value = categoryId;
    const response = await fetch(
      `http://152.42.240.131/api/v1/products/categories/${categoryId}`
    );
    const data = await response.json();
    products.value = data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
  }
};

const fetchCategories = async () => {
  try {
    const response = await fetch("http://152.42.240.131/api/v1/categories");
    const data = await response.json();
    categories.value = data.data;
    console.log("Fetched categories:", categories.value);
  } catch (error) {
    console.error("Error fetching categories:", error);
    console.log("Categories data:", data);
    console.log("Sorted categories:", categoriesBySlug.value);
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  fetchCategories();
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
const toggleUserInfo = () => {
  showUserInfo.value = !showUserInfo.value;
};

watch(
  () => user.value,
  (newValue) => {
    console.log("User value changed:", newValue);
  }
);

onMounted(() => {
  console.log("Checking localStorage on mount");
  const userData = localStorage.getItem("user");
  console.log("UserData from localStorage:", userData);
  if (userData) {
    user.value = JSON.parse(userData);
    console.log("Parsed user data:", user.value);
  }

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".user-info-modal") && !e.target.closest(".icon")) {
      showUserInfo.value = false;
    }
  });
});

const filterByName = () => {
  if (searchQuery.value.trim() === "") {
    filteredProducts.value = products.value;
  } else {
    filteredProducts.value = products.value.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
};

const arrCartSession = ref([]);
if (process.client) {
  arrCartSession.value = JSON.parse(sessionStorage.getItem("cart")) || [];
}

const logout = () => {
  try {
    localStorage.removeItem("user");
    sessionStorage.removeItem("cart");
    user.value = null;
    showUserInfo.value = false;
    document.cookie =
      "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    router.push("/login");
  } catch (error) {
    console.error("Logout error:", error);
  }
};

onUnmounted(() => {
  document.removeEventListener("click", closeUserInfo);
});
</script>

<style scoped>
.categories-section {
  position: relative;
}

.categories-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 300px;
  max-height: 500px;
  overflow-y: auto;
}

.categories-dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  padding: 10px 15px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

.category-item:last-child {
  border-bottom: none;
}

.category-item:hover {
  background-color: #f5f5f5;
}

.category-item.active {
  background-color: #e0e0e0;
}

.category-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.category-image {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
}

.category-info {
  display: flex;
  flex-direction: column;
}

.category-name {
  font-weight: 500;
  color: #333;
}

.category-slug {
  font-size: 0.8em;
  color: #666;
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

.categories-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.categories-btn:hover {
  background-color: #f5f5f5;
}
.username {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.user-info-modal {
  position: absolute;
  top: 100%;
  right: 20;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 200px;
  margin-top: 8px;
}
.user-section {
  position: relative;
}
.logout-btn {
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.icon {
  cursor: pointer;
}

.icon-image {
  width: 24px;
  height: 24px;
}
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
slot {
  flex: 1;
}

.footer {
  width: 100%;
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
  bottom: 0;
  left: 0;
}
.icon-image {
  width: 20px;
  height: 20px;
}

.navbar {
  width: 100%;
  border-bottom: 1px solid #e1e1e1;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
}

.navbar-container {
  width: 100%;
  margin: 0 auto;
  padding: 0px;
}

/* Top navigation */
.top-nav {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 20px 50px;
}

/* Categories button */
.categories-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 0.5rem;
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hamburger span {
  display: block;
  width: 20px;
  height: 2px;
  background-color: #222;
}

/* Search bar */
.search-container {
  flex: 1;
  max-width: 500px;
  margin: 0 1rem;
  position: relative;
}

.search-input {
  width: 80%;
  padding: 1rem 2rem;
  border: 1px solid #ccc;
  border-radius: 96px;
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
  border-color: #888;
}

.search-btn {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  background: #d4d4d4;
  border: none;
  padding: 0 1.25rem;
  border-radius: 0 96px 96px 0;
  cursor: pointer;
}

.search-btn:hover {
  background: #d4d4d4;
}

/* Right section */
.nav-right {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.nav-btn {
  background: none;
  border: none;
  padding: 0.5rem;
  color: #222;
  cursor: pointer;
  font-size: 0.9rem;
}

.nav-btn:hover {
  color: #000;
}

/* Bottom navigation */
.bottom-nav {
  height: 48px;
  display: flex;
  align-items: center;
  gap: 2.5rem;
  justify-content: center;
  margin-top: 10px;
}

.nav-link {
  text-decoration: none;
  color: #222;
  font-size: 0.9rem;
  font-weight: bold;
}

.nav-link:hover {
  color: #000;
}

.nav-link.with-icon {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Icons */
.icon {
  width: 24px;
  height: 24px;
}

.icon-sm {
  width: 16px;
  height: 16px;
}

.cart-count {
  position: absolute;
  top: 3px;
  right: 200px;
  background-color: #ff3b30;
  color: white;
  padding: 0.2rem 0.6rem;
  font-size: 12px;
  border-radius: 50%;
}
</style>
