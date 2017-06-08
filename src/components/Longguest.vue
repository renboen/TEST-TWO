<template>
  <div>
    <div>
      <ul v-for="item in list">
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

    </div>
  </div>
</template>
<script>
  import $ from "jquery"
  import Vue from 'vue'
  export default{
    data(){
      return {
        list: []
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
      Vue.GetLongGuest(function (e) {
        console.log(e)
        that.list = e.rows;
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

  div > div > ul {
    background: white;
    width: 100%;
    list-style: none;
    /*margin-top: 8px;*/
    border-left: 8px solid #EDEDED;
    border-right: 8px solid #EDEDED;
    border-bottom: 4px solid #EDEDED;
    border-top: 4px solid #EDEDED;
    box-sizing: border-box;
    padding: 5px;
  }

  ul:nth-child(1) {
    margin-top: -4px;
  }

  ul > li {
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
  }

</style>
