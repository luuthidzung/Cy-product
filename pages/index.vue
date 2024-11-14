<template>
  <div class="container">
    <div>
      <header class="navbar">
        <nav class="navbar">
          <div class="navbar-container">
            <div class="top-nav">
              <div class="logo">
                <img src="./image/logo.svg" alt="Logo" class="logo-img" />
              </div>
              <div style="display: flex; align-items: center; gap: 10px">
                <div class="categories-btn">
                  <div class="hamburger" @click="toggleCategoryMenu">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  Categories
                  <div class="categories-list" v-show="showCategoryMenu">
                    <button
                      v-for="category in categories"
                      :key="category.id"
                      class="category-button"
                      :class="{ active: selectedCategory === category.slug }"
                      @click="onCategoryClick(category.slug)"
                    >
                      {{ category.name }}
                    </button>
                  </div>
                </div>
                <nav class="nav-links">
                  <a href="#" class="nav-shopping"
                    ><NuxtLink
                      :to="{
                        name: 'Product__Index',
                      }"
                    >
                      Shopping
                    </NuxtLink></a
                  >
                </nav>
              </div>
              <div class="search-container">
                <input
                  type="text"
                  class="search-input"
                  placeholder="Search for anything"
                />
                <button class="search-btn">
                  <svg
                    class="icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    stroke-width="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </button>
              </div>

              <div class="nav-right">
                <div
                  class="user"
                  style="display: flex; align-items: center"
                  @click="toggleUserMenu"
                >
                  <NuxtLink :to="{ name: 'Auth__Login' }">
                    <div class="icon">
                      <img
                        src="./image/user.svg"
                        alt="User Icon"
                        class="icon-image"
                      />
                    </div>
                  </NuxtLink>
                  <span v-if="username" class="username">{{ username }}</span>
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

                <NuxtLink to="/cart" class="icon cart-icon" @click="toggleCart">
                  <img
                    src="./image/cart.png"
                    alt="Cart Icon"
                    :disabled="!isLoggedIn"
                    class="icon-image"
                  />
                  <span class="cart-count" v-if="cart.length > 0">{{
                    cart.length
                  }}</span>
                </NuxtLink>
              </div>
            </div>
            <CartPage
              v-if="showCart"
              :is-cart-open="showCart"
              :cart-items="cart"
              @update:cart-items="updateCart"
              @close="toggleCart"
            />

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

      <!-- <div class="greeting">
        <h1 class="section-title">Welcome to LuuzD</h1>
        <p class="content">
          Are you looking for classic handbags to pair with your office attire,
          elegant crossbody bags that can accompany you from morning to night,
          chic clutches that add charm to a date night, or practical backpacks
          as your new companion? Browse through our bag designs to find the
          stylish companion you'll carry with you time and time again.
        </p>
      </div>

      <div class="picture">
        <img
          src="https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dwd9810a04/images/hi-res/2024-L2-CK2-20782328-K5-2.jpg?sw=756&sh=1008"
          alt="//"
        />
        <img
          src="https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dwb7545037/images/hi-res/2024-L2-CK2-50782311-09-2.jpg?sw=756&sh=1008"
          alt="//"
        />
        <img
          src="https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dw5846d5fd/images/hi-res/2024-L2-CK2-41220016-1-J8-2.jpg?sw=756&sh=1008"
          alt="//"
        />
      </div>
    </div>

    <div class="image-slider"> -->
      <!-- <img
        src="https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dw4f15eb25/images/hi-res/2024-L7-CK2-30271420-01-1.jpg?sw=756&sh=1008"
        alt="Image 1"
      />
      <img
        src="https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dw4f15eb25/images/hi-res/2024-L7-CK2-30271420-01-1.jpg?sw=504&sh=672"
        alt="Image 2"
      />
      <img
        src="https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dwb461bf8c/images/hi-res/2021-L6-CK2-81200014-1-09-1.jpg?sw=756&sh=1008"
        alt="Image 3"
      />
      <img
        src="https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dw8587f7b3/images/hi-res/2023-L7-CK2-80160156-29-1.jpg?sw=1152&sh=1536"
        alt="Image 4"
      />
      <img
        src="https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dw4f15eb25/images/hi-res/2024-L7-CK2-30271420-01-1.jpg?sw=756&sh=1008"
        alt="Image 1"
      />
      <img
        src="https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dw4f15eb25/images/hi-res/2024-L7-CK2-30271420-01-1.jpg?sw=504&sh=672"
        alt="Image 2"
      />
      <img
        src="https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dw4f15eb25/images/hi-res/2024-L7-CK2-30271420-01-1.jpg?sw=756&sh=1008"
        alt="Image 1"
      />
      <img
        src="https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dw4f15eb25/images/hi-res/2024-L7-CK2-30271420-01-1.jpg?sw=504&sh=672"
        alt="Image 2"
      />
      <img
        src="https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dwb461bf8c/images/hi-res/2021-L6-CK2-81200014-1-09-1.jpg?sw=756&sh=1008"
        alt="Image 3"
      />
      <img
        src="https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dw8587f7b3/images/hi-res/2023-L7-CK2-80160156-29-1.jpg?sw=1152&sh=1536"
        alt="Image 4"
      />
      <img
        src="https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dw4f15eb25/images/hi-res/2024-L7-CK2-30271420-01-1.jpg?sw=756&sh=1008"
        alt="Image 1"
      />
      <img
        src="https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dw4f15eb25/images/hi-res/2024-L7-CK2-30271420-01-1.jpg?sw=504&sh=672"
        alt="Image 2"
      />
      <img
        src="https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dwb461bf8c/images/hi-res/2021-L6-CK2-81200014-1-09-1.jpg?sw=756&sh=1008"
        alt="Image 3"
      />
      <img
        src="https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dw8587f7b3/images/hi-res/2023-L7-CK2-80160156-29-1.jpg?sw=1152&sh=1536"
        alt="Image 4"
      /> -->
    </div>
    <h1 style="text-align: center; font-family: monospace">Sản phẩm nổi bật</h1>
    <Products />
  </div>

  <footer class="footer">
    <div class="footer-content">
      <p>&copy; 2024 Your Company. All Rights Reserved.</p>
      <div class="footer-links">
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-of-service">Terms of Service</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAsyncData } from "#app";
import Products from "./components/Products.vue";
import CartPage from "./components/CartPage.vue";
import { log } from "console";
const API_URL = "http://152.42.240.131/api/v1";
const ITEMS_PER_PAGE = 10;
const showCategoryMenu = ref(false);
const username = ref(null);
const products = ref([]);
const currentPage = ref(1);
const cart = ref([]);
const categories = ref([]);
const selectedCategory = ref(null);
const token = useCookie("auth_token").value;

const { data: list, error: fetchError } = await useAsyncData("callData", () => {
  return $fetch("http://152.42.240.131/api/v1/products", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
});

onMounted(() => {
  console.log(products.value);
  fetchCategories();
});

const showCart = ref(false);

const toggleCart = () => {
  showCart.value = !showCart.value;
};

const updateCart = (newItems) => {
  cart.value = newItems;
};

const loadUsername = () => {
  const storedUsername = getFromCookie("username");
  if (storedUsername) {
    username.value = storedUsername;
  }
};
const cartCount = computed(() => cart.value.length);

const addToCart = (product) => {
  if (!product || !product.id) {
    console.error("Invalid product");
    return;
  }
  const updateCartItems = (updatedCart) => {
    cartItems.value = updatedCart;
  };

  if (product.stock <= 0) {
    alert("Sorry, this product is out of stock.");
    return;
  }

  const existingProduct = cart.value.find((p) => p.id === product.id);
  if (existingProduct) {
    alert("This product is already in your cart.");
    return;
  }

  try {
    cart.value.push({
      ...product,
      quantity: 1,
    });
    alert(`${product.name} added to the cart!`);
  } catch (err) {
    console.error("Error adding to cart:", err);
    alert("Failed to add product to cart");
  }
};

const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/categories`);
    const data = await response.json();
    categories.value = data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

const filterProductsByCategory = async (slug) => {
  try {
    const response = await fetch(`${API_URL}/products?category_slug=${slug}`);
    const data = await response.json();
    products.value = data.data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
  }
};
const toggleCategoryMenu = () => {
  showCategoryMenu.value = !showCategoryMenu.value;
};

const onCategoryClick = (slug) => {
  selectedCategory.value = slug;
  filterProductsByCategory(slug);
  showCategoryMenu.value = false;
};

const fetchProductsByCategory = async (slug) => {
  const { data, error } = await useAsyncData(`products-${slug}`, () =>
    $fetch(`${API_URL}/products?category_slug=${slug}`)
  );

  if (error.value) {
    console.error("Error fetching products by category:", error.value);
  } else {
    products.value = data.value.data;
  }
};
</script>

<style scoped>
.categories-btn {
  position: relative;
  display: inline-block;
}

.categories-list {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.categories-list button {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.categories-list button:hover {
  background-color: #ddd;
}

.categories-btn:hover .categories-list {
  display: block;
}
.navbar {
  width: 100%;
  border-bottom: 1px solid #e1e1e1;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
}

.navbar-container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Top navigation */
.top-nav {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
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
  gap: 1rem;
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
  margin-top: 2%;
}
.nav-shopping {
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  margin-left: -30px;
}
.nav-link {
  color: #222;
  text-decoration: none;
  font-size: 0.9rem;
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
.container {
  width: 1200px;
  background-color: white;
  padding: 20px;
}

.h2 {
  font-weight: bold;
}
.logo-img {
  width: 50px;
}
.logo h1 {
  margin: 0;
}
.nav-links {
  display: flex;
  margin-left: 40px;
  gap: 20px;
}

.nav-link {
  /* font-family: monospace; */
  text-decoration: none;
  color: #333;
  font-size: 16px;
  font-weight: bold;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #f0f0f0;
}

.user-icons {
  display: flex;
  gap: 50px;
}
.icon {
  cursor: pointer;
  width: 30px;
  height: 30px;
  position: relative;
}
.icon-image {
  width: 30px;
  height: 30px;
}
.greeting {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  margin-top: 50px;
}
.section-title {
  font-family: fangsong;
  font-size: 5em;
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
  animation: fadeUp 1s ease;
}

.content {
  max-width: 50%;
  text-align: center;
  margin-top: 15px;
  color: #555;
  animation: fadeUp 1s ease 0.3s;
}
.cart-count {
  position: absolute;
  top: -10px;
  right: -5px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 4px 8px;
  font-size: 10px;
}
/* Fade-up animation */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.picture {
  display: flex;
  gap: 30px;
  max-width: 1500px;
  padding: 20px 80px;
  animation: slideInFromLeft 1s ease-out;
}

@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.picture img {
  max-width: 330px;
}

.username {
  font-family: monospace;
  margin-left: 0px;
  font-size: 18px;
  color: #333;
}
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 0px;
  margin-top: 5%;
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

.image-slider {
  display: flex;
  overflow: hidden;
  margin: 30px;
}

.image-slider img {
  width: 15%;
  object-fit: cover;
  animation: slide 5s linear infinite;
}

@keyframes slide {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
.footer {
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
  width: 1500px;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-links {
  margin-top: 10px;
}

.footer-links a {
  color: white;
  text-decoration: none;
  margin: 0 15px;
}

.footer-links a:hover {
  text-decoration: underline;
}
</style>
