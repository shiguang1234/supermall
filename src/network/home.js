//封装首页网络请求
import { request } from "./request"

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

//type,page为传入数据
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}