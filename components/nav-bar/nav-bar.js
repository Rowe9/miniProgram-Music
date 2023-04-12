// components/nav-bar/nav-bar.js
const app = getApp()

Component({
  options: {
    // 多插槽的时候需要加上
    multipleSlots: true
  },
  properties: {
    title: {
      type: String,
      value: "导航标题"
    }
  },
  data: {
    statusHeight: 20
  },
  lifetimes: {
    attached() {
      this.setData({ statusHeight: app.globalData.statusHeight })
    }
  },
  methods:{
    onLeftClick(){
      // 把事件发出去
      this.triggerEvent("leftclick")
    }
  }
})
