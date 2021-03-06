import Vue from 'vue'
import VueRouter from 'vue-router'
import main from '../components/mainPart.vue'
import dataReport from '../components/dataReport.vue'
import chartData from '../components/chartData.vue'
import newUser from '../components/newUser.vue'
import userList from '../components/userList.vue'
import login from '../components/login.vue'
import startPoint from '../components/startPoint.vue'
import vehicle from '../components/vehicle.vue'
import cargo from '../components/cargo.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'main',
        component: main,
        children:[
            {
                path: '/dataReport',
                name: 'dataReport',
                component: dataReport
            },
            {
                path: '/chartData',
                name: 'chartData',
                component: chartData
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
            {
                path: '/startPoint',
                name: 'startPoint',
                component: startPoint
            },
            {
                path: '/vehicle',
                name: 'vehicle',
                component: vehicle
            },
            {
                path: '/cargo',
                name: 'cargo',
                component: cargo
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        // component: () => import('@/components/login').then(m => m.default)
        component:login
    },
]

const router = new VueRouter({
    routes
})

export default router
