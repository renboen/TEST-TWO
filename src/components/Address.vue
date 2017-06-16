<template >
  <!--<div id="tongxunlu">-->
  <div style="border:8px solid #EDEDED;border-top:0px;border-bottom:0px ;">
    <!--<div>-->
      <mt-loadmore
        style="background: #EDEDED"
        :autoFill=false
        :top-method="loadTop"
        :bottomPullText="pullup"
        @top-status-change="handleTopChange"
        :bottom-all-loaded="allLoaded"
        ref="loadmore"
        :bottom-method="loadbottom"
        @bottom-status-change="handlebottomChange"
      >
        <div id="about" >
          <div class="aboutMeMsg" v-for="(item,index) in list">
            <mt-cell-swipe
              :class="item.id"
              :right="[
                    {
                      content: '<div>×</div>',
                      handler:function(){
                        deletLinker(index,item.id)
                      }
                    }
                  ]">
              <div class="fa fa-user-circle-o fa-3x"></div>
              <ul>
                <li><span>{{item.name}}</span><span>{{item.phone}}</span></li>
                <li><span>{{item.companyName}}</span></li>
              </ul>
            </mt-cell-swipe>
          </div>
          <div style="height:4px;background:#EDEDED"></div>
          <div v-show="allLoaded" style="width:100%;height:35px;text-align:center;line-height:35px; background: #EDEDED;margin-top: -10px">
            没有更多数据
          </div>
        </div>
      </mt-loadmore>
    <!--</div>-->
  </div>
</template>
<script>
  import Vue from 'vue'
  import $ from "jquery"
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';
  export default {
    data() {
      return {
        allLoaded: false,
        bottomStatus: '',
        topStatus: '',
        directioryNumber: 1,
        pullup: "",
        list: [],
      };
    },

    methods: {
      handleTopChange(status) {
        this.topStatus = status;
      },
      loadTop() {
        let that = this;
        console.log("下拉刷新");
        that.directioryNumber = 1;
        that.ajaxAbout("down")
      },
      handlebottomChange(status) {
        this.bottomStatus = status;
      },
      loadbottom() {
        console.log("上拉加载");
        let that = this;
        that.ajaxAbout("up")
      },
      ajaxAbout(updown){
        let that = this;
        if(updown=="up"){
          that.directioryNumber++
        }
        Vue.GetLinkers(updown,that.directioryNumber, 10, "", function (e) {
          let Tlist = [];
          Indicator.close();
          console.log(that.directioryNumber);
          console.log("wwwwwwww" + e.rows.length);
          console.log(e.rows.length <10 ? true : false)
          e.rows.map(function (item) {
            Tlist.push(item);
          })
          if(updown=="down"){
            that.list = [];
            that.list = that.list.concat(Tlist);
            that.allLoaded = e.rows.length < 10 ? true : false;
            console.log(that.allLoaded)
            that.$refs.loadmore.onTopLoaded();
          }else{
          that.list = that.list.concat(Tlist);
          console.log(that.list)
//          that.directioryNumber++;
          that.allLoaded = e.rows.length <10 ? true : false;
          that.$refs.loadmore.onBottomLoaded();
          }
        })
      },
      deletLinker(i, id){
        let that = this;
        console.log(i + "|||" + id)
         Vue.removeLinkers(id,function(e){
         Toast('操作成功');
         that.list.splice(i,1);
         })
      },
    },
    mounted(){
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      $("#tongxunlu").css({overflow: "scroll"});
      this.loadTop()
//      612
      $("#about").css({
        minHeight: $(window).height() - 105
      })


    },

  };
</script>
<style>
  #tongxunlu {
  width: calc(100% - 16px);
  border-sizing: border-box;
  border: 8px solid #EDEDED;
  /*overflow: scroll;*/
  }

  #about .aboutMeMsg {
    border-sizing: border-box;
    border-bottom: 8px solid #EDEDED;
  }
  #about .aboutMeMsg:nth-child(1){
    margin-top: 8px;
  }
  #about .mint-cell-title {
    display: none;
  }

  #about .mint-cell-value {
    width: 100%
  }
  #about .fa-user-circle-o{
    color:#0434B2
  }
  #about .mint-cell-wrapper {

    padding: 5px 0;
  }

  #about .mint-cell-right {
    box-sizing: border-box;
  }

  #about .mint-cell-swipe-buttongroup {
    background: #EDEDED;
  }

  #about .mint-cell-swipe-button {
    height: 100%;
    display: flex;
    margin-left: 4px;
    background: white;
    text-align: center;
    align-items: center
  }

  #about .fa {
    width: 25%;
    margin-left: 3%;
  }

  #about ul {
    width: 70%;
    margin-left: 2%;
  }

  #about ul li {
    list-style: none;
    height: 24px;
    line-height: 24px;
    text-align: left;
    display: flex;
  }

  #about ul li span {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 24px;
    line-height: 24px;
    margin-left: 10px
  }

  #about ul li span:nth-child(1) {
    width: 30%;
  }

  #about ul li span:nth-child(2) {
    width: 60%;
  }
</style>
