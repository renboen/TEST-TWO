import $ from "jquery"
import Vue from 'vue'
import {Toast} from 'mint-ui';


//测试环境
// window.baseUrl = "https://apigatewayqa.sgmlink.com:3223/service/visitormobile/"
// 发布环境
window.baseUrl = "https://apigatewayqa.sgmlink.com:13101/service/visitormobile/"
function PlusReady(value) {
  this.Ok = Boolean(value);
  return this.Ok;
}
PlusReady.prototype.setReady = function (newValue, cb) {
  if (typeof newValue == "boolean" && this.Ok != newValue) {
    this.Ok = newValue;
    cb(newValue)
  }
};
// plusready  false 不自动触发plusready true 自动触发
let plusReady = new PlusReady(false);
export default {
  install(Vue, Opt) {
    Vue.PlusReady = function (cb) {
      if (!plusReady.Ok) {
        document.addEventListener("plusready", function () {
          plusReady.setReady(true, function (newValue) {
            console.log(plusReady.Ok);
            if (plusReady.Ok == true) {
              cb()
            }
          });
        })
      } else {
        cb()
      }

    };

    Vue.getWaitCheckNum=function (success) {
      $.ajax({
        type:"get",
        url:baseUrl + "api/visit/01/getVerifyNumber",
        data: {
          "token": localStorage.token,
          "uid": localStorage.id
        },
        success: success
      })
    };


    Vue.AddInvite = function (data, beforeSend, success) {
      //发起预约接口
      $.ajax({
        type: "post",
        url: baseUrl + "api/visit/01/invite",
        async: true,
        dataType: "json",
        data: data,
        beforeSend: beforeSend,
        success: success
      })

    };
    Vue.GetDoor = function (success) {
      $.ajax({
        type: "post",
        url: baseUrl + "api/branch/01/viewAll",
        async: true,
        dataType: "json",
        data: {
          "token": localStorage.token,
          "uid": localStorage.id
        },
        success: success
      });
    };
    Vue.GetSearchId = function (success) {
      // 搜索
      $.ajax({
        type: "post",
        url: baseUrl + "api/admin/01/searchChecker",
        async: true,
        dataType: "json",
        data: {
          "token": localStorage.token,
          "uid": localStorage.id,
          "pageNumber": 1,
          "pageSize": 999
        },
        success: success,
      });

    };
    Vue.GetLogin = function (account) {
      //登录接口
      // let workTime = 19 * 3600 * 1000;
      // let nowTime = new Date().getTime();
      // let oldTime = localStorage.getItem(account + "oldTime") || new Date().getTime();
      // localStorage.setItem(account + "oldTime", oldTime);
      // if (nowTime - oldTime > workTime) {
      $.ajax({
        type: "post",
        url: baseUrl + "api/admin/01/login",
        async: true,
        dataType: "json",
        data: {
          "account": account
        },
        success: function (e) {
          localStorage.token = e.data.token;
          localStorage.id = e.data.id;
          localStorage.account = account;
          localStorage.userName = e.data.userName;
          localStorage.deptname = e.data.deptname;


          console.log(localStorage.token + "uuuu")
          console.log(localStorage.id)
          console.log(localStorage.account)
          console.log(localStorage.userName)
          console.log(localStorage.deptname)

        },
        error: function (e, err) {
          if (e.status != "success") {
            Toast({
              message: JSON.stringify(e) + err,
              duration: 1000
            });
          }
        }
      });

      // }
    };
    Vue.GetLinkers = function (updown, pageNumber, pagsize, searchKeyWord, success) {

      //获得通讯录借口
      $.ajax({
        type: "post",
        url: baseUrl + "api/addrbook/01/getLinkers",
        async: true,
        dataType: "json",
        data: {
          "token": localStorage.token,
          "uid": localStorage.id,
          "name": searchKeyWord,
          "pageSize": pagsize,
          "pageNumber": pageNumber
        },
        success: success
      });

    };
    Vue.removeLinkers = function removeLinkers(id, success) {
      $.ajax({
        type: "post",
        url: baseUrl + "api/addrbook/01/delLinkers",
        async: true,
        dataType: "json",
        data: {
          "token": localStorage.token,
          "uid": localStorage.id,
          "users": id
        },
        success: success,
      })
    }
    Vue.GetVisitReplies = function (success) {
      //待审核信息查询接口
      $.ajax({
        type: "post",
        url: baseUrl + "api/visit/01/queryVisitReplies",
        async: true,
        dataType: "json",
        data: {
          "token": localStorage.token,
          "uid": localStorage.id,
          "pageSize": 999
        },
        success: success,
        error: function (err) {
          Toast({
            message:  err,
            duration: 1000
          });
        }
      })
    };

    Vue.UpdateStatus = function (index, id, status, success) {
      // 点击同意和拒绝1,2
      //预约信息id
      $.ajax({
        type: "post",
        url: baseUrl + "api/visit/01/updateCheckStatus",
        async: true,
        dataType: "json",
        data: {
          "token": localStorage.token,
          "uid": localStorage.id,
          "id": id,
          "checkStatus": status
        },
        success: success,
      });

    };

    Vue.QueryVisit = function (visitNo, success, error) {
      //待审核信息里面的随访人随访物品接口
      // visitNo预约单号
      $.ajax({
        type: "post",
        url: baseUrl + "api/visit/01/queryVisit",
        async: false,
        dataType: "json",
        data: {
          "token": localStorage.token,
          "uid": localStorage.id,
          "visitNo": visitNo
        },
        success: success,
        error: error,
      })

    };
    Vue.GetCardType=function(success){
      $.ajax({
          type: "post",
          url: baseUrl + "/api/param/01/getCertTypes",
          async: true,
          dataType: "json",
          data: {
            "token": localStorage.token,
          },
        success:success
      })
    },

    Vue.GetMyReservation = function (pagNum, success) {
      $.ajax({
        type: "post",
        url: baseUrl + "api/visit/01/query",
        async: true,
        dataType: "json",
        data: {
          "token": localStorage.token,
          "uid": localStorage.id,
          "pageSize": 9,
          "pageNumber": pagNum,
          "userId": localStorage.id,
          "monthBefore": 3
        },
        success: success,
        error: function (err) {

        },
      });
    };

    Vue.QueryVisit2 = function (visitNo, success, error) {
      $.ajax({
        type: "post",
        url: baseUrl + "api/visit/01/queryVisit",
        async: true,
        dataType: "json",
        data: {
          "token": localStorage.token,
          "uid": localStorage.id,
          "visitNo": visitNo
        },
        success: success,
        error: error,
      })

    };

    Vue.GetLongGuest = function (success) {
      $.ajax({
        type: "get",
        url: baseUrl + "api/visit/01/querySupplies",
        async: true,
        dataType: "json",
        data: {
          "token": localStorage.token,
          "uid": localStorage.id,
        },
        success: success,
      })
    }
  }
}
