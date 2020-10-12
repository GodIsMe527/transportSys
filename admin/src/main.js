import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import http from "./utils/utils"
import md5 from 'js-md5';

Vue.config.productionTip = false;
Vue.prototype.$http = http;
Vue.prototype.$md5 = md5;
router.beforeEach((to, from, next) => {
    if (to.path === '/login' || localStorage.getItem("token")) {
        next();
    } else {
        alert('您还没有登录，请先登录');
        next('/login');
    }
});
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
