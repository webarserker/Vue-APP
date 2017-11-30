import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import 'common/stylus/index.styl'

fastclick.attach(document.body)

/* eslint-disable no-unused-vars */
import vConsole from 'vconsole'
console.log('test')

/* eslint-disable no-new */
Vue.use(VueLazyLoad, {
	loading: require('common/images/default.png'),
	preLoad: 1.3,
	attempt: 1
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
