const app = getApp()
import RequirtUtil from '../../utils/requirtUtil.js'
import Login from '../../utils/login.js'
Page({
  data: {
    bigImg: '/images/photo.png',
    detail0: '',
    detail1: '',
    detail2: '',
    detail3: '',
    recevier: "",
    name: '',
    city: '',
    //cardId:'',
    isDefault: 1,//是否推荐
    template_id: 0,
  },
  onLoad: function (res) {
    var data = JSON.parse(res.data);
    this.setData({
      detail0: data.detail0,
      detail1: data.detail1,
      detail2: data.detail2,
      detail3: data.detail3,
      name: data.name,
      recevier: data.receive_name,
      bigImg: data.bigImg,
      city: data.city,
      //cardId: data.cardId
    })
  },
  callbackUpdataImg: function (res) {//上传图片回调
    wx.navigateTo({
      url: '../showImg/showImg?cardId=' + res.Msg,
    })
  },
  chooseImage: function () {//选择图片
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var files = res.tempFiles;
        var bigImg = files[0].path;
        that.setData({
          bigImg: bigImg,
        });
      }
    });
  },
  bindRecever: function (res) {
    var that = this;
    var content = res.detail.value;
    switch (res.target.dataset.tap) {
      case "recevier":
        that.setData({
          recevier: content,
        });
        break;
      case "detail0":
        that.setData({
          detail0: content,
        });
        break;
      case "detail1":
        that.setData({
          detail1: content,
        });
        break;
      case "detail2":
        that.setData({
          detail2: content,
        });
        break;
      case "detail3":
        that.setData({
          detail3: content,
        });
        break;
      case "sender":
        that.setData({
          name: content,
        });
        break;
    }
  },
  callback: function (res) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var imgsrc = that.data.bigImg;
    var image = "";
    var image_url = "";
    if (imgsrc.includes('http://tmp') || imgsrc.includes('wxfile://tmp')) {
      image = imgsrc;
    } else {
      image_url = imgsrc;
    }
    var data = {
      //cardId:that
      user_id: app.globalData.userId,
      sign: that.data.name,
      receive_name: that.data.recevier,
      content1: that.data.detail0,
      content2: that.data.detail1,
      content3: that.data.detail2,
      content4: that.data.detail3,
      image: image,
      image_url: image_url,
      location: that.data.city
    }

    if (imgsrc.includes('http://tmp') || imgsrc.includes('wxfile://tmp')) {
      RequirtUtil.updataImg({
        url: 'MakePostcards',
        data: data,
        filePath: image,
        success: that.callbackUpdataImg,
      });
    } else {
      RequirtUtil.requireUrl({
        url: 'MakePostcards',
        data: data,
        success: that.callbackUpdataImg,
      });
    }
  }

})