<!--<script src="../../../任博恩/访客预约项目/访客预约/js/ajax.js"></script>-->
<template>
  <div id="headBot">
    <!--<div style="position: fixed;width: 100%">-->
    <mt-header fixed title="访客预约管理系统" style="height:50px;z-index:990"></mt-header>
    <div class="orderSelect" v-show='selected=="order"' @click="showpoup">{{isSgmOrPatac}} <span
      class=" fa fa-angle-down"></span></div>
    <div class="aboutmeSelect" v-show='selected=="check"' @click="PoupCheckShow"><span v-show="IsshowPoupCheck">{{IscheckingOrChecked}}</span>
      <span v-show="IsshowPoupCheck" class=" fa fa-angle-down"></span></div>

    <div class="addressSelect" v-show='selected=="aboutme"' @click="IsshowLongguest"><span>{{IsaddressbookOrLongguest}}</span>
      <span  class=" fa fa-angle-down"></span></div>
    <!--</div>-->
    <div style="height:50px" class="nouse"></div>
    <router-view>
    </router-view>


    <div style="height:55px; background:#EDEDED"></div>
    <mt-tabbar v-model="selected" fixed style="z-index:990">
      <mt-tab-item id="order">
        <i class="fa fa-calendar fa-lg  fa-2x"></i><br><br> 预约
      </mt-tab-item>
      <mt-tab-item id="check">
        <i class="fa fa-book fa-lg  fa-2x"></i><br><br> 历史
      </mt-tab-item>
      <mt-tab-item id="aboutme">
        <i class="fa fa-user fa-lg  fa-2x"></i><br><br> 我的
      </mt-tab-item>
    </mt-tabbar>

    <mt-popup class="gg" v-model="showPoup" popup-transition="popup-fade">
      <div class="poup">
        <div class="poupHead">
          <h4>请选择你需要的平台</h4>
          <span class="fa fa-remove" @click="hidePoup"></span>
        </div>
        <div class="poupContent">
          <mt-button type="primary" @click='sgmOrPatac("SGM")' :class='this.isSgmOrPatac=="SGM"? "btnhaschecked":""'>
            SGM
          </mt-button>
          <mt-button type="primary" @click='sgmOrPatac("PATAC")'
                     :class='this.isSgmOrPatac=="PATAC"? "btnhaschecked":""'>PATAC
          </mt-button>
        </div>
      </div>
    </mt-popup>


    <mt-popup v-model="showPoupCheck" popup-transition="popup-fade">
      <div class="poup">
        <div class="poupHead">
          <h4>请选择分类</h4>
          <span class="fa fa-remove" @click="hidePoupCheck"></span>
        </div>
        <div class="poupContent">
          <mt-button type="primary" @click='checkOrchecked("历史","HasChecked")'
                     :class='this.IscheckingOrChecked=="历史"? "btnhaschecked":""'>历史
          </mt-button>
          <mt-button type="primary" @click='checkOrchecked("待审核","WaitCheck")'
                     :class='this.IscheckingOrChecked=="待审核"? "btnhaschecked":""'>待审核
          </mt-button>
        </div>
      </div>
    </mt-popup>

    <mt-popup v-model="showLongguest" popup-transition="popup-fade">
      <div class="poup">
        <div class="poupHead">
          <h4>请选择分类</h4>
          <span class="fa fa-remove" @click="hideLongguest"></span>
        </div>
        <div class="poupContent">
          <mt-button type="primary" @click='longguestOrAddress("通讯录","AddressList")'
                     :class='this.IsaddressbookOrLongguest=="通讯录"? "btnhaschecked":""'>通讯录
          </mt-button>
          <mt-button type="primary" @click='longguestOrAddress("长期供应商","Longguest")'
                     :class='this.IsaddressbookOrLongguest=="长期供应商"? "btnhaschecked":""'>长期供应商
          </mt-button>
        </div>
      </div>
    </mt-popup>

  </div>
</template>
<script>
  import Order from "@/components/Order"
  import Check from "@/components/Check"
  import AboutMe from "@/components/AboutMe"
  import Vue from 'vue'
  import $ from "jquery"
  export default {
    name: 'HeaderAndBottom',
    data () {
      return {
        selected: "order",
        isSgmOrPatac: localStorage.getItem("isSgmOrPatac"),
        SgmOrPatacFlag: "",
        showPoup: false,
        showPoupCheck: false,
        showLongguest:false,
        IscheckingOrChecked: "历史",
        IsshowPoupCheck: false,
        IsaddressbookOrLongguest:"",

      }
    },
    created: function () {
//      alert(2)
      Vue.PlusReady(function () {
//        var uid = NativeObj.getUserName();
//        Vue.GetLogin(uid);
//        Vue.GetLogin("apptest01");
        Vue.GetLogin("apptest02") ;
      })


      if (localStorage.getItem("isSgmOrPatac") == "PATAC") {
        this.IsshowPoupCheck = true
      } else {
        this.IsshowPoupCheck = false
      }
      if( localStorage.getItem("addressBook")=="AddressList"){
        this.IsaddressbookOrLongguest="通讯录"
      }else{
        this.IsaddressbookOrLongguest="长期供应商"
      }
      //不考虑频繁切换账号
      //   Vue.PlusReady(function(){
      //       // var uid = NativeObj.getUserName()
      //       // var uid = NativeObj.getUserName()
      //       // alert(uid)
      //       // Vue.GetLogin(uid);
      //       Vue.GetLogin("apptest01");
      //  })
      $(".poup").width($(window).width() * 0.75);
      $(".poup").height($(window).height() * 0.3);
    },
    watch: {
      isSgmOrPatac: function (e) {
        let that = this;
        // 监听变化从而改变sgm和pa的不同
        if (e == "PATAC") {
          that.IsshowPoupCheck = true
        } else {
          that.IsshowPoupCheck = false
        }
        console.log("监听变化从而改变sgm和pa的不同")
      },
      selected: function (data) {
        this.$router.push('/' + data)
      },
      showPoup(e){
          //SGM和PATAC的poup是否显示
          if(e){
            $("body").css({overflow: "hidden"})
          }else{
            $("body").css({overflow: "auto"})
          }
      },
      showPoupCheck(e){
        //已审核和历史
        if(e){
          $("body").css({overflow: "hidden"})
        }else{
          $("body").css({overflow: "auto"})
        }
      },
      showLongguest(e){
        //长期和通讯录
        if(e){
          $("body").css({overflow: "hidden"})
        }else{
          $("body").css({overflow: "auto"})
        }
      },

    },
    components: {
      Order,
      Check,
      AboutMe
    },
    methods: {
      showpoup(){
        this.showPoup = true;
      },
      hidePoup(){
        this.showPoup = false;
      },
      sgmOrPatac(arg){
        localStorage.setItem("isSgmOrPatac", arg);
        this.isSgmOrPatac = localStorage.getItem("isSgmOrPatac");
        console.log("yyyyy" + localStorage.getItem("isSgmOrPatac"))
        this.$bus.$emit('sgmorpathcchange', arg); //Hub触发事件
        this.showPoup = false;
      },
      checkOrchecked(arg1, arg2){
        this.$bus.$emit('hubchange', arg1, arg2); //Hub触发事件
        this.IscheckingOrChecked = arg1;
        this.showPoupCheck = false;
      },
      PoupCheckShow(){
        this.showPoupCheck = true;
      },
      hidePoupCheck(){
        this.showPoupCheck = false;
      },
      IsshowLongguest(){
        this.showLongguest=true;
      },
      hideLongguest(){
        this.showLongguest=false;
      },
      longguestOrAddress(arg1,arg2){
      //向组件About发送消息
        this.IsaddressbookOrLongguest=arg1;
        this.$bus.$emit('longguestAndAddress', arg1, arg2); //Hub触发事件
        $("body").css({overflow: "auto"})
        this.showLongguest=false;
      }
    }
  }
</script>
<style scoped>
  #headBot {
    background: white
  }
  .orderSelect, .aboutmeSelect,.addressSelect {
    font-size: 12px;
    height: 50px;
    line-height: 50px;
    padding-right: 10px;
    color: white;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 991;
  }

  header {
    background: #0434B2;
    font-size: 16px
  }

  .poup > .poupHead {
    height: 20%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #0434b2;
    color: white;
    box-sizing: border-box;
    border: 8px solid transparent
  }

  .poup > .poupContent {
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .poup > .poupContent > button {
    background: transparent;
    color: #0434B2;
    border: 1px solid #0434B2
  }

  .poup > .poupContent > button:nth-child(1) {
    width: 35%;
    margin-right: 5%;

  }

  .poup > .poupContent > button:nth-child(2) {
    width: 35%;
    margin-left: 5%
  }

  .btnhaschecked {
    background: #0434B2 !important;
    color: white !important;
  }

</style>
