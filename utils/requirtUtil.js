var baseUrl ="https://time.sdrhup.com/index/";
var showModalErro=function(){
    wx.showToast({
      title: '请检查网络后重试',
      icon: "none",
    })
}
var requireUrl=function(data){//网络请求
    wx.request({
      url: baseUrl+data.url,
      method:"post",
      header:{
        'content-type':'application/x-www-form-urlencoded; charset=UTF-8'
      },
      data:data.data,
      success:function(res){
        //console.log(data);
         //console.log("返回：" + JSON.stringify(res));
        if(res.data.errNo==1){
          data.success(res.data);
        }else{
          showModalErro();
          // console.log(data);
        }
      },
      fail:function(res){
        showModalErro();
      }
    })
}
var updataImg=function(data){
    wx.uploadFile({
      url: baseUrl+data.url,
      filePath: data.filePath,
      name: 'image',
      formData:data.data,
      success:function(res){
          var json=JSON.parse(res.data);
        if (json.errNo==1){
          data.success(json);
       }
      }
    })
}
export default{
  requireUrl: requireUrl,//网络请求{url,data,success}
  updataImg: updataImg,//上传图片data{url,data,success},
}

/**
 * 
 * import RequirtUtil from '../../utils/requirtUtil.js'
 * 
 * var that=this;
    var data={
        page_num:1,
        page_size:4
      };
    RequirtUtil.requireUrl({
      url: 'getList',
      data: data,
      success:success;
    });
  
  
  success:function(res){
      console.log(res);
  }
 * 
 * **/ 