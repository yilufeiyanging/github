var checkUpdate=function(){//检查更新是否有新版本
  const updateManager = wx.getUpdateManager();
  updateManager.onCheckForUpdate(function (res) {
    // 请求完新版本信息的回调
    // console.log("版本："+res.hasUpdate)
  })
  updateManager.onUpdateReady(function () {
    wx.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success: function (res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate()
        }
      }
    })
  })
}

export default{
    checkUpdate:checkUpdate,
}