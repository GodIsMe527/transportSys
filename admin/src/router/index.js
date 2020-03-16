import Vue from 'vue'
import VueRouter from 'vue-router'
import main from '../components/main.vue'
import monthData from '../components/monthData.vue'
import yearData from '../components/yearData.vue'
import newUser from '../components/newUser.vue'
import userList from '../components/userList.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'main',
        component: main,
        children:[
            {
                path: '/monthData',
                name: 'monthData',
                component: monthData
            },
            {
                path: '/yearData',
                name: 'yearData',
                component: yearData
            },
            {
                path: '/newUser',
                name: 'newUser',
                component: newUser
            },
            {
                path: '/userList',
                name: 'userList',
                component: userList
            },
        ]
    },
]

const router = new VueRouter({
    routes
})

export default router
