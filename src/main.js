// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require("core-js")
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// import 'font-awesome/css/font-awesome.css'
import VueBus from 'vue-bus';
import plusready from "@/plugin/plusready.js"
Vue.config.productionTip = false
Vue.use(MintUI)
Vue.use(plusready)
Vue.use(VueBus);

window.pagetab = "startorder"
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})


