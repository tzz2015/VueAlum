import axios from 'axios'
import qs from 'qs'
import { Toast } from 'mint-ui';
export default {
  handleResp: function (context, resp, resolve, reject) {
    console.log(resp.data)
    // 正确返回
    if (resp.data.code === 200) {
      resolve(resp.data)
      // 没有登录
    } else {
      Toast({
        message: resp.data.msg
      })
      reject(new Error('其他错误'))
    }
  },
  commonRequest: function (context, method, url, params) {
    return new Promise((resolve, reject) => {
      axios({
        method: method,
        baseURL: process.env.API_HOST,
        url: url,
        params: (method === 'get' ? qs.stringify(params) : null),
        data: (method !== 'get' ? qs.stringify(params) : null)
      })
        .then((resp) => {
          if (this.handleResp) {
            this.handleResp(context, resp, resolve, reject)
          } else {
            resolve(resp)
          }
        })
        .catch((e) => {
          Toast('网络异常，请稍后重试')
          console.log(e)
          reject(e)
        })
    })
  },
  get: function (context, url, params) {
    return this.commonRequest(context, 'get', url, params)
  },
  post: function (context, url, params) {
    return this.commonRequest(context, 'post', url, params)
  },
  put: function (context, url, params) {
    return this.commonRequest(context, 'put', url, params)
  },
  delete: function (context, url, params) {
    return this.commonRequest(context, 'delete', url, params)
  }
}
