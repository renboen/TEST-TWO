<template>
  <div id="loginDefault">
    <h4>
      请选择常用的预约平台<br><br>
      也可以在应用内右上方随时切换
    </h4>
    <div class="selectBg">
      <h2 class="sgm sgm-png" @click="change('SGM')" :class="{ sgmActive: whoseChecked=='SGM' }">SGM</h2>
      <h2 class="patac patac-png" @click="change('PATAC')" :class="{ patacActive: whoseChecked=='PATAC' }">PATAC</h2>
    </div>
    <mt-button type="primary" class="btn" @click="btnClick">确定</mt-button>

  </div>
</template>
<script>
  import Vue from 'vue'

  import $ from "jquery"
  export default{
    data(){
      return {
        msg: "登陆默认模块",
        isActive: true,
        whoseChecked: "SGM",
      }
    },
    mounted(){
//      alert("登陆默认模块")
      Vue.PlusReady(function () {
//        var uid = NativeObj.getUserName()
//        Vue.GetLogin(uid);
         Vue.GetLogin("apptest01");
//         Vue.GetLogin("apptest02");
      })
      //默认为已审核
      localStorage.setItem("hased", "HasChecked");
      localStorage.setItem("addressBook", "AddressList");


      let WHeight = $(window).height();
      let SHeight = $("#loginDefault>div").height();
      let top = (WHeight - SHeight) / 2
      $("#loginDefault").height(WHeight);
    },
    props: ["showstart"],
    methods: {
      change(data){
        this.isActive = !this.isActive;
        // alert(data)
        this.whoseChecked = data;
      },
      btnClick(){

        this.showstart(this.whoseChecked);
        //   实现默认。退出前是sgm则下次登录默认sgm
        localStorage.setItem("isSgmOrPatac", this.whoseChecked)
        // alert(localStorage.getItem("isSgmOrPatac"))
//常用记录缓存

        localStorage.setItem("frequentlyUsedHistory", "[]")


      }
    }
  }
</script>
<style scoped>
  #loginDefault {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: white
  }

  .selectBg {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center
  }

  h4 {
    color: #343434;
    margin-top: -70px;
    margin-bottom: 40px
  }

  h2 {
    width: calc(100% - 20px);
    padding: 15px 0;
    border: 2px solid white;
    color: white;
    box-sizing: border-box;

  }

  .sgm {
    background-size: 100%;

  }

  .patac {
    background-size: 100%;
    margin: 20px 0;
  }

  .btn {
    width: calc(100% - 20px);
    padding: 0;
  }

  .patacActive {
    color: red;
    border-color: red
  }

  .sgmActive {
    color: blue;
    border-color: blue
  }
</style>
