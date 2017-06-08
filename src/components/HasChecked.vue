<template>
  <!--<div id="yishenhe">-->
  <!--<div style="border: 8px solid #EDEDED">-->
    <mt-loadmore
      :autoFill=false
      :top-method="loadTop"
      @top-status-change="handleTopChange"
      :bottom-all-loaded="allLoaded"
      :bottomPullText="pullup"
      ref="loadmore"
      :bottom-method="loadbottom"
      @bottom-status-change="handlebottomChange"
    >
  <div>
      <div class="content" v-for="(item,index) in list">
        <div><h3><span>预约单号</span><span>{{item[0]}}</span></h3></div>
        <ul>
          <li><span>访客姓名</span><span>{{item[1]}}</span></li>
          <li><span>单位名称</span><span>{{item[2]}}</span></li>
          <li><span>手机号码</span><span>{{item[3]}}</span></li>
          <li><span>来访时间</span><span>{{item[4]}}</span></li>
          <li><span>随访人员</span><span>{{Uhasperson[index]}}</span></li>
          <li class="visiterper" v-for="pe in Uperson[index] ">
            <div><span>{{pe[0]}}</span><span>{{pe[1]}}</span></div>
          </li>
          <li v-show="Ushowcar[0][index]"><span>随访车辆</span><span>{{Uhascar[index]}}</span></li>
          <li class="visitercar" v-for="Car in Ucar[index] ">
            <div><span>车牌号</span><span>{{Car[0]}}</span></div>
          </li>
          <li><span>随访物品</span><span>{{Uhasthing[index]}}</span></li>
          <li class="visiterthing" v-for="Thi in Uthing[index] ">
            <div><span>名称</span><span>{{Thi[0]}}</span></div>
            <div><span>类型</span><span>{{Thi[1]}}</span></div>
            <div><span>数量</span><span>{{Thi[2]}}</span></div>
            <div><span>备注</span><span>{{Thi[3]}}</span></div>
          </li>
          <li><span>状态</span><span>{{item[6]}}</span></li>
          <li><span>审批人</span><span>{{item[5]}}</span></li>
        </ul>
      </div>
</div>
    </mt-loadmore>
    <!--<div v-show="allLoaded" style="width:100%;height:50px;text-align:center;line-height:50px;">没有更多数据</div>-->
  <!--</div>-->
</template>
<script>
  import Vue from 'vue';
  import $ from "jquery";
  import {Indicator} from 'mint-ui';
  //设置不自动加载，然后自调用一下下拉刷新的方法达到进入默认加载一次
  export default {
    data() {
      return {
        allLoaded: false,
        bottomStatus: '',
        topStatus: '',
        pagNO: 1,
        list: [],
        Uhasperson: [],
        Uperson: [],
        Uhasthing: [],
        Uthing: [],
        Uhascar: [],
        Ucar: [],
        Ushowcar: [],
        pullup: "上拉刷新",
      };
    },
    mounted(){
////        $("#check").css({
////          overflow: "scroll",
////        })
//      $("#yishenhe").css({
////        border: "8px solid #EDEDED",
////        borderBottom: "8px solid white",
////        overflow: "scroll",
////        boxSizing: "border-box",
//         height: $(window).height() - 105
//      })
//      document.querySelector("body").addEventListener("touchstart",function(){
////        $("#yishenhe").css({
////          marginTop:"0px"
////        })
//      },false)
//      $(".mint-loadmore-content").css({boxSizing: "border-box", minHeight: $(window).height() - 90})
      // .mint-loadmore-content
      this.loadTop()
    },
    methods: {
      handleTopChange(status) {
        this.topStatus = status;
        console.log(this.topStatus)
        if (this.topStatus != "pull") {
          console.log("加载动画");
        }
      },
      loadTop() {
        let that=this;
//        that.ajaxHasChecked("down",function(){
//          this.allLoaded = false;// 若数据已全部获取完
//          this.$refs.loadmore.onTopLoaded();
//        }.bind(this))
        that.ajaxHasChecked("down")
//        this.allLoaded = false;// 若数据已全部获取完
//        this.$refs.loadmore.onTopLoaded();
      },
      handlebottomChange(status) {
        this.bottomStatus = status;
      },
      loadbottom() {
        let that=this;
//        this.ajaxHasChecked("up", function(){
//          this.$refs.loadmore.onBottomLoaded();
//        }.bind(this))
        that.ajaxHasChecked("up")
      },
      ajaxHasChecked(updown){
        let that = this;
        if(updown=="up"){
          that.pagNO++
        }else{
          that.pagNO=1
        }
        Vue.GetMyReservation(that.pagNO, function (e) {
          let visit = e.rows;
          console.log("长度为" + e.rows.length)
          console.log("yyyyyymmmmmm" + that.pagNO);
          let nextajax = [];//循环ajax所需参数
          let len = e.rows.length;
          let currenti = 0;//判断循环请求是否请求完，每次成功++
          let alldata = [];
          let visterlist = [];
          let hasperson = [];
          let person = [];
          let hasthing = [];
          let thing = [];
          let hascar = [];
          let car = [];
          let showcar = [];
          for (var i = 0; i < len; i++) {
            nextajax.push(visit[i].visitNo);
          }
          for (var j = 0; j < len; j++) {
            let Zp = [];
            let Zt = [];
            let Zc = [];
            let visNo = nextajax[j];
            (function (LL, myindex) {
              Vue.QueryVisit2(LL,
                function (e) {
                  currenti++
                  if (e.data.guests.length == 1) {
                    // 随访访人员
                    hasperson[myindex] = "无"
                  } else {
                    hasperson[myindex] = "有"
                  }
                  if (e.data.carries.length == 0) {
                    // 随行物品
                    hasthing[myindex] = "无"
                  } else {
                    hasthing[myindex] = "有"
                  }
                  if (e.data.cars.length == 0) {
                    // 随性车辆
                    hascar[myindex] = "无"
                  } else {
                    hascar[myindex] = "有"
                  }
                  if (e.data.visitDoorIdIn == "PATAC0001") {
                    showcar[myindex] = false
                  } else {
                    showcar[myindex] = true
                  }
                  for (var i = 0; i < e.data.guests.length; i++) {
                    if (e.data.guests[i] != undefined) {

                      if (e.data.guests[i].guestType != 1) {
                        Zp.push([e.data.guests[i].guestName + "" + myindex, e.data.guests[i].guestIdcardNo])
                        // person[myindex]=[e.data.guests[i].guestName+""+myindex,e.data.guests[i].guestIdcardNo+""+myindex]
                      }
                    } else {
                      Zp.push(["ee", "ww"])

                    }

                  }
                  console.log(Zp)
                  person[myindex] = Zp;
                  for (var i = 0; i < e.data.cars.length; i++) {
                    Zc.push([e.data.cars[i].carNo])
                  }
                  car[myindex] = Zc;
                  for (var i = 0; i < e.data.carries.length; i++) {
                    Zt.push([e.data.carries[i].name, e.data.carries[i].type, e.data.carries[i].number, e.data.carries[i].desc])
                  }
                  thing[myindex] = Zt;
                  let checker = visit[myindex].checker ? visit[myindex].checker.userName : "无";
                  let visitStatus = visit[myindex].visitStatus;
                  switch (visitStatus) {
                    case 1:
                      visitStatus = "已提交"
                      break;
                    case 2:
                      visitStatus = "已批准"
                      break;
                    case 3:
                      visitStatus = "已拒绝"
                      break;
                    case 4:
                      visitStatus = "已到达"
                      break;
                    case 5:
                      visitStatus = "已离开";
                      break;
                  }
                  visterlist[myindex] = [visit[myindex].visitNo, visit[myindex].mainGuest.guestName, visit[myindex].mainGuest.guestCompanyName, visit[myindex].mainGuest.guestPhone, visit[myindex].visitPlanTime, checker, visitStatus]
                  if (currenti == len) {
//                      alert("eeeeeeeeeeeeeeeeeee")
                    if(updown=="down"){
//                        alert(that.pagNO)
                        that.list = [];
                        that.Uhasperson = [];
                        that.Uperson = [];
                        that.Uhasthing = [];
                        that.Uthing = [];
                        that.Uhascar = [];
                        that.Ucar = [];
                        that.Ushowcar = [];

                      for (var i = 0; i < visterlist.length; i++) {
                        console.log(visterlist[i])
                        that.list.push(visterlist[i]);
                      }
                      for (var i = 0; i < hasperson.length; i++) {
                        console.log(hasperson[i])
                        that.Uhasperson.push(hasperson[i]);

                      }
                      for (var i = 0; i < hasthing.length; i++) {
                        //  console.log(hasthing[i])
                        that.Uhasthing.push(hasthing[i]);
                      }
                      for (var i = 0; i < hascar.length; i++) {
                        //  console.log(hasthing[i])
                        that.Uhascar.push(hascar[i]);

                      }
                      for (var i = 0; i < person.length; i++) {
                        //  console.log(hasthing[i])
                        that.Uperson.push(person[i]);

                      }
                      for (var i = 0; i < car.length; i++) {
                        //  console.log(hasthing[i])
                        that.Ucar.push(car[i]);

                      }
                      for (var i = 0; i < thing.length; i++) {
                        //  console.log(hasthing[i])
                        that.Uthing.push(thing[i]);
                      }
                      console.log(that.Uperson[1])
                      that.Ushowcar.push(showcar);
//                      that.allLoaded = false;// 若数据已全部获取完
                      that.allLoaded = len< 9 ? true : false;
//                      alert(   that.allLoaded)
                      that.$refs.loadmore.onTopLoaded();
                      }else{
//                    Indicator.close();
//                    //所有请求求求完成，不用myindex==len判断是因为异步不知道当前求求得是第几次
                    console.log(visterlist);
                    for (var i = 0; i < visterlist.length; i++) {
                      console.log(visterlist[i])
                      that.list.push(visterlist[i]);
                    }
                    for (var i = 0; i < hasperson.length; i++) {
                      console.log(hasperson[i])
                      that.Uhasperson.push(hasperson[i]);

                    }
                    for (var i = 0; i < hasthing.length; i++) {
                      //  console.log(hasthing[i])
                      that.Uhasthing.push(hasthing[i]);
                    }
                    for (var i = 0; i < hascar.length; i++) {
                      //  console.log(hasthing[i])
                      that.Uhascar.push(hascar[i]);

                    }
                    for (var i = 0; i < person.length; i++) {
                      //  console.log(hasthing[i])
                      that.Uperson.push(person[i]);

                    }
                    for (var i = 0; i < car.length; i++) {
                      //  console.log(hasthing[i])
                      that.Ucar.push(car[i]);

                    }
                    for (var i = 0; i < thing.length; i++) {
                      //  console.log(hasthing[i])
                      that.Uthing.push(thing[i]);
                    }
                    console.log(that.Uperson[1])
                    that.Ushowcar.push(showcar);
                    that.allLoaded = len<9 ? true : false;
                    console.log(that.allLoaded)
                    that.$refs.loadmore.onBottomLoaded();
                  }
                  }
                },
                function (err) {
                  alert(err)
                }
              )
            })(visNo, j)
          }


        });

      }
    },
  };
</script>
<style scoped>
  li {
    list-style: none
  }
  /*.contentWrap{*/
    /*border: 8px solid #EDEDED;*/

  /*}*/
  .content {
    width: 100%;
    border: 8px solid #EDEDED;
    border-bottom: 0px solid #EDEDED;
    box-sizing: border-box;
  }
  .content:nth-child(1){
    margin-top: -8px;
  }
  .content > div {
    border-bottom: 1px dashed #EDEDED
  }

  .content > div > h3 {
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
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .visiterthing,
  .visitercar,
  .visiterper {
    box-sizing: border-box;
    width: calc(100% - 8px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    margin-left: 4px
  }

  .visiterthing > div,
  .visitercar > div,
  .visiterper > div {
    box-sizing: border-box;
    width: 100%;
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
  }

  .visiterthing > div span,
  .visitercar > div span,
  .visiterper > div span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
