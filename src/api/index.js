import { post, get } from '@/plugins/axios'
// 用户登录
export const login = params => {
  return post(`api_back/api/v1/adminlogin/username`, params)
}
// 用户登录
export const logout = params => {
  return post(`api_back/api/v1/adminlogin/logout`, params)
}

// 获取产品列表
export const getProduct = params => {
  return post(`api_back/api/v1/order/getProductList`, params)
}
// 创建订单
export const createOrder = params => {
  return post(`api_back/api/v1/order/create`, params)
}
// 创建续购订单
export const createRenew = params => {
  return post(`api_back/api/v1/order/createRenew`, params)
}

// 获取订单
export const getOrder = params => {
  return get(`api_back/api/v1/order/getList`, params)
}
// 获取列表
export const getList = params => {
  return get(`api_back/api/v1/user/getList`, params)
}
// 封号
export const postLocked = params => {
  return post(`api_back/api/v1/user/locked`, params, { showLoading: false })
}
// 重置密码
export const postResetPass = params => {
  return post(`api_back/api/v1/user/resetPassword`, params)
}
// 导出列表
export const getPutList = params => {
  return get(`api_back/api/v1/order/export`, params)
}
// 导出账号
export const getPutAccount = params => {
  return get(`api_back/api/v1/user/export`, params)
}
// 导出账号
export const getPay = params => {
  return get(`api_back/api/v1/paypal/pay`, params)
}
// 修改密码
export const postChangePass = params => {
  return post(`api_back/api/v1/adminlogin/editPwd`, params)
}
// 获取用户信息
export const getUserInfo = params => {
  return get(`api_back/api/v1/adminlogin/userInfo`, params)
}
