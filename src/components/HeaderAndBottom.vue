<template>
  <div id="headBot">
    <div class="hheader">
      <!--<mt-header fixed title="访客预约管理系统" ></mt-header>-->
      <header>访客预约管理系统</header>
      <!--<i class="fa fa-angle-left " aria-hidden="true"></i>-->
      <span class="fa fa-angle-left fa-2x " @click.stop="close"></span>
      <div class="orderSelect" v-show='isSgmOrPatacShow' @click="showpoup">{{isSgmOrPatac}} <span
        class=" fa fa-angle-down"></span></div>


      <!--<div class="aboutmeSelect" v-show='selected=="check"' @click="PoupCheckShow"><span v-show="IsshowPoupCheck">{{IscheckingOrChecked}} <span-->
        <!--v-show='IscheckingOrChecked=="待审核"'>({{checkingNum}})</span></span>-->
        <!--<span v-show="IsshowPoupCheck" class=" fa fa-angle-down"></span></div>-->

      <!--<div class="addressSelect" v-show='selected=="aboutme"' @click="IsshowLongguest"><span v-show="IsshowPoupCheck">{{IsaddressbookOrLongguest}}</span>-->
        <!--<span v-show="IsshowPoupCheck" class=" fa fa-angle-down"></span></div>-->
    </div>
    <div style="height:50px;background:#EDEDED" class="nouse"></div>
    <div id="view">
    <router-view>
    </router-view>
    </div>
    <div class="forbottom" style="height:55px; background:#EDEDED"></div>
    <mt-tabbar v-model="selected" fixed style="z-index:990;height: 55px">
      <div id="order" @click='chang("order")' class="tabActive" style="flex: 1">
        <span class="fa fa-calendar tabFa"
             ></span><span style="font-size: .9em">预约</span>
      </div>
      <div id="check" style="flex: 1"  @click='chang("check")' v-show='isSgmOrPatac=="PATAC"?true:false'>
        <span class="fa fa-book tabFa"
             ></span><span style="font-size: .9em">审核</span>
      </div>
      <div id="aboutme" style="flex: 1"  @click='chang("aboutme")' class="tabLast"  >
        <div  @click="toggleShowAboutTab">
        <span class="fa fa-user tabFa "
              ></span><span style="font-size: .9em">我的</span>
        </div>
      </div>
    </mt-tabbar>

    <mt-popup class="gg" v-model="showPoup" popup-transition="popup-fade">
      <div class="poup">
        <div class="poupHead">
          <h4>请选择你需要的平台</h4>
          <span class="fa fa-remove" @click="hidePoup" style="width: 10%;height: 40px;line-height: 40px;"></span>
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



<ul class="aboutTab"  v-show="isShowAboutTab">
  <li  @click='aboutTabShow("HasChecked")'>历史</li>
  <li  @click='aboutTabShow("AddressList")'>通讯录</li>
  <li v-show='isSgmOrPatac=="PATAC"?true:false'  @click='aboutTabShow("Longguest")'>长期供应商</li>



</ul>

  </div>
</template>
<script>
  import Order from "@/components/Order"
  import Check from "@/components/Check"
  import AboutMe from "@/components/AboutMe"
  import Vue from 'vue'
//  import $ from "jquery"
  export default {
    name: 'HeaderAndBottom',
    data () {
      return {
        selected: "order",
        isSgmOrPatacShow:true,
        isSgmOrPatac: localStorage.getItem("isSgmOrPatac"),
        SgmOrPatacFlag: "",
        showPoup: false,
//        showPoupCheck: false,
        showLongguest: false,
//        IscheckingOrChecked: "历史",
        IsshowPoupCheck: false,
        IsaddressbookOrLongguest: "",
        checkingNum: "",
        canClickSgm: true,
        isShowAboutTab:false

      }
    },
    created: function () {
      let that = this;
      Vue.PlusReady(function () {
//        var uid = NativeObj.getUserName();
//        Vue.GetLogin(uid);
//        Vue.GetLogin("apptest01");
        Vue.GetLogin("apptest02");
      })

      if (localStorage.getItem("isSgmOrPatac") == "PATAC") {
        this.IsshowPoupCheck = true
      } else {
        this.IsshowPoupCheck = false
      }
//      if (localStorage.getItem("addressBook") == "AddressList") {
        this.IsaddressbookOrLongguest = "通讯录"
//      } else {
//        this.IsaddressbookOrLongguest = "长期供应商"
//      }
//      ;


      that.$bus.$on('checkNum', function (num) {
        that.checkingNum = num
      });


    },
    mounted: function () {
      //622解决遮罩不了头，使头(sgm)不能点击

      let that = this;
      this.$bus.$on('isSGM', function (arg) {
        that.isSgmOrPatac = arg;
      });
      this.$bus.$on('isDisableCkick', function (arg) {
        that.canClickSgm = arg;
      });
      that.$bus.$on('aboutHasMounted', function(arg){
        that.IsaddressbookOrLongguest = "通讯录"
      });


document.getElementById("view").addEventListener("touchstart",function (e) {
        that.isShowAboutTab=false;
      },true)
//
      document.getElementsByClassName("hheader")[0].addEventListener("touchstart",function () {
        that.isShowAboutTab=false;
      },false)


//      that.$bus.$on('checkHasMounted', function(arg){
//        that.IscheckingOrChecked = "历史";
//      });
//        this.IscheckingOrChecked = "历史";

    },
    watch: {
//      "$route":function(data){
//        console.log(data)
//      },


      isSgmOrPatac: function (e) {
        let that = this;
        // 监听变化从而改变sgm和pa的不同
        if (e == "PATAC") {
          that.IsshowPoupCheck = true;
          //显示审核tab
        } else {
          that.IsshowPoupCheck = false;
          //影藏审核tab
        }
//        console.log("监听变化从而改变sgm和pa的不同")
      },
      selected: function (now,old) {
          let that=this;
         if(old=="order"&& now=="aboutme"){
           that.isSgmOrPatacShow=true
         }

      },
      showPoup(boolen){
          let that=this;
        //SGM和PATAC的poup是否显示
        if (boolen) {
          $("body").css({overflow: "hidden"})
          mplus.setBackListener({
            active: '1',
          })
          document.addEventListener("backpressed",function(e){
              e.stopPropagation();
              e.preventDefault();
              that.showPoup=false;

          },false)

        } else {
          $("body").css({overflow: "auto"});
          mplus.setBackListener({
            active: '0',
          })
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
        if (this.canClickSgm) {
          this.showPoup = true;
        } else {
          return
        }

      },
      chang(e){
          let that=this;
          that.selected=e;

          if(e=="check"){
            that.isSgmOrPatacShow=false;
            $(".mint-tabbar.is-fixed>div:nth-child(2)").addClass("tabActive").siblings().removeClass("tabActive")
          }
          if(e=="order"){
            that.isSgmOrPatacShow=true;
            $(".mint-tabbar.is-fixed>div:nth-child(1)").addClass("tabActive").siblings().removeClass("tabActive")

          }

          if(e!="aboutme"){

            that.isShowAboutTab=false;
            that.$router.push('/' + e);
          }
      },

      aboutTabShow(checkedTab){
        let that=this;
        that.isShowAboutTab=false;
        that.isSgmOrPatacShow=false;
        $(".mint-tabbar.is-fixed>div:nth-child(3)").addClass("tabActive").siblings().removeClass("tabActive");
        that.$router.push("/aboutme");

//        $(".orderSelect").css("display","none")
//        $(".orderSelect").css("z-index","-1")



  setTimeout(function () {
  that.$bus.$emit('aboutTabListChecked', checkedTab); //Hub触发事件
},10)
      },


      toggleShowAboutTab(){
        let that=this;
        setTimeout(function () {
          $(".tabLast").removeClass("is-selected")

        })
        that.isShowAboutTab=!that.isShowAboutTab;
      },

      hidePoup(){
        this.showPoup = false;
      },
      sgmOrPatac(arg){
        localStorage.setItem("isSgmOrPatac", arg);
        this.isSgmOrPatac = localStorage.getItem("isSgmOrPatac");
//        console.log("yyyyy" + localStorage.getItem("isSgmOrPatac"))
        this.$bus.$emit('sgmorpathcchange', arg); //Hub触发事件
        this.showPoup = false;
      },

      longguestOrAddress(arg1, arg2, arg3){
        //向组件About发送消息
        this.IsaddressbookOrLongguest = arg1;
        this.$bus.$emit('longguestAndAddress', arg1, arg2,); //Hub触发事件
        $("body").css({overflow: "auto"})
        this.showLongguest = false;
      },
      close(){
        let that=this;
        Vue.PlusReady(function () {

          if (that.canClickSgm) {
            mplus.closeWindow()
          } else {
            return
          }

        })


      }
    }
  }
</script>
<style scoped>
  #headBot {
    background: white
  }

  .hheader {
    width: 100%;
    height: 50px;
    line-height: 50px;
    position: fixed;
    /*position: absolute;*/
    top: 0;
    left: 0;
    z-index: 1500;
    color: white
  }

  .orderSelect{
    font-size: 12px;
    height: 50px;
    line-height: 50px;
    /*padding-right: 10px;*/
    color: white;
    position: fixed;
    top: 0;
    right: 0;
    margin-right: 10px;
    z-index: 1501;
  }

  header {
    background: #26a2ff;
    font-size: 16px
  }

  .poup > .poupHead {
    /*height: 20%;*/
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #26a2ff;
    color: white;
    box-sizing: border-box;
    border: 8px solid transparent
  }

  .poup > .poupContent {
    /*height: 80%;*/
    height: calc(100% - 40px);
    /*background: red;*/
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .poup > .poupContent > button {
    background: transparent;
    color: #26a2ff;
    border: 1px solid #26a2ff;
    font-size: 16px;
    /*margin-top: -10px;*/
  }

  .poup > .poupContent > button:nth-child(1) {
    width: 40%;
    margin-right: 5%;

  }

  .poup > .poupContent > button:nth-child(2) {
    width: 40%;
    margin-left: 5%
  }

  .btnhaschecked {
    background: #26a2ff !important;
    color: white !important;
  }
  .fa.fa-angle-left{
    position: absolute; z-index: 1501;color:white;top: 0;left:0;line-height: 50px;display: inline-block;width: 40px
  }
  .aboutTab{
    width: 100px;
    position: fixed;
    bottom: 55px;
    right: 0px;
    z-index: 3000;
    list-style: none;
    background: white;
    border: 1px solid #ededed;
    /*border-right:none ;*/

  }
  .aboutTab>li{
    height:45px;
    line-height: 45px;
    width: 100%;
    text-align: center;
  }
  .aboutTab>li:nth-child(2){
    border-bottom: 1px solid #ededed;
    border-top: 1px solid #ededed;

  }

  .tabActive{
    background: #ededed;
    color: #26a2ff;
  }


  .tabFa{
    display: block;width: 30px;height: 30px;margin: 0 auto;position: relative;top: 8px;font-size: 1.5em
  }
</style>
