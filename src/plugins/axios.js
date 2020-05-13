'use strict'
import axios from 'axios'
import { Loading, Message } from 'element-ui'
import { getStorage, setStorage } from '@/utils/storage.js'
import url from '@/utils/path.js'
let config = {
  timeout: 5 * 1000
}
let loadingCount = 0
let loading
const startLoading = () => {
  loading = Loading.service({
    lock: true,
    text: 'loading',
    background: 'rgba(0, 0, 0, 0.7)',
    spinner: 'el-icon-loading'
  })
}
const endLoading = () => {
  loading.close()
}
const showLoading = () => {
  if (loadingCount === 0) {
    startLoading()
  }
  loadingCount += 1
}

const hideLoading = () => {
  if (loadingCount <= 0) {
    return
  }
  loadingCount -= 1
  if (loadingCount === 0) {
    endLoading()
  }
}
const _axios = axios.create(config)

_axios.interceptors.request.use(
  function(config) {
    config.headers.common['authorizationType'] = 'web'
    if (getStorage('userData')) {
      config.headers.common['token'] = getStorage('userData').token
    }
    if (process.env.NODE_ENV === 'production') {
      let str = config.url.replace('/api/', '/')
      config.url =
        process.env.VUE_APP_CURRENTMODE === 'production'
          ? url.cc + str
          : url.com + str
    }
    if (config.showLoading) {
      showLoading()
    }
    return config
  },
  function(error) {
    hideLoading()
    return Promise.reject(error)
  }
)

_axios.interceptors.response.use(
  function(response) {
    if (response.data.code === 1020 && getStorage('userData')) {
      setStorage('userData', '')
      location.reload()
    } else {
      hideLoading()
      return response
    }
  },
  function(error) {
    if (
      error.code === 'ECONNABORTED' &&
      error.message.indexOf('timeout') !== -1
    ) {
      return {
        data: { code: '400', msg: '网络超时' }
      }
    }
    if (error.message === 'Request failed with status code 500') {
      return {
        data: { code: '500', msg: '服务器错误' }
      }
    }
    hideLoading()
    return Promise.reject(error)
  }
)
export function get(url, params = {}, config = { showLoading: true }) {
  return new Promise((resolve, reject) => {
    _axios
      .get(url, {
        params: params,
        showLoading: config.showLoading
      })
      .then(response => {
        if (response.data) {
          const data = response.data
          if (data.code === 0) {
            resolve(data)
          } else {
            Message.error({ message: data.msg, duration: 3000 })
            return
          }
        } else {
          resolve(response)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function post(url, data = {}, config = { showLoading: true }) {
  return new Promise((resolve, reject) => {
    _axios
      .post(url, data, config)
      .then(response => {
        if (response.data) {
          const data = response.data
          if (data.code === 0) {
            resolve(data)
          } else {
            Message.error({ message: data.msg, duration: 3000 })
            return
          }
        } else {
          resolve(response)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}
