// pages/main-music/main-music.js
import { getMusicBanner, getSongMenuList } from "../../services/music"
import recommendStore from "../../store/recommendStore"
import rankingStore, { rankingsMap } from "../../store/rankingStore"
import playerStore from "../../store/playerStore"
import querySelect from "../../utils/query-select"
import { throttle } from 'underscore'

const querySelectThrottle = throttle(querySelect, 100)
const app = getApp()

Page({
  data: {
    searchValue: "",
    banners: [],
    bannerHeight: 0,
    screenWidth: 375,

    recommendSongs: [],

    // 歌单数据
    hotMenuList: [],
    recMenuList: [],
    // 巅峰榜数据
    isRankingData: false,
    rankingInfos: {},

    // 当前正在播放的歌曲信息
    currentSong: {},
    isPlaying: false
  },

  onLoad() {
    this.fetchMusicBanner()
    // this.fetchRecommendSongs()
    this.fetchSongMenuList()

    // 发起action
    recommendStore.onState("recommendSongInfo", this.handleRecommendSongs)
    recommendStore.dispatch("fetchRecommendSongsAction")
    rankingStore.onState("newRanking", this.handleNewRanking)
    rankingStore.onState("originRanking", this.handleOriginRanking)
    rankingStore.onState("upRanking", this.handleUpRanking)
    rankingStore.dispatch("fetchRankingDataAction")

    playerStore.onStates(["currentSong", "isPlaying"], this.handlePlayInfos)

    // 获取屏幕的尺寸
    this.setData({ screenWidth: app.globalData.screenWidth })
  },

  // 网络请求的方法封装
  async fetchMusicBanner() {
    const res = await getMusicBanner()
    this.setData({ banners: res.banners })
  },
  async fetchSongMenuList() {
  // 这里的请求热门歌单和推荐歌单数据都是同步出现的，所以不要使用async await
    getSongMenuList().then(res => {
      this.setData({ hotMenuList: res.playlists })
    })
    getSongMenuList("华语").then(res => {
      this.setData({ recMenuList: res.playlists })
    })
  },

  // 界面的事件监听方法
  onSearchClick() {
    wx.navigateTo({url: '../detail-search/detail-search'})
  },
  // 监听图片什么时候加载完
  onBannerImageLoad(event) {
    querySelectThrottle(".banner-image").then(res => {
      this.setData({ bannerHeight: res[0].height })
    })
  },
    // 监听“更多”的点击
  onRecommendMoreClick() {
    wx.navigateTo({
      url: '/pages/detail-song/detail-song?type=recommend',
    })
  },
    // 监听song-item-v1的点击，点击之后拿到歌曲列表的数据
  onSongItemTap(event) {
    const index = event.currentTarget.dataset.index
    playerStore.setState("playSongList", this.data.recommendSongs)
    playerStore.setState("playSongIndex", index)
  },
// 监听是否播放的点击
  onPlayOrPauseBtnTap() {
    playerStore.dispatch("changeMusicStatusAction")
  },
// 点击play-bar的点击
  onPlayBarAlbumTap() {
    wx.navigateTo({
      url: '/packagePlayer/pages/music-player/music-player',
    })
  },


  // ====================== 从Store中获取数据 ======================
  handleRecommendSongs(value) {
    if (!value.tracks) return
    this.setData({ recommendSongs: value.tracks.slice(0, 6) })
  },

  handleNewRanking(value) {
    // console.log("新歌榜:", value);
    if (!value.name) return
    this.setData({ isRankingData: true })
    const newRankingInfos = { ...this.data.rankingInfos, newRanking: value }
    this.setData({ rankingInfos: newRankingInfos })
  },
  handleOriginRanking(value) {
    // console.log("原创榜:", value);
    if (!value.name) return
    this.setData({ isRankingData: true })
    const newRankingInfos = { ...this.data.rankingInfos, originRanking: value }
    this.setData({ rankingInfos: newRankingInfos })
  },
  handleUpRanking(value) {
    // console.log("飙升榜:", value);
    if (!value.name) return
    this.setData({ isRankingData: true })
    const newRankingInfos = { ...this.data.rankingInfos, upRanking: value }
    this.setData({ rankingInfos: newRankingInfos })
  },

  // 对以上重复代码的抽取
    // getRankingHandler(ranking){
    //   return value=>{
    //     const newRanking={...this.data.rankingInfos,[ranking]:value}
    //     this.setData({rankingInfos:newRankingInfos})
    //   }
    // }

  handlePlayInfos({ currentSong, isPlaying }) {
    if (currentSong) {
      this.setData({ currentSong })
    }
    if (isPlaying !== undefined) {
      this.setData({ isPlaying })
    }
  },

  onUnload() {
    recommendStore.offState("recommendSongs", this.handleRecommendSongs)
    rankingStore.offState("newRanking", this.handleNewRanking)
    rankingStore.offState("originRanking", this.handleOriginRanking)
    rankingStore.offState("upRanking", this.handleUpRanking)
    
    playerStore.offStates(["currentSong", "isPlaying"], this.handlePlayInfos)
  }
})