// pages/detail-video/detail-video.js
import {getMVUrl} from "../../../services/video"
import {getMVDetail,getMVSuggest} from '../../../services/video'
Page({
  data:{
    id:0,
    mvUrl:"",
    mvInfo:[],
    mvSuggest:[],
    danmuList:[
      {text:"哈哈哈哈哈哈哈哈哈",color:"#ff0000",time:3},
      {text:"不错不错不错",color:"#ffff00",time:10},
      {text:"我是真爱粉",color:"#0000ff",time:12}
    ]
  },
  onLoad(options){
    // 1.获取id
    const id=options.id
    this.setData({id})

    // 2.请求数据
   this.fetchMVUrl()
   this.fetchMVInfo()
   this.fetchMVSuggest()
  },
async fetchMVUrl(){
const res=await getMVUrl(this.data.id)
this.setData({mvUrl:res.data.url})
},

async fetchMVInfo(){
 const res=await getMVDetail(this.data.id)
 this.setData({mvInfo:res.data})
},
async fetchMVSuggest(){
  const res=await getMVSuggest(this.data.id)
  this.setData({mvSuggest:res.data})
}

})