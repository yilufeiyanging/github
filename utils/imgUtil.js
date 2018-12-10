const app = getApp()
var preserveImg = function(other) { //保存图片other
  wx.canvasToTempFilePath({
    canvasId: "canvas_id",
    fileType: "jpg",
    quality: 1,
    success: function(res) {
      wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success: function(res) {
          wx.showToast({
            title: '保存成功',
            icon: 'none',
          })
        },
        fail: function() {
          wx.showToast({
            title: '保存失败',
            icon: 'none',
          })
        }
      })
    }
  }, other);
}

function downLoadImgs(data) {

  wx.downloadFile({
    url: wx.getStorageSync('userImg'), //仅为示例，并非真实的资源
    success(res) {
      // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
      if (res.statusCode === 200) {
        
        data.userimg = res.tempFilePath;
        wx.createSelectorQuery().select('#' + data.id).fields({ //获得canvas的宽高
          size: true
        },
          function (res) {
            
        
            app.globalData.mb = app.globalData.mb % 3;
            if (app.globalData.mb == 0) {
              canvas(res.width, res.height, data);
            } else if (app.globalData.mb == 1) {
              canvas1(res.width, res.height, data);
            } else if (app.globalData.mb == 2) {
              canvas2(res.width, res.height, data);
            }
          }).exec();
        
      }
    }
  })
}


var img0 = '';
var img1 = '';
var downloadImg = function(data) {
  var url = '';
  if (img0 == '') {
    url = data.url0;
  } else {
    url = data.url1;
  }
  wx.downloadFile({
    url: url,
    success: function(res) {
      if (res.statusCode == 200) {
        if (img0 == '') {
          img0 = res.tempFilePath;
          downloadImg(data);
        } else {
          img1 = res.tempFilePath;
          data.success({
            img0: img0,
            img1: img1,
          });
          img0 = "";
          img1 = "";
        }
      }
    }
  })
}

var download = function(url) {
  wx.downloadFile({
    url: url,
    success: function(res) {
      if (res.statusCode == 200) {
        var img0 = res.tempFilePath;
      }
    }
  })
}
var drawCanvas = function(data) { //绘制canvas,{other,id}\
  downLoadImgs(data);

}
var canvas = function(width, height, data) { //data{id,other,bigImg,smallImg,time,name,city,detail0,detail1,detail2,detail3}
  var marginLeft = 10;
  var marginTop = 10;
  var fontSize = 14;
  var smallImgWidth = 60;
  var smallImgHeight = 78;
  var userimgw = 40;
  var userimgh = 40;
  var id = width - 2 * marginLeft + 20;
  var gjc = width - 2 * marginLeft + 25;
  var gjcHeight = width - 2 * marginLeft + 60;
  var index = 0;
  var detailSigleHeight = 21;
  var content = wx.createCanvasContext(data.id, data.other);
  content.setFillStyle('#fff');
  content.fillRect(0, 0, width, height);
  if (width <= 247 && height <= 405) {
    content.drawImage(data.bigImg, marginLeft + 3, marginTop + 3, width - 2 * marginLeft - 6, width - 2 * marginLeft - 6);
    content.drawImage(data.smallImg, width - smallImgWidth - marginLeft * 1.5, height - smallImgHeight - 5, smallImgWidth, smallImgHeight);
  } else if (width <= 290 && height <= 475) {
    content.drawImage(data.bigImg, marginLeft + 3, marginTop + 3, width - 2 * marginLeft - 6, width - 2 * marginLeft - 6);
    content.drawImage(data.smallImg, width - smallImgWidth - marginLeft * 1.5, height - smallImgHeight - 5, smallImgWidth, smallImgHeight);
  } else {
    content.drawImage(data.bigImg, marginLeft + 3, marginTop + 3, width - 2 * marginLeft - 6, width - 2 * marginLeft - 6);
    content.drawImage(data.smallImg, width - smallImgWidth - marginLeft * 1.5, height - smallImgHeight - 5, smallImgWidth, smallImgHeight);
  }


  content.setFillStyle('#666666');
  content.setFontSize(fontSize);
  content.setTextAlign('left');
  if (width <= 247 && height <= 405) {
    var zt = 24;
    var zt1 = 12;
    var sh = 2;
    var detailHeight = width - 2 * marginLeft + 55;
  } else if (width <= 290 && height <= 475) {
    var zt = 28;
    var zt1 = 14;
    var sh = 2;
    var detailHeight = width - 2 * marginLeft + 75;
  } else {
    var zt = 28;
    var zt1 = 14;
    var sh = 2;
    var detailHeight = width - 2 * marginLeft + 90;
  }
  if (data.detail0 != '' && data.detail0 != null) {
    content.setFontSize(zt);
    content.setFillStyle('black');
    //content.setShadow(0,9,0,'rgba(0, 0, 0, 0.1)')
    content.fillText(data.detail0, width - smallImgWidth - marginLeft * sh, gjc + detailSigleHeight);
    index++;
  }
  //content.setShadow(0, 0, 0, 'gray')
  if (data.detail1 != '' && data.detail1 != null) {
    content.setFontSize(zt1);
    content.setFillStyle('#666666');
    content.fillText(data.detail1, marginLeft * sh, detailHeight + detailSigleHeight * index);
    index++;
  }
  if (data.detail2 != '' && data.detail2 != null) {
    content.setFontSize(zt1);
    content.setFillStyle('#666666');
    content.fillText(data.detail2, marginLeft * sh, detailHeight + detailSigleHeight * index);
    index++;
  }
  if (data.detail3 != '' && data.detail3 != null) {
    content.setFontSize(zt1);
    content.setFillStyle('#666666');
    content.fillText(data.detail3, marginLeft * sh, detailHeight + detailSigleHeight * index);
  }
  content.setFillStyle('#999');
  content.setFontSize(12);
  content.setFillStyle('black');
  if (width <= 247 && height <= 405) {
    var nm = 6.5
  } else if (width <= 290 && height <= 475) {
    var nm = 7.5
  } else {
    var nm = 7.5
  }
  content.fillText(" " + data.name, marginLeft * nm, id + detailSigleHeight);
  content.setFontSize(16);
  content.setFillStyle('black');
  content.fillText(data.add_y, marginLeft * 2.1, height - 10);
  content.setLineWidth(0.9)
  content.setFontSize(9);
  content.setFillStyle('#bdbdbd');
  if (width <= 247 && height <= 405) {
    content.fillText("—————", marginLeft * 1.7, height - 22.5);
  } else if (width <= 290 && height <= 475) {
    content.fillText("—————", marginLeft * 1.7, height - 22.5);
  } else {
    content.fillText("—————", marginLeft * 1.8, height - 22.5);
  }

  content.setFontSize(14);


  var headUrl = wx.getStorageSync(data.userimg); //下面用canvas绘制头像 
  var wxSys = wx.getSystemInfoSync();
  var screenScale = wxSys.screenWidth * 2 / 750;
  content.save(); // 保存当前ctx的状态 
  content.arc(screenScale * 36, screenScale * 310, screenScale * 22, 0, 2 * Math.PI, false);
  content.strokeStyle = '#e3e7e8';
  content.stroke();
  content.clip(); //裁剪上面的圆形 

    content.drawImage(data.userimg, screenScale * 14, screenScale * 287, screenScale * 44, screenScale * 44, );

  content.restore(); // 还原状态

  content.setFillStyle('black');
  //content.drawImage(data.userimg, width - userimgw - marginLeft * 23, height - userimgh - 150, userimgw, userimgh);
  content.fillText(data.add_m, marginLeft * 2.1, height - 30);
  content.fillText(data.add_d, marginLeft * 4.4, height - 30);

  content.draw();
}
var canvas1 = function(width, height, data) { //data{id,other,bigImg,smallImg,time,name,city,detail0,detail1,detail2,detail3}
  var marginLeft = 10;
  var marginTop = 10;
  var fontSize = 14;
  var smallImgWidth = 60;
  var smallImgHeight = 78;
  var gjw = 60;
  var gjh = 270;
  var userimgw = 40;
  var userimgh = 40;
  var gjcHeight = width - 2 * marginLeft - 234;
  var detailHeight = width - 2 * marginLeft - 5;
  var index = 0;
  var detailSigleHeight = 51;


  var content = wx.createCanvasContext(data.id, data.other);



  content.setFillStyle('#fff');
  content.fillRect(0, 0, width, height);
  if (width <= 247 && height <= 405) {
    var tp = 12
    content.drawImage(data.bigImg, marginLeft + 3, marginTop * tp, width - 2 * marginLeft - 6, width - 2 * marginLeft - 6);

    content.drawImage(data.smallImg, width - smallImgWidth - marginLeft / 1.5, height - smallImgHeight + 5, smallImgWidth, smallImgHeight);
  } else if (width <= 290 && height <= 475) { //画布
    var tp = 14
    content.drawImage(data.bigImg, marginLeft + 3, marginTop * tp, width - 2 * marginLeft - 6, width - 2 * marginLeft - 6);
    content.drawImage(data.smallImg, width - smallImgWidth - marginLeft / 1.5, height - smallImgHeight - 5, smallImgWidth, smallImgHeight);
  } else { //
    var tp = 14
    content.drawImage(data.bigImg, marginLeft + 3, marginTop * tp, width - 2 * marginLeft - 6, width - 2 * marginLeft - 6);
    content.drawImage(data.smallImg, width - smallImgWidth - marginLeft / 0.7, height - smallImgHeight - 5, smallImgWidth, smallImgHeight);
  }

  content.setFillStyle('#666666');
  content.setFontSize(fontSize);
  content.setTextAlign('left');
  if (width <= 247 && height <= 405) {
    var zt = 24;
    var zt1 = 12;
    var sh = 2;
    var ys = 7
    var ys1 = 9
    var ys2 = 11
    var detailHeight = width - 2 * marginLeft + 55;
  } else if (width <= 290 && height <= 475) {
    var zt = 28;
    var zt1 = 14;
    var sh = 2;
    var ys = 9
    var ys1 = 11
    var ys2 = 13
    var detailHeight = width - 2 * marginLeft + 75;
  } else {
    var zt = 28;
    var zt1 = 14;
    var sh = 2;
    var ys = 9
    var ys1 = 11
    var ys2 = 13
    var detailHeight = width - 2 * marginLeft + 80;
  }
  if (data.detail0 != '' && data.detail0 != null) {
    content.setFontSize(zt);
    content.setFillStyle('black');
    //content.setShadow(5, 2, 5, 'gray')
    content.fillText(data.detail0, width - smallImgWidth - marginLeft * sh, marginTop * 4);
  }
  //content.setShadow(0, 0, 0, 'gray')
  if (data.detail1 != '' && data.detail1 != null) {
    content.setFontSize(zt1);
    content.setFillStyle('#666666');
    content.fillText(data.detail1, marginLeft * sh, marginTop * ys);
  }
  if (data.detail2 != '' && data.detail2 != null) {
    content.setFontSize(zt1);
    content.setFillStyle('#666666');
    content.fillText(data.detail2, marginLeft * sh, marginTop * ys1)
  };
  if (data.detail3 != '' && data.detail3 != null) {
    content.setFontSize(14);
    content.setFillStyle('#666666');
    content.fillText(data.detail3, marginLeft * 2, marginTop * ys2)
  }
  content.setFillStyle('#999');
  content.setFontSize(12);
  content.setFillStyle('black');
  if (width <= 247 && height <= 405) {
    var nm = 6.5
  } else if (width <= 290 && height <= 475) {
    var nm = 7.5
  } else {
    var nm = 7.5
  }
  content.fillText(" " + data.name, marginLeft * nm, marginTop * 4);
  content.setFontSize(16);
  content.setFillStyle('black');
  content.fillText(data.add_y, marginLeft * 2.1, height - 10);
  content.setLineWidth(0.9)
  content.setFontSize(9);
  content.setFillStyle('#bdbdbd');
  if (width <= 247 && height <= 405) {
    content.fillText("—————", marginLeft * 1.5, height - 22.5);
  } else if (width <= 290 && height <= 475) {
    content.fillText("—————", marginLeft * 1.7, height - 22.5);
  } else {
    content.fillText("—————", marginLeft * 1.7, height - 22.5);
  }
  content.setFontSize(14);


  //content.arc(screenScale * 34, screenScale * 33, screenScale * 22, 0, 2 * Math.PI, false);

  var headUrl = wx.getStorageSync(data.userimg); //下面用canvas绘制头像 
  var wxSys = wx.getSystemInfoSync();
  var screenScale = wxSys.screenWidth * 2 / 750;
  content.save(); // 保存当前ctx的状态 
  content.arc(screenScale * 33, screenScale * 30, screenScale * 22, 0, 2 * Math.PI, false);
  content.strokeStyle = '#e3e7e8';
  content.stroke();
  content.clip(); //裁剪上面的圆形 

    content.drawImage(data.userimg, screenScale * 11, screenScale * 7, screenScale * 44, screenScale * 44, );

  content.restore(); // 还原状态

  content.setFillStyle('black');
  content.fillText(data.add_m, marginLeft * 2.1, height - 30);
  content.fillText(data.add_d, marginLeft * 4.4, height - 30);

  //content.drawImage(data.userimg, width - userimgw - marginLeft * 23, height - userimgh - 150, userimgw, userimgh);
  content.draw();
}
var canvas2 = function(width, height, data) { //data{id,other,bigImg,smallImg,time,name,city,detail0,detail1,detail2,detail3}
  var marginLeft = 10;
  var marginTop = 10;
  var fontSize = 14;
  var smallImgWidth = 60;
  var smallImgHeight = 78;
  var userimgw = 40;
  var userimgh = 40;
  var gjcHeight = width - 2 * marginLeft - 224;
  var detailHeight = width - 2 * marginLeft - 204;
  var index = 0;
  var detailSigleHeight = 21;

  var gjc = width - 2 * marginLeft + 25;
  var content = wx.createCanvasContext(data.id, data.other);



  content.setFillStyle('#fff');
  content.fillRect(0, 0, width, height);
  if (width <= 247 && height <= 405) {
    var tp = 12
    content.drawImage(data.bigImg, marginLeft + 3, width - marginLeft * 7, marginTop * 22, width - 2 * marginLeft - 6);
    content.drawImage(data.smallImg, marginLeft * 18, height - smallImgHeight - 230, smallImgWidth, smallImgHeight);
  } else if (width <= 290 && height <= 475) { //画布
    var tp = 14
    content.drawImage(data.bigImg, marginLeft + 3, width - marginLeft * 8, marginTop * 26.5, width - 2 * marginLeft - 6);
    content.drawImage(data.smallImg, width - smallImgWidth - marginLeft / 0.7, height - smallImgHeight - 270, smallImgWidth, smallImgHeight);
  } else { //
    content.drawImage(data.bigImg, marginLeft + 3, width - marginLeft * 10, marginTop * 29.5, width - 2 * marginLeft - 6);
    content.drawImage(data.smallImg, width - smallImgWidth - marginLeft * 1.5, height - smallImgHeight - 0, smallImgWidth, smallImgHeight);
  }


  content.setFillStyle('#666666');
  content.setFontSize(fontSize);
  content.setTextAlign('left');
  if (width <= 247 && height <= 405) {
    var zt = 24;
    var zt1 = 12;
    var sh = 2;
    var ys = 8
    var detailHeight = width - 2 * marginLeft + 55;
  } else if (width <= 290 && height <= 475) {
    var zt = 28;
    var zt1 = 14;
    var sh = 2;
    var ys = 10
    var detailHeight = width - 2 * marginLeft + 75;
  } else {
    var zt = 28;
    var zt1 = 14;
    var sh = 2;
    var ys = 10
    var detailHeight = width - 2 * marginLeft + 80;
  }
  if (data.detail0 != '' && data.detail0 != null) {
    content.setFontSize(zt);
    content.setFillStyle('black');
    //content.setShadow(5, 2, 5, 'gray')
    content.fillText(data.detail0, width - smallImgWidth - marginLeft * 4, marginTop * 4);
  }
  //content.setShadow(0, 0, 0, 'gray')
  if (data.detail1 != '' && data.detail1 != null) {
    content.setFontSize(zt1);
    content.setFillStyle('#666666');
    content.fillText(data.detail1, marginLeft * 2, marginTop * 7.5);
  }
  if (data.detail2 != '' && data.detail2 != null) {
    content.setFontSize(zt1);
    content.setFillStyle('#666666');
    content.fillText(data.detail2, marginLeft * 2, marginTop * 9.5);
  }
  if (data.detail3 != '' && data.detail3 != null) {
    content.setFontSize(14);
    content.setFillStyle('#666666');
    content.fillText(data.detail3, marginLeft * 2, marginTop * 11.5);
  }
  content.setFillStyle('#999');
  content.setFontSize(12);
  content.setFillStyle('black');
  if (width <= 247 && height <= 405) {
    var zty = 6.5;
  } else if (width <= 290 && height <= 475) {
    var zty = 7.2;
    var detailHeight = width - 2 * marginLeft + 75;
  } else {
    var zty = 7.2;
    var detailHeight = width - 2 * marginLeft + 80;
  }
  content.fillText(" " + data.name, marginLeft * zty, marginTop * 4);
  content.setFontSize(16);
  content.setFillStyle('black');
  if (width <= 247 && height <= 405) {
    var rq = 247

  } else if (width <= 290 && height <= 475) { //画布
    var rq = 270

  } else {
    var rq = 290

  }

  content.fillText(data.add_y, marginLeft * 2.1, height - width);
  content.setLineWidth(0.9)
  content.setFontSize(9);
  content.setFillStyle('#bdbdbd');
  if (width <= 247 && height <= 405) {
    content.fillText("—————", marginLeft * 1.5, height - 12 - rq);
  } else if (width <= 290 && height <= 475) {
    content.fillText("—————", marginLeft * 1.6, height - 12 - width);
  } else {
    content.fillText("—————", marginLeft * 2.1, height - 12 - width);
  }
  content.setFontSize(14);



  //content.arc(screenScale * 34, screenScale * 33, screenScale * 22, 0, 2 * Math.PI, false);
  var headUrl = wx.getStorageSync(data.userimg); //下面用canvas绘制头像 
  var wxSys = wx.getSystemInfoSync();
  var screenScale = wxSys.screenWidth * 2 / 750;
  content.save(); // 保存当前ctx的状态 
  content.arc(screenScale * 33, screenScale * 30, screenScale * 22, 0, 2 * Math.PI, false);
  content.strokeStyle = '#e3e7e8';
  content.stroke();
  content.clip(); //裁剪上面的圆形 

    content.drawImage(data.userimg, screenScale * 11, screenScale * 7, screenScale * 44, screenScale * 44, );
  
  content.restore(); // 还原状态

  content.setFillStyle('black');
  
  content.fillText(data.add_m, marginLeft * 2.1, height - 20 - width);
  content.fillText(data.add_d, marginLeft * 4.4, height - 20 - width);

  content.draw();
}

export default {
  preserveImg: preserveImg, //保存图片other
  drawCanvas: drawCanvas, //绘制canvas,{id,other,bigImg,smallImg,time,name,city,detail0,detail1,detail2,detail3}
  downloadImg: downloadImg,
}

/**
 * 
 * <canvas canvas-id='canvas_id' id='canvas_id'></canvas>
 * 
 */