// stores/cart.js
// import { defineStore } from "pinia";
// import { ref } from "vue";

// export const useCartStore = defineStore(
//   "cart",
//   //   {
//   //   state: () => ({
//   //     cart: []
//   //   }),
//   //   actions: {
//   //     addToCart(product) {
//   //       const existingProduct = this.cart.find(item => item.id === product.id)
//   //       if (existingProduct) {
//   //         existingProduct.quantity += 1  // Nếu sản phẩm đã có trong giỏ, tăng số lượng
//   //       } else {
//   //         this.cart.push({ ...product, quantity: 1 })  // Thêm sản phẩm mới vào giỏ
//   //       }
//   //     }
//   //   },
//   //   getters: {
//   //     cartCount: (state) => state.cart.reduce((total, item) => total + item.quantity, 0)
//   //   }
//   // }
//   () => {
//     const cart = ref([]);

//     return { cart };
//   }
// );
