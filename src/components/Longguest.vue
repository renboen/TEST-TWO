<template>
  <div style="background: #EDEDED">
    <div class="longguest" style="background: #EDEDED">
      <ul v-for="item in list" style="background: white">
        <li>
          <div>供应商公司名称</div>
          <div>{{item.name}}</div>
        </li>
        <li>
          <div>部门</div>
          <div>{{item.dept}}</div>
        </li>
        <li>
          <div>来访原因</div>
          <div>{{item.visitReason}}</div>
        </li>
        <li>
          <div>联系人</div>
          <div>{{item.contactor}}</div>
        </li>
        <li>
          <div>联系电话</div>
          <div>{{item.phone}}</div>
        </li>
        <li>
          <div>申请人</div>
          <div>{{item.user.userName | stringSplice}}</div>
        </li>
        <li>
          <div>审批人</div>
          <div>{{item.checker.userName | stringSplice}}</div>
        </li>
        <li>
          <div>状态</div>
          <div>{{item.status | changeStatus}}</div>
        </li>
      </ul>
      <div v-show="nodata" style="width:100%;height:35px;text-align:center;line-height:35px; background: #EDEDED;">
        没有更多数据
      </div>


    </div>
  </div>
</template>
<script>
  import $ from "jquery"
  import Vue from 'vue'
  export default{
    data(){
      return {
        list: [],
        nodata:false
      }
    },
    filters: {
      changeStatus(e){
        switch (e) {
          case "0":
            return e = "失效"
            break;
          case "1":
            return e = "有效"
            break;
          case "2":
            return e = "新增审核中"
            break;
          case "3":
            return e = "撤销审核中"
            break;
        }

      },
      stringSplice(e){
        return e.split("(")[0]
      }
    },
    mounted(){
      let that = this;
      $(".longguest").css({
        minHeight: $(window).height() - 105
      })
      Vue.GetLongGuest(function (e) {
        console.log("长期供应商")
        console.log(e)
        that.list = e.rows;
        if(that.list.length==0){
          that.nodata=true
        }
        window.Wlongguest=that.list;
      })
    }
  }
</script>
<style scoped>
  div > div {
    /*width:calc(100% - 16px);*/
    /*margin-left: 8px;*/
    /*background: black;*/
  }
  .longguest{
    border-left: 8px solid #EDEDED;
    border-right: 8px solid #EDEDED;
    /*border-bottom: 4px solid #EDEDED;*/
  }
  .longguest:first-child{
    margin-top: -8px;
  }
  div > div > ul {
    background: white;
    width: 100%;
    list-style: none;
    /*margin-top: 8px;*/
    /*border-left: 8px solid #EDEDED;*/
    /*border-right: 8px solid #EDEDED;*/
    /*border-bottom: 4px solid #EDEDED;*/
    border-top: 8px solid #EDEDED;
    font-size: 14px;
    box-sizing: border-box;
    padding: 5px;
  }

  ul:nth-child(1) {
    margin-top: 8px;
  }

  ul > li {
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
  }

</style>
