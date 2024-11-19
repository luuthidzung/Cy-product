<template>
  <div>
    <header class="navbar">
      <nav class="navbar-container">
        <div class="top-nav">
          <!-- Logo -->
          <div class="logo">
            <img src="./image/logo.svg" alt="Logo" class="logo-img" />
          </div>

          <!-- Categories Dropdown -->
          <div class="categories-btn">
            <div class="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </div>
            Categories
            <div class="categories-list">
              <button
                v-for="category in categories"
                :key="category.id"
                @click="$emit('selectCategory', category.slug)"
                :class="[
                  'category-button',
                  selectedCategory === category.slug && 'active',
                ]"
              >
                {{ category.name }}
              </button>
            </div>
          </div>

          <!-- Search Bar -->
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

          <!-- Navigation Links -->
          <div class="nav-links">
            <NuxtLink to="/" class="nav-shopping">Shopping</NuxtLink>
          </div>

          <!-- User and Cart Section -->
          <div class="nav-right">
            <div class="user" @click="toggleUserMenu">
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

            <!-- Cart Icon -->
            <NuxtLink to="/cart" class="icon cart-icon" @click="goToCart">
              <svg
                class="icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path
                  d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
                />
              </svg>
              <span class="cart-count" v-if="cart.length > 0">{{
                cart.length
              }}</span>
            </NuxtLink>
          </div>
        </div>

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
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  props: {
    categories: Array,
    username: String,
    cart: Array,
  },
  methods: {
    toggleUserMenu() {},
    goToCart() {},
  },
};
</script>

<style scoped>
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
  top: -5px;
  right: -5px;
  background-color: #ff3b30;
  color: white;
  padding: 0.2rem 0.6rem;
  font-size: 12px;
  border-radius: 50%;
}
</style>
