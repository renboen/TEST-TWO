<template>
  <div id="app">

    <Logindefault v-if="isShow" :showstart="showstart" ></Logindefault>

    <!--<keep-alive >-->
    <router-view v-if="!isShow" ></router-view>
    <!--</keep-alive>-->
  </div>
</template>
  <script>
    import Vue from 'vue'
    import Logindefault from "@/components/Logindefault"
    export default {
      name: 'app',
      data(){
        return{
          isShow:false,
        }
      },
      components:{
        Logindefault
      },
      created(){
//        alert("判断是否是首次登陆的标志")
          if(localStorage.getItem("LoginIsInit")==null){
//            alert("首次登陆")
            this.isShow=true;
          }
      },
      methods:{
        showstart(d){
          console.log(d)
          this.isShow=false;
          localStorage.setItem("LoginIsInit","true")
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
