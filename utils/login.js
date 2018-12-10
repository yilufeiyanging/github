const app=getApp();
import RequirtUtil from './requirtUtil.js'
var checkAuth=function(){//检查是否授权
      var that=this;
  wx.login({
    success: res => {
      //console.log(res.code);
      RequirtUtil.requireUrl({
        url:'Auth',
        data:{
          code:res.code
        },
        success: callBackAuth
      });
      
    }
  })
}
var getUserInfo = function (session_key){//获取用户信息
    var that=this;
      wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                      wx.getUserInfo({
                        success: res => {
                            RequirtUtil.requireUrl({
                              url:'UpdateUserInfo',
                                data:{
                                  userInfo: res.userInfo,
                                  user_id: app.globalData.userId,
                                  encryptedData: res.encryptedData,
                                  iv: res.iv,
                                  session_key: session_key
                                },
                              success: callBackUserInfo
                            });
                        }
                      })
               
              }else{//未授权
              }
            }
      })
}


var callBackAuth=function(res){//网络回调
   //console.log("auth:"+res);
  var userId = res.info.user_id;
  app.globalData.userId = userId;
  wx.setStorageSync('userId', userId);
  getUserInfo(res.info.session_key);
  

}
var callBackUserInfo = function (res) {//网络回调
  console.log(res);
  app.globalData.userName = res.info.nick_name;
  wx.setStorageSync('userName', res.info.nick_name);
  wx.setStorageSync('userImg', res.info.avatar_img);
  if (wx.getStorageSync('userName') != '' && wx.getStorageSync('userName') != null) {
    wx.navigateTo({
      url: '../showImg/showImg'
    })
  }
}


var login=function(){//登录
    var userId = wx.getStorageSync('userId');
  var userName = wx.getStorageSync('userName');
  if ((userId == null || userId == "") || (userName == null || userName == "")){
      var result=checkAuth();
    }else{
      app.globalData.userId=userId;
    app.globalData.userName = userName;
    }
}
export default{
  login: login,
  callBackAuth: callBackAuth,
  callBackUserInfo: callBackUserInfo,
}