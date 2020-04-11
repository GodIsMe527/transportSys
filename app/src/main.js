import Vue from 'vue'
import App from './App.vue'
import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui'
import router from './router'
import util from './utils/utils'
Vue.use(MintUI)
Vue.prototype.$http=util.http
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
