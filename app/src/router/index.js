import Vue from 'vue'
import VueRouter from 'vue-router'
import driver from '../components/driver.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'driver',
        component: driver,
    },
]

const router = new VueRouter({
    routes
})

export default router
