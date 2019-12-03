import Vue from 'vue'
import App from './App'
import rewrite from '@/common/rewriteUniFun.js'
import * as filters from '@/common/filter.js'
import Img from '@/components/img-view/img-view.vue';

Vue.config.productionTip = false

Vue.prototype.$Rewrite = rewrite

Vue.component('Img',Img)

Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
