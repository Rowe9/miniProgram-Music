import {HYEventStore} from "hy-event-store"
import {getPlaylistDetail} from '../services/music'
const recommendStore=new HYEventStore({
  state:{
    // 推荐榜单放的是热歌榜的数据
    recommendSongInfo:{}
  },
  actions:{
    fetchRecommendSongsAction(ctx){
      getPlaylistDetail(3778678).then(res=>{
        ctx.recommendSongInfo=res.playlist
      })
    }
  }

})

export default recommendStore
