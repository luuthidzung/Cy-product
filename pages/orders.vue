<template>
  <div class="container">
    <h2>My Orders</h2>
    <div class="orders-list">
      <div v-for="order in orders" :key="order.id" class="order-item">
        <h3>Order #{{ order.id }}</h3>
        <p>Date: {{ new Date(order.createdAt).toLocaleDateString() }}</p>
        <p>Total: ${{ order.total }}</p>
        <div class="order-items">
          <div v-for="item in order.items" :key="item.id">
            {{ item.name }} - Quantity: {{ item.quantity }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

const { data: orders } = await useFetch("http://152.42.240.131/api/v1/order");
</script>
