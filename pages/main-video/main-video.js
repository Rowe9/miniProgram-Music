// pages/main-video/main-video.js
// import {hyRequest} from "../../services/index"
import {getTopMV} from "../../services/video"
Page({
data:{
  videoList:[],
  offset:0,
  hasMore:true
},

onLoad(){
// 发送网络请求
this.fetchTopMV()
},

// 上拉获取数据
async fetchTopMV(){
  // 1.获取数据
  const res=await getTopMV(this.data.offset)

  // 2.将新的数据追加到旧的数据后面
  const newVideoList=[...this.data.videoList,...res.data]

  // 3.设置全新的数据
  this.setData({videoList:newVideoList})
  this.data.offset=this.data.videoList.length
  this.data.hasMore=res.hasMore


},

// 监听上拉和下拉的功能
onReachBottom(){
  // 判断是否有更多的数据,没有的话return，不导致报错
if(!this.data.hasMore) return
// 有更多的数据,网络请求
 this.fetchTopMV()
},

// 下拉刷新的监听
onPullDownefresh(){
// 1.清空之前的数据
this.setaData({videoList:[]})
this.data.offset=0
this.data.hasMore=true
//2. 重新请求新的数据
this.fetchTopMV().then(()=>{
    // 拿到数据之后停止下拉刷新
    wx.stopPullDownRefresh() 
})
},

// 监听item的点击
itemClick(event){
const item=event.currentTarget.dataset.item
wx.navigateTo({
  url: `/packageVideo/pages/detail-video/detail-video?id=${item.id}`,
})
}
})