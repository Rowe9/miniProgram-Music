// pages/detail-menu/detail-menu.js
import {getSongMenuTag,getSongMenuList} from '../../services/music'
Page({
  data:{
    songMenus:[]
  },
  onLoad(){
    this.fetchSongMenuTag()
  },
  async fetchSongMenuTag(){
      const res=await getSongMenuTag()
      const tags=res.tags

      // 2.根据tags去获取对应的歌单
  const allPromises=[]
  for(const tag of tags){
   const promise=getSongMenuList(tag.name)
   allPromises.push(promise)
  }
  // 3.获取到所有的数据之后，调用一次setData
    Promise.all(allPromises).then(res=>{
      this.setData({songMenus:res})
      // console.log(res);
    })

  }
})