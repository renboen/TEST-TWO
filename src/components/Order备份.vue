<template>
  <div id="order">

    <!--<mt-field label="来访日期" placeholder="来访日期" type="date" v-model="visitdate"></mt-field>-->

    <mt-field class="uu" label="访客姓名" placeholder="请输入用户名" v-model="visitername" :disableClear="true"><span
      class=" fa fa-search"
      style="padding-left:8px"
      @click.stop="showSearch"></span>
    </mt-field>

    <mt-cell title="证件类型">
      <select v-model="cardType">
        <option v-for="item in cardTypeList">{{item.value}}</option>
      </select>
      <strong class="selectiIcon fa fa-angle-down"></strong>
    </mt-cell>


    <mt-field label="证件号" placeholder="请输入身份证号" v-model="guestIdcardNo" :disableClear="true"></mt-field>
    <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="telnum"></mt-field>

    <mt-cell title="来访时间"  >
      <div class="page-datetime " style="width: 100%;height: 100%; ">
        <!--<h1 class="page-title" @click="open('picker1')">{{youWant}}</h1>-->
        <div class="page-datetime-wrapper" style="height: 100%;width: 100%; ">
          <mt-button @click.native.stop="open('picker1')"  size="large"  style="text-align: right;background: white;border: none!important;outline: none!important;box-shadow: none;font-size: 16px;" >{{youWant}}</mt-button>
          <!--<input type="button" @click.native.stop="open('picker1')" size="large"  style="text-align: right;background: white;border: none!important;outline: none!important;box-shadow: none;font-size: 16px;" value="Test" >-->
        </div>


        <!--<div>{{value}}</div>-->
      </div>
      <!--<strong class="selectiIcon fa fa-angle-down"></strong>-->
    </mt-cell>
    <mt-datetime-picker
      ref="picker1"
      v-model="value"
      yearFormat="{value}"
      hourFormat="{value} 时"
      monthFormat="{value} 月"
      dateFormat="{value} 日"
      @confirm="handleChange">
    </mt-datetime-picker>
    <mt-cell title="有效天数" v-show='this.showCar=="SGM"?false:true'>
      <select v-model="validDay">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
      <strong class="selectiIcon fa fa-angle-down"></strong>
    </mt-cell>

    <mt-cell class="current" title="供应商类型" v-show='this.showCar=="SGM"?false:true'>
      <select v-model="supplierType" class="sel">
        <option>普通供应商</option>
        <option>长期供应商</option>
      </select>
      <strong class="selectiIcon fa fa-angle-down"></strong>
    </mt-cell>




    <mt-field  v-show="!isLongGuestCompany" label="来访单位" placeholder="请输入来访单位" type="text" v-model="visitaddress"></mt-field>

    <mt-cell title="来访单位" v-show="isLongGuestCompany">
      <select v-model="visitaddress1" >
        <!--<option value=""></option>-->
        <option v-for="item in longguestCompany">{{item.name}}</option>
      </select>
      <strong class="selectiIcon fa fa-angle-down"></strong>
    </mt-cell>


    <mt-field label="来访事由" placeholder="请输入来访事由" type="text" v-model="visitmatter"></mt-field>



    <mt-cell title="厂区">
      <select v-model="factoryselected">
        <option v-for="(item,index) in factory" :value="item[1]">{{item[0]}}</option>
      </select>
      <strong class="selectiIcon fa fa-angle-down"></strong>
    </mt-cell>


    <mt-cell title="区域">
      <select v-model="areaselected">
        <option v-for="item in area" :value="item[1]">{{item[0]}}</option>
      </select>
      <strong class="selectiIcon fa fa-angle-down"></strong>
    </mt-cell>

    <mt-cell title="门岗">
      <select v-model="gateselected">
        <option v-for="item in gate" :value="item[1]">{{item[0]}}</option>
      </select>
      <strong class=" selectiIcon fa fa-angle-down"></strong>
    </mt-cell>




    <mt-field label="被访人" type="text" v-model="visiter" :readonly="true" :disableClear="true"></mt-field>
    <mt-field label="部门" type="text" v-model="department" :readonly="true" :disableClear="true"></mt-field>

    <mt-cell title="审核人" v-show='this.showCar=="SGM"?false:true'>
      <select v-model="sendForChecker">
        <option v-for="(item,index) in checkerInfo" v-bind:value="item.checkerNameForSend">{{item.checkerNameForShow}}
        </option>
        -
      </select>
      <strong class="selectiIcon fa fa-angle-down"></strong>
    </mt-cell>



    <div class="addformation">
      <div class="head">
        <div>随访人员信息<span style="padding-left: 15px"> ({{personContent.length}})</span></div>
        <div class="icongroup">
          <span class="fa fa-plus" @click="addData"></span>　　　　　　
          <span class="fa fa-minus" @click="deleteiconShow"></span>　　　　　　
          <span class=" fa " :class='showOrHideForPerson?"fa-chevron-down":"fa-chevron-up"'
                @click="isShowPerson"></span></div>
      </div>
      <div class="content" v-for="(item,index) in personContent" v-show="showOrHideForPerson">
        <div style="width:100%">
          <mt-field label="姓名" placeholder="请输入用户名" v-model="item.name"></mt-field>
          <mt-field label="身份证" placeholder="请输入身份证号" v-model="item.idNo" type="tel"></mt-field>
        </div>
        <div v-show="deleteicon" @click="deleteData(index)">
          <span class="fa fa-remove"></span>
        </div>
      </div>
    </div>


    <div class="addthingformation car " v-show='this.showCar=="SGM"?true:false'>
      <div class="head">
        <div>随访车辆信息<span style="padding-left: 15px"> ({{personContentForCar.length}})</span></div>
        <div class="icongroup">
          <span class="fa fa-plus" @click="addDataForCar"></span>　　　　　　
          <span class="fa fa-minus" @click="deleteiconShowForCar"></span>　　　　　　
          <span class=" fa " :class='showOrHideForCar?"fa-chevron-down":"fa-chevron-up"' @click="isShowCar"></span>
        </div>
      </div>
      <div class="content" v-for="(item,index) in personContentForCar" v-show="showOrHideForCar">
        <div style="width:100%">
          <mt-field label="车牌号" placeholder="请输入车牌号" v-model="item.carNo"></mt-field>
        </div>
        <div v-show="deleteiconForCar" @click="deleteDataForCar(index)">
          <span class="fa fa-remove"></span>
        </div>
      </div>
    </div>

    <div class="addthingformation ">
      <div class="head">
        <div>随访物品信息<span style="padding-left: 15px"> ({{personContentForThing.length}})</span></div>
        <!--<div>随访物品信息<span style="padding-left:15px">({{personContentForThing.length}})</span></div>-->
        <div class="icongroup">
          <span class="fa fa-plus" @click="addDataForThing"></span>　　　　　　
          <span class="fa fa-minus" @click="deleteiconShowForThing"></span>　　　　　　
          <span class=" fa " :class='showOrHideForThing?"fa-chevron-down":"fa-chevron-up"' @click="isShowThing"></span>
        </div>
      </div>
      <div class="content" v-for="(item,index) in personContentForThing" v-show="showOrHideForThing">
        <div style="width:100%">
          <mt-field label="名称" placeholder="请输入随访物品名称" v-model="item.name"></mt-field>
          <mt-field label="数量" placeholder="请输入随访物品数量" type="tel" v-model="item.number"></mt-field>
          <mt-field label="类型" placeholder="请输入随访物品类型" v-model="item.type"></mt-field>
          <mt-field label="备注" placeholder="请输入随访物品备注" v-model="item.desc" type="text"></mt-field>
        </div>
        <div v-show="deleteiconForThing" @click="deleteDataForThing(index)">
          <span class="fa fa-remove"></span>
        </div>
      </div>
    </div>

    <mt-checklist
      class="AddVisiterchecklist"
      v-model="isAddVisiterInfor"
      :options="['是否需要访客补充信息']">
    </mt-checklist>

    <mt-popup v-model="showAlert" popup-transition="popup-fade">
      <div class="poup ">
        <div class="poupHead">
          <h4>是否确认预约</h4>
          <span class="fa fa-remove" @click="hideAlert"></span>
        </div>
        <div class="poupContent">
          <mt-button type="primary" @click='isSure'>确定</mt-button>
          <mt-button type="primary" @click='hideAlert'>取消</mt-button>
        </div>
      </div>
    </mt-popup>


    <mt-popup v-model="showSearchByName" popup-transition="popup-fade">
      <div class="poup poupSearch ">
        <div class="poupHead">
          <mt-navbar v-model="searchByNameselected">
            <mt-tab-item id="1">搜索</mt-tab-item>
            <mt-tab-item id="2" v-show='this.showCar=="SGM"?true:false'>常用记录</mt-tab-item>
          </mt-navbar>
          <span class="fa fa-remove" @click="hideSearchByName"></span>
        </div>
        <div class="poupContent">
          <mt-tab-container v-model="searchByNameselected">
            <mt-tab-container-item id="1">
              <mt-field placeholder="输入要搜索的访客姓名关键字" v-model="searchKW" :disableClear="false"></mt-field>
              <ul v-for="(item,index) in SearchByNameList ">
                <li @click="searchclick(index)">
                  <div>{{item.name}}</div>
                  <div>{{item.tel}}</div>
                  <div>{{item.company}}</div>
                </li>
              </ul>
            </mt-tab-container-item>


            <mt-tab-container-item id="2">
              <div>记录名</div>
              <ul class="useHistory" v-for="(item,index) in frequentlyUsedHistory" @click="addInput(index)">
                <!--<li v-for="(item,index) in frequentlyUsedHistory" @click="addInput(index)">-->
                <li>
                  <span style="width:80%">{{item.historyName}}</span>
                  <span style="width:10%;text-align:left;" class="fa fa-pencil" @click.stop="changeName(index)"></span>
                  <span style="width:10%;text-align:right;margin-bottom:4px" class="fa fa-remove"
                        @click.stop="deleteThisHistory(index)"></span>
                </li>
              </ul>
            </mt-tab-container-item>
          </mt-tab-container>
        </div>
      </div>
    </mt-popup>


    <div class="buttongroup ">
      <mt-button type="primary" @click="ShowAlert">预约</mt-button>
      <mt-button type="primary" @click="clearInput">取消</mt-button>
    </div>
  </div>
</template>
<script>
  import $ from "jquery"
  import Vue from 'vue'
  import {Toast} from 'mint-ui';
  import {Indicator} from 'mint-ui';
  import {MessageBox} from 'mint-ui';
  export default{
    data(){
      return {
        visitername: "",
        guestIdcardNo: "",
        telnum: "",
        visitdate: "",
        visitaddress: "",
        visitaddress1:"",
        visitmatter: "",
        visiter: "",
        department: "",
        factory: [],
        factoryselected: "",
        area: [],
        areaselected: "",
        gate: [],
        gateselected: "",
        checkerInfo: [],
        sendForChecker: "",
        deleteicon: false,
        deleteiconForThing: false,
        deleteiconForCar: false,
        personContent: [],
        personContentForThing: [],
        personContentForCar: [],
        showOrHideForPerson: true,
        showOrHideForThing: true,
        showOrHideForCar: true,
        showAlert: false,
        showCar: localStorage.getItem("isSgmOrPatac"),
        isAddVisiterInfor: [],
        showSearchByName: false,
        searchByNameselected: "",


        SearchByNameList: [1, 2],
        searchKW: "",
        frequentlyUsedHistory: JSON.parse(localStorage.getItem("frequentlyUsedHistory")),

        cardType: "",
        cardTypeList: [],
        supplierType: "普通供应商",
        validDay: 1,
        longguestCompany: [],
        isLongGuestCompany:false,





        value: null,
        youWant: "请选择来访日期",
//        mindate:null
//        minute:"5"
      }

    },
    beforeRouterEnter(to, from, next){

//        next(true)
    },
    mounted: function () {
      (function ($) {
        "use strict";
        $.fn.openSelect = function () {
          return this.each(function (idx, domEl) {
            if (document.createEvent) {
              var event = document.createEvent("MouseEvents");
              event.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
              domEl.dispatchEvent(event);
            } else if (element.fireEvent) {
              domEl.fireEvent("onmousedown");
            }
          });
        }
      }($));
//       $(window).resize(function(){
//           alert("有变化")
//         })
      $(".mint-cell").click(function (e) {
//    alert(JSON.stringify( $("header").offset()))
////        $("header").offset(0,0)
//    alert(JSON.stringify( $("header").scrollTop()))


            $(this).find("input").focus();
            $(this).find("select").openSelect();
//        $(".hhheader").removeClass("hheader").addClass("ffixed")
            if($(this).find("button").length>0){
              var myDate = new Date()
              that.value = myDate
              setTimeout(function () {
                that.open('picker1')
              },100)
            }

        console.log(e.target.className)
      })

      $("select").click(function (e) {
        $(this).parent().parent().parent().click()
      })
//
//      $("#order").on("blur","input",function () {
//      $(".hheader").removeClass("ffixed")
//      })

      window.scrollTo(0, 0);
//      alert( "order"+localStorage.token)
      let that = this;
      //获取门岗信息
      that.ajaxfactoryanddoor();
      that.visiter = localStorage.userName;
      that.department = localStorage.deptname;
      //获取证件类型
      if (window.WCardTypeList == undefined) {
        Vue.GetCardType(function (e) {
          that.cardTypeList = e.data;
          that.cardType = that.cardTypeList[0].value;
          window.WCardTypeList = e.data;
        })
      } else {
        that.cardTypeList = window.WCardTypeList;
        that.cardType = window.WCardTypeList[0].value;
      }
      //审核人
      if (window.WcheckerList != undefined) {
        console.log(window.WcheckerList)
        that.checkerInfo = window.WcheckerList;
        that.sendForChecker = that.checkerInfo[0].checkerNameForSend;
      } else {
        that.getChercker()
      }

      if (window.Wlongguest != undefined) {
          that.longguestCompany = window.Wlongguest;
      } else {
        Vue.GetLongGuest(function (e) {
          console.log(e)
          that.longguestCompany = e.rows;
          window.Wlongguest=that.longguestCompany;
        })
      }


      //监听是sgm还是patac
      that.$bus.$on('sgmorpathcchange', function (arg) {
        that.factory = window.factoryanddoor[0];
        console.log(window.factoryanddoor)
        if (arg == "SGM") {
          that.showCar = arg;
          that.isLongGuestCompany=false;
          that.area = window.factoryanddoor[1][0];
          that.gate = window.factoryanddoor[2][0];
          that.factoryselected = that.factory[0][1];
          that.areaselected = that.area[0][1];
          that.gateselected = that.gate[0][1];
          that.visitaddress1=""
        } else {
          that.showCar = arg;


          that.visitaddress=""


        if(that.supplierType=="长期供应商"){
          that.isLongGuestCompany=true;
          that.visitaddress=""
        }else{
          that.isLongGuestCompany=false;
          that.visitaddress1=""
        }


          that.area = window.factoryanddoor[1][1];
          that.gate = window.factoryanddoor[2][1];
          that.factoryselected = that.factory[1][1];
          that.areaselected = that.area[0][1];
          that.gateselected = that.gate[0][1];
        }
      })
      //修复BUG
      document.querySelector(".poup").addEventListener('touchmove', function (event) {
        event.preventDefault();
      }, false);
      $(".poup").width($(window).width() * 0.95);
      $(".poup").height($(window).height() * 0.35);
//      $(".mint-tab-item-label").height($(window).height() * 0.3);

    },
    updated:function () {
      $(".mint-cell").click(function (e) {
        $(this).find("input").focus();
      })
    },


    watch: {
      visitdate(r){
//        alert(r)
      },
      youWant(e){
          if(e!="请输入来访日期"){
          $(".page-datetime-wrapper button").addClass("color1")
          }else{
            $(".page-datetime-wrapper button").removeClass("color1").addClass("color2")
          }
      },
      visitaddress(q){
//          alert(q)
      },
      supplierType(arg){
          let that=this;
          if(arg=="长期供应商"&&that.showCar=="PATAC"){
            that.isLongGuestCompany=true;
            that.visitaddress=""
//            that.visitaddress1=that.longguestCompany[0].name
            that.visitaddress1=""
          }else{
            that.isLongGuestCompany=false;
            that.visitaddress=""
            that.visitaddress1=""
          }

      },
      searchByNameselected(arg){
        let that = this
        let gg = false;
        if (arg == 2) {

          $(".poupSearch .mint-tab-container-item").eq(1).css("display", "block")
          that.searchKW = ""
        } else {
          that.searchByName("")
        }
      },
      factoryselected(selected){
        //监听factory的变化。从而使区域和门岗进行对应变化。
        let that = this;
        that.factory = window.factoryanddoor[0];
        console.log(window.factoryanddoor)
        if (selected == "1") {
          that.area = window.factoryanddoor[1][0];
          that.gate = window.factoryanddoor[2][0];
          that.factoryselected = that.factory[0][1];
          that.areaselected = that.area[0][1];
          that.gateselected = that.gate[0][1];
        } else {
          that.area = window.factoryanddoor[1][1];
          that.gate = window.factoryanddoor[2][1];
          that.factoryselected = that.factory[1][1];
          console.log("uuuuuuuuuuuuuuuuuu")
          that.areaselected = that.area[0][1];
          that.gateselected = that.gate[0][1];
        }
      },

      showSearchByName: function (arg) {
        let that = this;
        if (arg) {
          //在访客姓名里面进行访客赛选
          that.searchByName(that.searchKW);
          that.searchByNameselected = "1";
          $(".poupSearch .mint-tab-container-item").eq(0).css("display", "block")
        } else {
//          alert( )
          $(".poupContent").scrollTop(0)

        }
      },
      searchKW(){
        let that = this;
        that.searchByName(that.searchKW);
//        that.searchByNameselected = "1";
      },
      personContent: function () {
        if (this.personContent.length == 0) {
          this.deleteicon = false
        }
      },
      personContentForThing: function () {
        if (this.personContentForThing.length == 0) {
          this.deleteiconForThing = false
        }
      },
    },
    methods: {
      clickinput(){
        alert("b")
      },
      deleteiconShow(){
        console.log(this.personContent)
        if (this.personContent.length == 0) return;
        this.deleteicon = !this.deleteicon
      },
      deleteiconShowForThing(){
        if (this.personContentForThing.length == 0) return;
        this.deleteiconForThing = !this.deleteiconForThing
      },
      deleteiconShowForCar(){
        if (this.personContentForCar.length == 0) return;
        this.deleteiconForCar = !this.deleteiconForCar
      },
      addData(){
        if (this.deleteicon && this.personContent.length != 0) return;
        this.personContent.push({"name": "", "idNo": ""});
      },
      addDataForThing(){
        if (this.deleteiconForThing && this.personContentForThing.length != 0) return;
        this.personContentForThing.push({"name": "", "number": "", "type": "", "desc": ""});
      },
      addDataForCar(){
        if (this.deleteiconForCar && this.personContentForCar.length != 0) return;
        this.personContentForCar.push({"carNo": ""});
      },
      deleteData(index){
        this.personContent.splice(index, 1);
      },
      deleteDataForThing(index){
        this.personContentForThing.splice(index, 1)
      },
      deleteDataForCar(index){
        this.personContentForCar.splice(index, 1)
      },
      isShowPerson(){
        if (this.personContent.length == 0) return;
        this.showOrHideForPerson = !this.showOrHideForPerson
      },
      isShowThing(){
        if (this.personContentForThing.length == 0) return;
        this.showOrHideForThing = !this.showOrHideForThing
      },
      isShowCar(){
        console.log(this.personContentForCar)

        if (this.personContentForCar.length == 0) return;
        this.showOrHideForCar = !this.showOrHideForCar
      },
      hideAlert(){
        this.showAlert = false
      },
      ShowAlert(){
        this.showAlert = true
      },
      ajaxfactoryanddoor(){
        let that = this;
        //获取门岗信息
        Vue.GetDoor(function (e) {
          let visitBranch = [];
          let visitAreaIdIn = [];
          let visitDoorIdIn = [];
          let visitAreaIdInList = [];
          let visitDoorIdInList = [];
          //厂区
          for (var i = 0; i < e.rows.length; i++) {
            visitBranch.push([e.rows[i].name, e.rows[i].id])
          }
          //区域
          for (var j = 0; j < e.rows.length; j++) {
            for (var i = 0; i < e.rows[j].areas.length; i++) {
              visitAreaIdIn.push([e.rows[j].areas[i].name, e.rows[j].areas[i].id])
            }
            visitAreaIdInList.push(visitAreaIdIn);
            visitAreaIdIn = []
          }
          //门岗
          for (var j = 0; j < e.rows.length; j++) {
            for (var i = 0; i < e.rows[j].doors.length; i++) {
              visitDoorIdIn.push([e.rows[j].doors[i].name, e.rows[j].doors[i].id])
            }
            ;
            visitDoorIdInList.push(visitDoorIdIn);
            visitDoorIdIn = [];
          }
          window.factoryanddoor = [visitBranch, visitAreaIdInList, visitDoorIdInList];
          that.factory = visitBranch;

          console.log(window.factoryanddoor)
          console.log(that.factory)
          if (localStorage.getItem("isSgmOrPatac") == "SGM") {
            that.area = visitAreaIdInList[0];
            that.gate = visitDoorIdInList[0];
            console.log(777777777777)
            console.log(that.area)
            that.factoryselected = that.factory[0][1];
            that.areaselected = that.area[0][1];
            that.gateselected = that.gate[0][1];
          } else {
            that.area = visitAreaIdInList[1];
            that.gate = visitDoorIdInList[1];
            that.factoryselected = that.factory[1][0];
            that.areaselected = that.area[0][1];
            that.gateselected = that.gate[0][1];
          }
          console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwww")
          console.log(that.factory)
          console.log(that.area)
          console.log(that.gate)
        });
      },
      getChercker(){
        //获取审核人
        let that = this;
        if (!window.WcheckerList) {
          console.log("第一次请求待审核人")
          Vue.GetSearchId(function (e) {
            let checkerList = [];
            if (e.rows.length == 0) {
            } else {
              var length = e.rows.length;
              for (var i = 0; i < length; i++) {
                checkerList.push({
                  "checkerNameForSend": e.rows[i].id,
                  "checkerNameForShow": e.rows[i].userName.split("(")[0]
                })
              }
              that.checkerInfo = checkerList;
              that.sendForChecker = that.checkerInfo[0].checkerNameForSend;
              window.WcheckerList = checkerList;
              console.log(that.checkerInfo)
            }
          });
        }
      },

      isSure(){
        let that = this;
        console.log("ajax请求");
        if (that.showCar == "SGM") {
          var SendcheckUserId = "";//审核人
          var jsoncars = that.personContentForCar;//随访车辆
          var guestCompanyType = "";//供应商类型
          that.validDay = "";//有效天数
        } else {
          var SendcheckUserId = that.sendForChecker;
          var jsoncars = [];
          that.validDay = 1
        }
        if (that.supplierType == "普通供应商") {
          guestCompanyType = 1
        } else {
          guestCompanyType = 2
        }
        if (that.isAddVisiterInfor[0]) {
          var yesNo = "1";
        } else {
          var yesNo = "0";
        }

        if(that.isLongGuestCompany){
            var company=that.visitaddress1
        }else{
          var company=that.visitaddress
        }
        var senddata = {
          "token": localStorage.token,
          "uid": localStorage.id,
          "guestName": that.visitername,
          "guestCompanyName": company,
          "guestIdcardNo": that.guestIdcardNo,
          "guestPhone": that.telnum,
          "guestVisitDesc": that.visitmatter,

          "visitPlanTime": that.visitdate,
          "userName": localStorage.userName,
          "userDeptName": localStorage.deptname,

          "visitBranchIdIn": that.factoryselected,
          "visitAreaIdIn": that.areaselected,
          "visitDoorIdIn": that.gateselected,

          "checkUserId": SendcheckUserId,
          "additionInfo": yesNo,


          "json_otherGuests": JSON.stringify(that.personContent),
          "json_carries": JSON.stringify(that.personContentForThing),
          "json_cars": JSON.stringify(jsoncars),

          "guestCompanyType": guestCompanyType,
          "visitValidDays": that.validDay,
        }
        console.log(senddata)
        //预约发起接口
        Vue.AddInvite(senddata,
          function () {
            if (localStorage.token == undefined || localStorage.id == undefined) {
              Toast("登录账号异常");
              return false;
            }
          },
          function (e) {
            Toast("预约成功");
            //预约成功则添加常用记录
            if (yesNo == 1 && that.showCar == "SGM") {
              console.log("Order", localStorage.getItem("frequentlyUsedHistory"))
              var oldHistory = JSON.parse(localStorage.getItem("frequentlyUsedHistory"));
              var Len = oldHistory.length + 1;
              var historyName = "记录" + Len;
              var historyItem = {
                "token": localStorage.token,
                "uid": localStorage.id,
                "guestName": that.visitername,
                "guestPhone": that.telnum,
                "visitPlanTime": that.visitdate,
                "guestCompanyName": that.visitaddress,
                "guestVisitDesc": that.visitmatter,
                "userName": localStorage.userName,
                "userDeptName": localStorage.deptname,
                "visitBranchIdIn": that.factoryselected,
                "visitAreaIdIn": that.areaselected,
                "visitDoorIdIn": that.gateselected,
                "guestIdcardNo": that.guestIdcardNo,
                "checkUserId": SendcheckUserId,
                "additionInfo": yesNo,
              };
              var newHistoryItem = {
                "historyName": historyName,
                "historyItem": historyItem
              };
              console.log(oldHistory.constructor === Array)
              // console.log(newHistoryItem)
              oldHistory.push(newHistoryItem)
              console.log(oldHistory)
              that.frequentlyUsedHistory = oldHistory;
              localStorage.setItem("frequentlyUsedHistory", JSON.stringify(oldHistory))
              console.log(JSON.parse(localStorage.getItem("frequentlyUsedHistory")))
              console.log(that.frequentlyUsedHistory);
            };
            //清空
            that.clearInput()
          }
        )
        this.showAlert = false;
      },
      searchByName(KW){
        let that = this;
        let search = [];
        that.SearchByNameList = [];
        if (that.searchByNameselected == "1") {

          Vue.GetLinkers("up", 1, 100, KW, function (e) {
            console.log("pppppppppppppppppppp");
            // console.log(e.rows);
            e.rows.map(function (item) {
              search.push({
                name: item.name,
                tel: item.phone,
                company: item.companyName,
                idcard: item.description
              });
            })
            that.SearchByNameList = search;
            console.log(that.SearchByNameList);

          })
        }
      },
      searchclick(arg){
        let that = this;
        console.log(that.SearchByNameList[arg])
        let search = that.SearchByNameList[arg]
        that.visitername = search.name;
        that.guestIdcardNo = search.idcard;
        that.telnum = search.tel;
        that.visitaddress = search.company;
        that.showSearchByName = false;
      },
      showSearch(){
        let that = this;
        that.showSearchByName = true;


      },
      hideSearchByName(){
        let that = this;
        that.showSearchByName = false;
      },
      addInput(arg){
        let that = this;
        let thisItenm = that.frequentlyUsedHistory[arg].historyItem;
        console.log(thisItenm)
        that.visitername = thisItenm.guestName;
        that.guestIdcardNo = thisItenm.guestIdcardNo;
        that.telnum = thisItenm.guestPhone;
        that.visitdate = thisItenm.visitPlanTime;
        that.visitaddress = thisItenm.guestCompanyName;
        that.department = thisItenm.userDeptName;
        that.factoryselected = thisItenm.visitBranchIdIn;
        that.areaselected = thisItenm.visitAreaIdIn;
        that.gateselected = thisItenm.visitDoorIdIn;
        that.sendForChecker = thisItenm.checkUserId;

        that.showSearchByName = false;
      },
      changeName(arg){
        let that = this;
        MessageBox.prompt('请输入姓名').then(({value, action}) => {
          that.frequentlyUsedHistory[arg].historyName = value;
          console.log(that.frequentlyUsedHistory[arg].historyName)
          localStorage.setItem("frequentlyUsedHistory", JSON.stringify(that.frequentlyUsedHistory))
        });

      },
      deleteThisHistory(arg){
        let that = this;
        // frequentlyUsedHistory:
        that.frequentlyUsedHistory.splice(arg, 1);
        // that.frequentlyUsedHistory.map(function(item,index){
        //   item.historyName="记录"+(index+1)
        // });
        localStorage.setItem("frequentlyUsedHistory", JSON.stringify(that.frequentlyUsedHistory))
        console.log(JSON.parse(localStorage.getItem("frequentlyUsedHistory")))
      },
      clearInput(){
        console.log("清空input")
        let that = this;
        that.visitername = "";
        that.guestIdcardNo = "";
        that.telnum = "";
        that.visitdate = "";
        that.visitaddress = "";
        that.visitmatter = "";
        that.personContent = [];
        that.personContentForThing = [];
        that.personContentForCar = [];



      that.value=null,
      that.youWant= "请输入来访日期"
      },


      open(picker) {
          let that=this;

        $(".picker-slot-wrapper:last").html('<div class="picker-item picker-selected" style="height: 36px; line-height: 36px;">00 分</div>')
        $(".picker-slot-wrapper:last").append('<div class="picker-item " style="height: 36px; line-height: 36px;">15 分</div>')
        $(".picker-slot-wrapper:last").append('<div class="picker-item " style="height: 36px; line-height: 36px;">30 分</div>')
        $(".picker-slot-wrapper:last").append('<div class="picker-item " style="height: 36px; line-height: 36px;">45 分</div>')
        $(".picker-slot-wrapper:last").on("touchstart",function (e) {
            e.preventDefault()
        })
        $(".picker-slot-wrapper:last").on("touchmove",function () {
          setTimeout(function(){
            var str = $(this).attr("style").split("translate(0px,")[1];
            var transLateY=str.split("px")[0];
            var index= parseInt(Math.abs(transLateY/36-4)-1);
            $(".picker-slot-wrapper:last>div").removeClass("picker-selected")
            $(".picker-slot-wrapper:last>div").eq(index).addClass("picker-selected")
          }.bind(this),100)
        })

        $(".picker-slot-wrapper:last").on("touchend",function () {
          var str = $(this).attr("style").split("translate(0px,")[1];
          var transLateY=str.split("px")[0];
          if(transLateY<0){
            //height: 252px; transform: translate(0px, 108px) translateZ(0px);
            $(this).attr("style","height: 252px; transform: translate(0px, 0px) translateZ(0px);")
          }
        })
        var datatime = new Date()
        let year = datatime.getFullYear();
        let mounth=datatime.getMonth() + 1<10?"0"+(datatime.getMonth() + 1):datatime.getMonth() + 1;
        let date=datatime.getDate()<10?"0"+datatime.getDate():datatime.getDate()+1
//        let hour=datatime.getHours()<10?"0"+datatime.getHours():datatime.getHours();
        let hour="09";
        this.value = year + '-' + mounth + '-' + date + ' ' + hour+":00";
        this.$refs[picker].open();
      },
      handleChange(value) {
        var str =  $(".picker-slot-wrapper:last").attr("style").split("translate(0px,")[1];
        var transLateY=str.split("px")[0]/36;
        var minutes=(Math.abs(transLateY-4)-1)*15
        if(minutes==0){
          minutes="00"
        }
        let that = this;
        let datatime = new Date(value);
        let year = datatime.getFullYear();
        let mounth=datatime.getMonth() + 1<10?"0"+(datatime.getMonth() + 1):datatime.getMonth() + 1;
        let date=datatime.getDate()<10?"0"+datatime.getDate():datatime.getDate()
        let hour=datatime.getHours()<10?"0"+datatime.getHours():datatime.getHours();
//        let hour="09";
//        let minutes=datatime.getMinutes()<10?"0"+datatime.getMinutes():datatime.getMinutes() ;
        that.youWant = year + '-' + mounth + '-' + date + ' ' + hour + ':' +minutes ;
//        alert(that.youWant)
        console.log(value, year + '-' + mounth + '-' + date + ' ' + hour + ':' +minutes)
        that.visitdate=that.youWant

      }
    }
  }
</script>

<style scoped>
  #order {
    text-align: left;

    position: absolute;

  }

  select {
    /*position: absolute;*/
    /*right: 4px;*/
    width: 100%;
    border: none;
    /*text-align: right;*/
    font-size: 16px;
    direction: rtl;
    padding-right: 15px;
    -webkit-appearance: none;
    outline: none;
    background: white !important;
  }

  select > option {
    background: white !important;
  }

  .selectiIcon {
    position: absolute;
    right: 10px;
  }

  option {
    /*text-align: right;*/
    direction: ltr;
  }

  .addformation, .addthingformation {
    margin-top: 8px;
  }

  .addformation > .head, .addthingformation > .head {
    width: 100%;
    height: 48px;
    display: inline-flex;
    background: #0434B2;
    color: white;
    justify-content: space-between;
    align-items: center
  }

  .addformation > .head > div:nth-child(1), .addthingformation > .head > div:nth-child(1) {
    margin-left: 8px
  }

  .addformation > .head > div:nth-child(2), .addthingformation > .head > div:nth-child(2) {
    margin-right: 8px
  }

  .addformation > .head > .icongroup > span, .addthingformation > .head > .icongroup > span {
    display: inline-block;
    padding-left: 25px
  }

  .addformation > .content,
  .addthingformation > .content {
    height: 96px;
    /*width: calc(100% - 8px);*/
    width:100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .addthingformation > .content {
    height: 192px;
  }

  .addthingformation.car > .content {
    height: 48px;
  }

  .addformation > .content > div:nth-child(2), .addthingformation > .content > div:nth-child(2) {
    width: 10%;
    text-align: center;
    height: 90%;
    background: #fe0000;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  .buttongroup {
    width: 100%;
    height: 70px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .buttongroup > button {
    width: 40%;
    height: 40px;
    line-height: 40px;
    letter-spacing: 10px;
    text-indent: 10px;
    margin: 0 20px;
  }

  .buttongroup > button:nth-child(1) {
    background: #0434B2
  }

  .buttongroup > button:nth-child(2) {
    background: transparent;
    color: #0434B2;
    border: 1px solid #0434B2
  }

  .poup > .poupHead {
    /*height: 20%;*/
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #0434b2;
    color: white;
    box-sizing: border-box;
    border: 8px solid transparent
  }

  .poup > .poupContent {
    /*height: 80%;*/
    height:calc(100% - 40px);
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .poup > .poupContent > button {
    background: transparent;
    color: #0434B2;
    border: 1px solid #0434B2;
    /*margin-top: -60px!important;*/
  }

  .poup > .poupContent > button:nth-child(1) {
    width: 35%;
    margin-right: 5%;
  }

  .poup > .poupContent > button:nth-child(2) {
    width: 35%;
    margin-left: 5%
  }

  .poup > .poupHead {
    background: transpartent

  }

  .poupSearch > .poupHead {
    border: none;
  }

  .poupSearch .mint-navbar {
    width: 100%;
    background: #0434b2

  }
.fa-search{
  height: 48px;
  width:20px;
  line-height: 48px;
  /*background: red;*/
}
  .poupSearch .fa-remove {
    position: absolute;
    right: 8px;
    top: 4px;
  }

  .poupSearch .mint-tab-container-wrap {
    /*margin-top: 20px;*/

  }

  .poupSearch .mint-tab-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: scroll;
    border-left: 8px solid white;
    border-right: 8px solid white;
  }

  .poupSearch ul {
    border-bottom: 1px solid #c8c8cd;
    height: 48px;
  }

  .poupSearch .mint-tab-container li {
    display: flex;
    flex-wrap: wrap;
  }

  .poupSearch .mint-tab-container li div {
    flex: 50%;
    height: 24px;
    line-height: 24px;
    overflow: hidden;
    text-overflow: clip;

  }

  .poupSearch .mint-navbar .mint-tab-item {
    padding: 0;
  }

  .poupSearch .mint-navbar .mint-tab-item.is-selected {
    color: white;
  }

  .poupSearch .useHistory li {
    display: flex;
    align-items: center;

  }

  .poupSearch .useHistory li > span {
    position: relative;
  }
  .color1{
    color:#969696
  }
  .color1{
    color:black
  }

  .ffixed{
    position:absolute!important;
  }

</style scoped>
