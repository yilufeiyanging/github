const app = getApp()
import ImgUtil from '../../utils/imgUtil.js'
import RequirtUtil from '../../utils/requirtUtil.js'
import Login from '../../utils/login.js'
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btn:false,
    cardId: '',
    isShare: false,
    detail: '',
    isDefault: 1,
    zj: 0,
    info: {
      bigImg: '/images/photo.png',
      userimg: '',
      postmark: 'https://time.sdrhup.com//static/image/postmark.png',
      detail0: '1',
      detail1: '2',
      detail2: '3',
      detail3: '4',
      receive_name: '',
      name: '',
      city: '中国',
      add_y: '',
      add_m: '',
      add_d: '',
       //画布加载完毕zj=1
    }
    
  },
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    var time = util.formatTime(new Date());
    var dateList = time.split("/");
    var arr = []
    for (var i in dateList) {
      arr = arr.concat(dateList[i]);
    }
    this.setData({
      'info.add_y': arr[0],
      'info.add_m': arr[1] + '/',
      'info.add_d': arr[2]
    });
    if (!options.cardId == '') {
      
      var cardId = options.cardId;
      this.setData({
        cardId: cardId
      }); 
      this.initViews1();
    } else {
      this.initView();
      //this.getCity();
    }
  },
  onShow: function() {
    var that = this
    wx.getUserInfo({
      success: function(res) {
        var userimg = 'userInfo.avatarUrl'; //获取头像
        that.setData({
          'info.userimg': res.userInfo.avatarUrl,
        })
      }
    })
  },
  bjnr: function(res) {
    var that = this
    var data = JSON.stringify(this.data.info); //对象转为json
    wx.reLaunch({
      url: '../write/write?data=' + data
    })
  },
  changeTemplate: function(res) {
     var that = this;
    if(!this.data.cardId==''){
      this.setData({
        isDefault: 0,
        cardId:''
      })
       that.initView();
    }else{
      this.setData({
        btn: true
      })
      wx.showLoading({
        title: '加载中',
      })
      this.setData({
        isDefault: 0,
      });
      that.initView();
    }
  
   
  },

  callbackTemplate: function(res) {
   
    var bigImg = res.info.image_url;
    var detail0 = res.info.content1;
    var detail1 = res.info.content2;
    var detail2 = res.info.content3;
    var detail3 = res.info.content4;
    this.setData({
      'info.bigImg': bigImg,
      'info.detail0': detail0,
      'info.detail1': detail1,
      'info.detail2': detail2,
      'info.detail3': detail3,
    });
    this.callbackView(this.data);
  },
  initView: function (e) {
    var that = this;
    RequirtUtil.requireUrl({
      url: 'GetTemplate',
      data: {
        'type': that.data.isDefault,
      },
      success: this.callbackTemplate
    });
  },
  changeMb: function (options) {
    this.setData({
      btn: true
    })
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.mb=(++app.globalData.mb)
    var that=this;
    if (!this.data.cardId == '') {
      this.initViews1(that.data); 
    } else {
      this.callbackView(that.data);
    }
  },
  callbackView1: function (res) { //获取明信片回调
    var that = this;
    //console.log(res)
    ImgUtil.downloadImg({
      url0: res.info.image,
      url1: res.info.postmark,
      success: this.callbackDownload1
    });
    this.setData({
      detail: res.info,
    });
  },
  callbackDownload1: function (res) { //下载图片回调
    this.drawCanvas1(this.data.detail, res.img0, res.img1);
  },
  initViews1: function(e) {
    RequirtUtil.requireUrl({
      url: 'GetPostcards',
      data: {
        id: this.data.cardId
      },
      success: this.callbackView1
    });
  },
  // write: function() { //点击写信按钮
  //   if (app.globalData.userName != '' && app.globalData.userName != null) {
  //     wx.navigateTo({
  //       url: '../write/write',
  //     })
  //   }
  // },
  // callbackUserInfo: function(res) { //授权后的回调
  //   if (app.globalData.userName == '' || app.globalData.userName == null) {
  //     Login.login();
  //   }
  // },
  callbackView: function(res) { //获取明信片回调
    var that = this;
    ImgUtil.downloadImg({
      url0: res.info.bigImg,
      url1: res.info.postmark,
      success: this.callbackDownload
    })
    this.setData({
      detail: res,
    });
    //console.log(res)
  },

  callbackDownload: function(res) { //下载图片回调
    this.drawCanvas(this.data.info, res.img0, res.img1);
  },

  drawCanvas: function(res, img0, img1) { //绘制
    console.log(res);
    var that = this;
    ImgUtil.drawCanvas({
      other: this,
      id: "canvas_id",
      receiver: res.receive_name,
      name: app.globalData.userName,
      userimg: res.userimg,
      city: res.city,
      bigImg: img0,
      smallImg: img1,
      add_y: res.add_y,
      add_m: res.add_m,
      add_d: res.add_d,
      detail0: res.detail0,
      detail1: res.detail1,
      detail2: res.detail2,
      detail3: res.detail3,
    });
    wx.hideLoading();
    this.setData({
      'info.name': app.globalData.userName,
      'info. add_y': res.add_y,
      'info. add_m': res.add_m,
      'info. add_d': res.add_d,
      zj: 1, //画布加载完毕zj=1
      btn: false
    })

  },
  drawCanvas1: function(res, img0, img1) { //绘制
    var that = this;
    ImgUtil.drawCanvas({
      other: this,
      id: "canvas_id",
      receiver: res.receive_name,
      name: app.globalData.userName,
      userimg: this.data.info.userimg,
      city: res.location,
      bigImg: img0,
      smallImg: img1,
      add_y: this.data.info.add_y,
      add_m: this.data.info.add_m,
      add_d: this.data.info.add_d,
      detail0: res.content1,
      detail1: res.content2,
      detail2: res.content3,
      detail3: res.content4,
    });
    wx.hideLoading();
     this.setData({
      id: "canvas_id",
      'info.receiver': res.receive_name,
      'info.name': app.globalData.userName,
      'info.userimg': this.data.info.userimg,
      'info.city': res.location,
      'info.bigImg': img0,
      'info.smallImg': img1,
      'info.add_y': this.data.info.add_y,
      'info. add_m': this.data.info.add_m,
      'info. add_d': this.data.info.add_d,
      'info.detail0': res.content1,
      'info.detail1': res.content2,
      'info.detail2': res.content3,
      'info.detail3': res.content4,
       zj: 1, //画布加载完毕zj=1
       btn: false
     })
  },
  preserveImg: function() { //保存图片
  wx.showLoading({
    title: '加载中',
  })
    ImgUtil.preserveImg(this);
  },
  // onShareAppMessage: function() {
  //   var that = this;
  //   return {
  //     title: '叮咚~   收到一张明信片，打开看看吧',
  //     path: 'pages/showImg/showImg?cardId=' + that.data.cardId + "&isShare=true",
  //   }
  // },
})