import {myRequest} from "./index"

export function getTopMV(offset=0,limit=20){
return myRequest.get({
    url:"/top/mv",
    data:{
      // limit是要展示多少条数据，offset是偏移量
      limit,
      offset
    }
  })
}

export function getMVUrl(id){
  return myRequest.get({
    url:"/mv/url",
    data:{
      id
    }
  })
}
export function getMVDetail(mvid){
 return myRequest.get({
   url:"/mv/detail",
   data:{
     mvid
   }
 })
}
export function getMVSuggest(id){
  return myRequest.get({
    url:"/related/allvideo",
    data:{
      id
    }
  })
}
