import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import driver from '../components/driver.vue'
import admin from '../components/admin.vue'

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'login',
        component: login,
    },
    {
        path: '/login',
        name: 'login',
        component: login,
    },
    {
        path: '/driver',
        name: 'driver',
        component: driver,
    },
    {
        path: '/admin',
        name: 'admin',
        component: admin,
    },
]

const router = new VueRouter({
    routes
})

export default router
