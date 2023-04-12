import { myRequest } from "./index"

// 热门搜索
export function getHotSearch(){
  return myRequest.get({
    url:"/search/hot/detail"
  })
}

export function reqSearchDefault(){
  return myRequest.get({
    url:'/search/default',
  })
}

export function reqSearchAnswer(keywords,limit=10){
  return myRequest.get({
    url:`/search?keywords=${keywords}&limit=${limit}`
  })
}