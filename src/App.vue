<template>
  <div id="app">

    <!--<Logindefault v-if="isShow" :showstart="showstart"></Logindefault>-->

    <!--<keep-alive >-->
    <!--<router-view  v-show="!isShow"></router-view>-->
    <heads ></heads>
    <!--</keep-alive>-->
  </div>
</template>
<script>
  import Vue from 'vue'
  import $ from "jquery"
  import heads from "@/components/HeaderAndBottom"
  import Logindefault from "@/components/Logindefault";

  export default {
    name: 'app',
    data(){
      return {
        isShow: false,
        ver: '1.0.0'
      }
    },

    components: {
      Logindefault,
      heads
    },
    created(){
      $("title").text('访客预约管理系统 Ver.' + this.ver)
//        alert("判断是否是首次登陆的标志")
      if (localStorage.getItem("LoginIsInit") == null) {
        this.isShow = true;
      };

      let sgmPatac=localStorage.getItem("isSgmOrPatac")?localStorage.getItem("isSgmOrPatac"):"SGM";
//      设置默认选中
      localStorage.setItem("isSgmOrPatac", sgmPatac)
      var frequentlyUsedHistory=localStorage.getItem("frequentlyUsedHistory")||"[]";
      console.log(frequentlyUsedHistory)
      localStorage.setItem("frequentlyUsedHistory", frequentlyUsedHistory)

        Vue.PlusReady(function () {
//        var uid = NativeObj.getUserName();
//        Vue.GetLogin(uid);
//        console.log("token"+uid)
        Vue.GetLogin("apptest01");
//          Vue.GetLogin("apptest02");
        })

    },


    methods: {
      showstart(d){
        console.log(d)
        this.isShow = false;
        localStorage.setItem("LoginIsInit", "true")
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
