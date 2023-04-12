// app.js
App({
  globalData:{
    // 默认值
    screenWidth:375,
    screenHeight:667,
    // 歌曲详情页面的状态栏高度
    statusHeight:20,
    // 歌曲详情内容的高度
    contentHeight:500
  
  },
  onLaunch(){
    // 1.获取设备的信息
    // 获取屏幕尺寸
wx.getSystemInfo({
  success:(res)=>{
    this.globalData.screenWidth=res.screenWidth
    this.globalData.screenHeight=res.screenHeight
    this.globalData.screenHeight=res.statusBarHeight
    this.globalData.contentHeight=res.screenHeight - res.statusBarHeight - 44
  }
})
  }
})
