// // 网络请求
// class Request{
//  constructor(baseURL){
// this.baseURL=baseURL
//  }
//  request(options){
// const {url}=options
// return new Promise((resolve,reject)=>{
//   wx.request({
//     ...options,
//     url: this.baseURL + url,
//     success:(res)=>{
//       resolve(res.data)
//      },
//      fail:(err)=>{
//        console.log("err",err);
//      }
//   })

// })
//  }
//  get(options){
// return this.request({...options,method:"get"})
//  }

// post(options){
//   return this.request({...options,method:"post"})
//    }
// }

// export const Request=new Request('http://codercba.com:9002')

// 封装成函数
// export function hyRequest(options) {
//   return new Promise((resolve, reject) => {
//     wx.request({ 
//       ...options, 
//       success: (res) => {
//         resolve(res.data)
//       },
//       fail: reject
//     })
//   })
// }

// 封装成类 -> 实例，有更强的封装性，扩展性
class Request {
  constructor(baseURL) {
    this.baseURL = baseURL
  }
  request(options) {
    const { url } = options
    return new Promise((resolve, reject) => {
      wx.request({
        ...options,
        url: this.baseURL + url,
        success: (res) => {
          resolve(res.data)
        },
        fail: (err) => {
          console.log("err:", err);
        }
      })
    })
  }
  get(options) {
    return this.request({ ...options, method: "get" })
  }
  post(options) {
    return this.request({ ...options, method: "post" })
  }
}

export const myRequest=new Request("http://codercba.com:9002")

