// pages/detail-song/detail-song.js
// 点击 推荐歌单的更多、巅峰榜的三个item 会进入

import rankingStore from "../../store/rankingStore"
import recommendStore from "../../store/recommendStore"
import playerStore from '../../store/playerStore'
import {getPlaylistDetail} from '../../services/music'

Page({
  data:{
    type:"ranking",
    key:"newRanking",
    id:"",

    songInfo:{}
  },
  onLoad(options){
    // 1.确定获取数据的类型
    // type是我们自己在url上定义好的
    // type:ranking->榜单数据
    // type:recommend->推荐数据
    const type=options.type
    // this.data.type=type
    this.setData({type})

    // 获取store中榜单数据
    if(type==="ranking"){
      const key=options.key
      this.data.key=key
      rankingStore.onState(key,this.handleRanking)
    }else if(type==="recommend"){
      recommendStore.onState("recommendSongInfo",this.handleRanking)
    }else if(type === "menu"){
      const id=options.id
      this.data.id=id
      this.fetchMenuSongInfo()
    }
  },

  // 根据id拿到对应的菜单信息
  async fetchMenuSongInfo(){
    getPlaylistDetail(this.data.id).then(res=>{
      this.setData({songInfo:res.playlist})
    })
  },

  // ====================事件监听=========================
  onSongItemTap(){
    // 把歌曲列表信息放到store的playSongList里面   
    playerStore.setState("playSongList",this.data.songInfo.tracks)
  },



  // ====================store共享数据=========================
  handleRanking(value){
    this.setData({songInfo:value})
    wx.setNavigationBarTitle({
      title: value.name
    })
     // 修改页面标题
     if(this.data.type==="recommend"){
      value.name="推荐歌曲"
    }

  },
  onUnload(){
    if(this.data.type==="ranking"){
      rankingStore.offState(this.data.key,this.handleRanking)
    }else if(this.data.type==="recommend"){
      recommendStore.offState("recommendSongInfo",this.handleRanking)
    }
  }
})