<template>
  <!--<div id="waiting">-->
  <div style="border:8px solid #EDEDED;border-top:0px;background: #EDEDED">
    <mt-loadmore
      :autoFill=false
      :top-method="loadTop"
      @top-status-change="handleTopChange"
      :bottom-all-loaded="allLoaded"
      ref="loadmore"
      :bottom-method="loadbottom"
      @bottom-status-change="handlebottomChange"
    >
      <!--612-->
      <div id="waiting" >
        <div style="height: 8px;background: #ededed"></div>
        <div class="content" v-for="(item,index) in list">
          <div class="hd"><h3><span>预约单号</span><span>{{item.visitNo}}</span></h3></div>
          <ul>
            <li><span>来访时间</span><span>{{item.visitPlanTime}}</span></li>
            <li><span>申请人</span><span>{{item.userName}}</span></li>
            <li><span>访客姓名</span><span>{{item.mainGuest.guestName}}</span></li>
            <li><span>来访单位</span><span>{{item.mainGuest.guestCompanyName}}</span></li>
            <li><span>来访事由</span><span>{{item.visitorReason}}</span></li>
            <li><span>厂区信息</span><span>{{item | FilterFactory}}</span></li>
            <li><span>随访人员</span><span>{{hasPerson[index][0]}}</span></li>
            <li class="visitperson other" v-for="items in visitPersonlist[index]">
              <div> <span>{{items[0]}}</span><span>{{items[1]}}</span> </div>
            </li>
            <li v-show="Boolean(Ushowcar[index])"><span>随访车辆</span><span>{{Uhascar[index][0]}}</span></li>
            <li v-show="Boolean(Ushowcar[index])" class="visitercar other" v-for="Car in Ucar[index] ">
              <div><span>车牌号</span><span>{{Car[0]}}</span></div>
            </li>



            <li><span>随访物品</span><span>{{hasThing[index][0]}}</span></li>
            <li class="visitthi other" v-for="items in visitThinglist[index]">
              <div><span>名称</span><span>{{items[0]}}</span></div>
              <div><span>类型</span><span>{{items[1]}}</span></div>
              <div><span>数量</span><span>{{items[2]}}</span></div>
              <div><span>备注</span><span>{{items[3]}}</span></div>
            </li>
            <li><span>审核状态</span><span>{{item | FilterCheckStatus}}</span></li>
          </ul>
          <div class="btnGroup">
            <mt-button type="primary" @click='yesorno(index,orderid[index],1)'>同意</mt-button>
            <mt-button type="primary" @click='yesorno(index,orderid[index],2)'>拒绝</mt-button>
          </div>
        </div>
        <div v-show="allLoaded" style="width:100%;height:35px;text-align:center;line-height:35px;margin-top: -8px">没有更多数据</div>

      </div>
    </mt-loadmore>

  </div>
</template>

<script>  import $ from "jquery";

import Vue from 'vue';
import {Indicator} from 'mint-ui';
import {Toast} from 'mint-ui';
export default {
  data() {
    name:"aboutme"
    return {
//      allLoaded: true,
      allLoaded: false,
      bottomStatus: '',
      topStatus: '',
      list: [],//待审核
      visitPersonlist: [],//随访人员
      hasPerson: [],//是否有随访人员
      visitThinglist: [],//是否有随访物品
      hasThing: [],//是否有物品

      Uhascar: [],
      Ucar: [],
      Ushowcar: [],

      orderid: [],//点击同意或者拒所需参数
    };
  },
  filters: {
    FilterFactory(value){
//      console.log(value);
      // console.log(value.visitBranchIdIn)
      let visitBranchIdIn = value.visitBranchIdIn;
      let visitAreaIdIn = value.visitAreaIdIn;
      let visitDoorIdIn = value.visitDoorIdIn;
      switch (value.visitBranchIdIn) {
        case "1":
          visitBranchIdIn = "金桥北厂"
          break;
        case "2":
          visitBranchIdIn = "泛亚"
          break;
      }

      switch (visitAreaIdIn) {
        case "10001":
          visitAreaIdIn = "老行政楼"
          break;
        case "10002":
          visitAreaIdIn = "新行政楼"
          break;
        case "10003":
          visitAreaIdIn = "总装车间"
          break;
        case "10004":
          visitAreaIdIn = "油漆车间"
          break;
        case "10005":
          visitAreaIdIn = "车身车间"
          break;
        case "10006":
          visitAreaIdIn = "冲压车间"
          break;
        case "10007":
          visitAreaIdIn = "动力总成"
          break;
        case "10008":
          visitAreaIdIn = "动力站房"
          break;
        case "20001":
          visitAreaIdIn = "1#行政楼"
          break;
        case "20002":
          visitAreaIdIn = "2#综合试验楼"
          break;
        case "20003":
          visitAreaIdIn = "3#办公楼"
          break;
        case "20004":
          visitAreaIdIn = "4#VME楼"
          break;
        case "20005":
          visitAreaIdIn = "5#PT楼"
          break;
        case "20006":
          visitAreaIdIn = "6#立体车库"
          break;
        case "20007":
          visitAreaIdIn = "7#加油站"
          break;
        case "20008":
          visitAreaIdIn = "8#NVH楼"
          break;
        case "20009":
          visitAreaIdIn = "9#风洞实验室"
          break;
        case "20010":
          visitAreaIdIn = "10#安保中心"
          break;
        case "20011":
          visitAreaIdIn = "11#35KV楼"
          break;
        case "20012":
          visitAreaIdIn = "12#能源中心"
          break;
      }

      switch (visitDoorIdIn) {
        case "SJQNP0001":
          visitDoorIdIn = "东一门"
          break;
        case "PATAC0001":
          visitDoorIdIn = "一号门"
          break;
      }
      ;
      let allmsg = visitBranchIdIn + "," + visitAreaIdIn + "," + visitDoorIdIn;
      return allmsg
    },
    FilterCheckStatus(value){
      let CheckStatus = "";
      switch (value.checkStatus) {
        case "0":
          CheckStatus = "未审核"
          break;
        case "1":
          CheckStatus = "审核通过"
          break;
        case "2":
          CheckStatus = "审核不通过"
          break;
        case "3":
          CheckStatus = "无需审核"
          break;
      }
      ;
      return CheckStatus
    },
    FilterIsEmtry(value){
      if (!value) {
        return value = "无"
      }
    },
  },
  methods: {
    handleTopChange(status) {
      this.topStatus = status;
    },
    loadTop() {
      let that = this;
      that.getWaitCheck("down")
    },
    handlebottomChange(status) {
      this.bottomStatus = status;
    },
    loadbottom() {
      let that = this;
//      console.log("上拉加载");
      that.getWaitCheck("up")
    },
    getWaitCheck(updown){
      let that = this;
      Vue.GetVisitReplies(function (e) {
        that.orderid = [];
        var vist = e.rows;
        var forList = [];
        // var useList=[];//
        var aboutpersonList = [];
        var ishasPerson = [];
        var aboutthingList = [];
        var ishasthing = [];

        var showcar=[];
        var ishascar=[];
        var aboutcarList=[];


        for (var i = 0; i < vist.length; i++) {
          that.orderid.push(vist[i].id)
        }
//        console.log(that.orderid)//预约信息ID
        for (var i = 0; i < vist.length; i++) {
          forList.push(new Promise(function (ok, err) {
            var vv = vist[i];
            Vue.QueryVisit(
              vist[i].visitNo,
              function (e) {
//                console.log(vist[i].visitNo)
//                console.log(e)
                ok(e)
              },
              function (error) {
                Toast({
                  message: error,
                  duration: 1000
                });
              }
            )
          }).then(function (val) {
//            console.log(8888888888888888)
//            console.log(val.data)

            var tL = [];
            var pL = [];

            var cL=[];

            var hasper = [];
            var hasth = [];

            var hascar=[];


            if (val.data.visitDoorIdIn == "PATAC0001") {
              showcar.push(false)
            } else {
              showcar.push(true)
            }

            if (val.data.cars.length ==0) {
              hascar.push("无");
            } else {
              hascar.push("有");
            }

            for (var j = 0; j < val.data.cars.length; j++) {
                cL.push(val.data.cars[j].carNo)
//                console.log(pL);
            }



            if (val.data.guests.length == 1) {
              hasper.push("无");
            } else {
              hasper.push("有");
            }
            if (val.data.carries.length == 0) {
              hasth.push("无");
            } else {
              hasth.push("有");
            }

            for (var j = 0; j < val.data.guests.length; j++) {
              if (val.data.guests[j].guestType != "1") {
//                console.log(pL);
                pL.push([val.data.guests[j].guestName, val.data.guests[j].guestIdcardNo])
//                console.log(pL);
              }
            }

            for (var k = 0; k < val.data.carries.length; k++) {
              // e.data.carries[k].name
              // e.data.carries[k].type
              //  e.data.carries[k].number
              //  e.data.carries[k].desc
              tL.push([val.data.carries[k].name, val.data.carries[k].type, val.data.carries[k].number, val.data.carries[k].desc])
            }
            ishasPerson.push(hasper)
            ishasthing.push(hasth)
            ishascar.push(hasth)
            aboutpersonList.push(pL);
            aboutthingList.push(tL);
            aboutcarList.push(tL);

          }));
        }
        Promise.all(forList).then(function () {
          // console.log(vist)//待审核信息
          // console.log(ishasPerson);//是否有人
//            console.log(aboutpersonList);//有多少人
//            console.log(ishasthing);//是否有物品
//            console.log(ishascar);//是否有物品
//            console.log(aboutcarList);//是否有物品
//            console.log(showcar);//是否有物品

          Indicator.close();
          if (updown == "up") {
            that.list = vist;
            that.visitPersonlist = aboutpersonList;
            that.hasPerson = ishasPerson;
            that.hasThing = ishasthing;
            that.visitThinglist = aboutthingList;

            that.Ucar = aboutcarList;
            that.Uhascar = ishascar;
            that.Ushowcar = showcar;

            that.allLoaded = that.list.length < 10 ? true : false;
            that.$refs.loadmore.onBottomLoaded();
            setTimeout(function(){
              window.scrollTo(0,0)
            },10);
          } else {
//            console.log("下拉刷新");
            that.list = [];//待审核
            that.visitPersonlist = [];//随访人员
            that.hasPerson = [];//是否有随访人员
            that.visitThinglist = [];//是否有随访物品
            that.hasThing = [];//是否有物品
            that.list = vist;
            that.visitPersonlist = aboutpersonList;
            that.hasPerson = ishasPerson;
            that.hasThing = ishasthing;
            that.visitThinglist = aboutthingList;
            that.allLoaded = true;// 若数据已全部获取完
            that.$refs.loadmore.onTopLoaded();
          }


        });
      });

    },
    yesorno(index, id, checkstatus){
      let that = this;
//      console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww")
//      console.log(index, id, checkstatus)
//      console.log("调用" + "Vue.UpdateStatus病弹框")
      Vue.UpdateStatus(index, id, checkstatus, function (e) {
//        console.log(e)
        if (e.description == "该预约信息已被审核过") {
          Toast("该预约信息已被审核过")
        } else {
          let anycAjax = () => new Promise((resolve) => {
              setTimeout(() => {
                Toast({
                  message: '操作成功',
                  duration: 1000
                });
                resolve()
              });
            }
          );
          anycAjax().then(function () {
            setTimeout(() => {
              that.loadTop()
            }, 1200);
          })


        }

      })

    }

  },
  mounted(){
//        alert(2)
let that=this;

    Vue.getWaitCheckNum(function (e) {
//        console.log(e.data);
       let num=e.data
      that.$bus.$emit('checkNum', num); //Hub触发事件
    })
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
//612
    $("#waiting").css({
      minHeight: $(window).height() - 113
    })
    that.getWaitCheck("up")

}
};
</script>
<style scoped>

  .content {
    width: 100%;
    border-bottom: 8px solid #EDEDED;
    background: white;
  }

  .content > div.hd {
    border-bottom: 1px dashed #EDEDED
  }
  .content > div.hd > h3 {
    width: calc(100% - 16px);
    margin-left: 8px;
    padding: 10px 0;
    color: #5569c0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .content > ul {
    width: calc(100% - 16px);
    margin-left: 8px;
    font-size: 14px;
  }

  .content > ul > li {
    box-sizing: border-box;
    /*padding: 5px 0;*/
    margin-top: 5px;
    display: flex;

    justify-content: space-between;
    align-items: center;
  }

  .content > ul > li > span:nth-child(1) {
    width: 25%;
    text-align: left;
  }

  .content > ul > li > span:nth-child(2) {
    width: 70%;
    text-align: right;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }


  .other{
    /*width:calc(100% - 8px);*/
    /*margin-left: 4px;*/
    flex-direction: column;
    /*border-left: 2px solid #0434b2;*/

  }
  .other>div{
    width: 100%;
    display: flex;
    align-items: center;
  }
  .other>div>span:nth-child(1){
    width:25%;
    text-align: left;
    }
  .other>div>span:nth-child(2){
    width:75%;
    text-align: right;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .btnGroup {
    width: calc(100% - 8px);
    padding: 10px 0;
    display: flex;
    justify-content: flex-end;
  }

  .btnGroup > button {
    width: 25%;
    margin-left: 5%;
  }

  .btnGroup > button:nth-child(1) {
    background: #0434B2
  }

  .btnGroup > button:nth-child(2) {
    background: transparent;
    color: #0434B2;
    border: 1px solid #0434B2
  }
</style>
