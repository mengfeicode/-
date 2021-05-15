import axios from "axios"

export function request(config) {
    //1.创建axios的实例
    const instance = axios.create({
        baseURL: 'http://121.4.66.168:6789',
        timeout: 20000
    })

    //2.axios的拦截器
    instance.interceptors.request.use(config => {
        //比如config中的一些信息不符合服务器的要求
        //每次发送网络请求时，希望在界面显示一个请求的图标
        //某些网络请求（登录时的token），必须携带一些特殊的信息
        return config
    }, err => {
        console.log(err)
    })

    instance.interceptors.response.use(res => {
            return res.data
        }, err => {
            console.log(err)
        })
        //3.发送真正的网络请求
    return instance(config)
}

// 添加农产品
export function addPlant(obj) {
  return request({
    method: 'post',
    url: '/crop/cropAdd',
    data: obj,
  })
}

//查询农产品
export function cropQry(obj){
    return request({
        url:'/crop/cropQry',
        method: 'post',
        data: obj
    })
}