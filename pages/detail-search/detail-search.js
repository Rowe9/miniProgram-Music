import { getHotSearch,reqSearchDefault,reqSearchAnswer } from "../../services/search"

// pages/detail-search/detail-search.js
const app=getApp()
Page({

  data:{
    hotsData:[],
    // 搜索历史的展示
    history:[],
    searchDefault:'',
    // 用户输入的关键词搜索
    keywords:'',
    value:[],
    // 空出的高度等于，搜索栏的高度+状态栏的高度
    top:90
  },
  onLoad(){
    const statusHeight=app.globalData.statusHeight
    const height=statusHeight+54
    this.setData({contentHeight:height})
    // 获取热门搜索数据
    getHotSearch().then(res=>{
      // console.log(res.result.hots);
      // 拿到数组中的对象，里面的first部分
      // map遍历数组里面的每个对象，把每个对象都拿出来了
      // const arr=res.result.hots
      // const newArr=[]
      // arr.map(result=>{
      //   // console.log(result.first);
      //   newArr.push(result.first)
      // })
      // this.setData({hotsData:newArr})
      // console.log(res);
      
      this.setData({hotsData:res.data})


    })
    // 获取搜索input框的提示
    reqSearchDefault().then(res=>{
      // console.log(res.data);
      this.setData({searchDefault:res.data.showKeyword})
      // console.log(this.data.searchDefault);
    })
  },
    // 获取搜索关键词提示

  // reqSearchAnswer(this.data.keywords).then(res=>{
  //   // console.log(res);
  //   // 监听搜索框的输入内容，一旦输入内容，就把内容作为keywords
  //   // 监听搜索按钮的点击，当点击搜索按钮的时候，发送网络
  //   // 用户的输入要做节流
  //   // 监听搜索到的数据的点击，点击之后放到历史记录展示
  //   // this.setData({value:res})
  //   console.log(res);

  // })
  async fetchReqSearchAnswer(keywords,limit=10){
    if(keywords === '')return
    
    if(this.data.keywords==='')return 

    let res=await reqSearchAnswer(this.data.keywords,limit)
    const songs=res.result.songs
    if(res.code===200){
      this.setData({value:songs})
    }else{
      this.setData({ value: ['暂未搜索到相关内容'] })
    }
    // 搜索完一批数据，删除
    // 把value清空
    // 点空格的话会出现上一条记录

    console.log(res.result.songs);
    

  },

  // 热搜榜数据的点击
  onHotItemTap(event){
    const click=event.currentTarget.dataset.item

    const index=this.data.history.indexOf(click)
    // 如果找到了相同的值
    if(index!==-1){
      // 删除相同的值
      const same=this.data.history.splice(index,1)
    }
    // 把旧的数据，和新的数据都放到数组里面
    this.setData({history:[click,...this.data.history]})
  },
  // 搜索框的内容输入监听
  onChange(event){
    console.log(event.detail);
    const input=event.detail
    this.setData({keywords:input})
    this.fetchReqSearchAnswer()
  },
  onValueNameClick(event){
    // this.data.isValueClick=false
    this.setData({keywords:''})
    const clickName=event.currentTarget.dataset.name
    // 把旧的数据，和新的数据都放到数组里面
    this.setData({history:[clickName,...this.data.history]})
    // console.log("监听到了点击",);
  },
  onDeleteTap(){
    this.setData({history:[]})
  },


})
