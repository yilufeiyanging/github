//index.js
//获取应用实例
const app = getApp()
import RequirtUtil from '../../utils/requirtUtil.js'
import Login from '../../utils/login.js'
import UpdateApp from '../../utils/updateApp.js'

Page({
  data: {
  },
  onLoad: function () {
    Login.login();
   
    UpdateApp.checkUpdate();
  },
  write: function () {//点击写信按钮

    if (app.globalData.userName != '' && app.globalData.userName != null) {
      wx.navigateTo({
        url: '../showImg/showImg'
      })
    }
  },
  callbackUserInfo: function (res) {//授权后的回调
    if (app.globalData.userName == '' || app.globalData.userName == null) {
      // console.log(res);
      Login.login();
    }
  }

})
