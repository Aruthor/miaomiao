// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './stores'

import axios from 'axios'
Vue.prototype.$ajax = axios; //设置到vue的属性里

import Scroller from '@/components/Scroller'
import Loading from '@/components/Loading'

Vue.component('Scroller',Scroller)
Vue.component('Loading',Loading)

//过滤器
Vue.filter('setWH',(url , arg) => {
  return url.replace( /w\.h/ , arg)
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
