export const routes = [
    {
        name: 'Product__Index',
        path: '/product',
        file: '~/pages/components/Products.vue'
    },
   
    {
        name: 'Header_Index',
        path: '/header',
        file: '~/pages/components/Header.vue'
    },

    {
        name: 'Auth__Login',
        path: '/login',
        file: '~/custom-pages/auth/Login.vue'
    },


    {
        name: 'Auth__Signup',
        path: '/signup',
        file: '~/pages/signup.vue'
    },
    {
        name: 'Cart',
        path: '/cart',
        file: '~/pages/components/CartPage.vue'
    },

    {
        path: '/products/:categoryId?',
        name: 'Products',
        component: '~/pages/components/Products.vue',
    },
    {
        name: 'Orders',
        path: '/orders',
        file: '~/pages/orders.vue'
    },

];