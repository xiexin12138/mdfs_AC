/**
 * @description 这是入口文件
 */
import Vue from 'vue'

import App from './App'

import router from './router'
import store from './store'

import ElementUI from 'element-ui'
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	router,
	store,
  components: { App },
  template: '<App/>'
}).$mount('#app')
