import Vue from 'vue'
import '../public/assets/css/base/base.less'
import router from "./router";
import store from './store'
import App from './App.vue'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})