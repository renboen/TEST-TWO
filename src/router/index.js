import Vue from 'vue'
import Router from 'vue-router'
import Order from "@/components/Order"
import Check from "@/components/Check"
import AboutMe from "@/components/AboutMe"
import HeaderAndBottom from '@/components/HeaderAndBottom'

Vue.use(Router)

export default new Router({
  mode:"hash",
  routes: [
    {
      path: "/",
      redirect: "/order"
    },
    {
      path: "/order",
      component: Order,
    }, {
      path: "/check",
      component: Check
    }, {
      path: "/aboutme",
      component: AboutMe
    }
  ]

})
