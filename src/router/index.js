import Vue from 'vue'
import Router from 'vue-router'
import HeaderAndBottom from '@/components/HeaderAndBottom'
import Order from "@/components/Order"
import Check from "@/components/Check"
import AboutMe from "@/components/AboutMe"
Vue.use(Router)

export default new Router({

  routes: [
    {
      path: "/",
      redirect: "/order"
    },
    {
      path: '/',
      name: 'HeaderAndBottom',
      component: HeaderAndBottom,
      children: [{
        path: "/order",
        component: Order,
        // children: [
        //   {
        //     path: "/",
        //     redirect: "startorder"
        //   },
        //   {
        //     path: "startorder",
        //     component: StartOrder
        //   },
        //   {
        //     path: "waitcheck",
        //     component: WaitCheck
        //   }]
      }, {
        path: "/Check",
        component: Check
      }, {
        path: "/aboutme",
        component: AboutMe
      }]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }

})
