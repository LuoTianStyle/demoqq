import { post, get } from '@/plugins/axios'
// 用户登录
export const login = params => {
  return post(`api_back/adminuser/login`, params)
}
// 用户登录
export const logout = params => {
  return post(`api_back/adminuser/logout`, params)
}

// 获取列表
export const getList = params => {
  return post(`api_back/adminuser/getUserList`, params)
}
// 封号
export const postSetZoom = params => {
  return post(`api_back/adminuser/editUserSpace`, params)
}
// 重置密码
export const postResetPass = params => {
  return post(`api_back/adminuser/editUserPassword`, params)
}
// 修改密码
export const postChangePass = params => {
  return post(`api_back/adminuser/editPassword`, params)
}
// 允许注册
export const getSite = params => {
  return get(`api_back/site/index`, params)
}
export const postSiteEdit = params => {
  return get(`api_back/site/edit`, params)
}
// 更换模型
export const changeModel = ({ modelType = 'rand', ...params }) => {
  return this.get(`api_backs/api/live2d/${modelType}/model`, params)
}

// 更换服装
export const changeTextures = ({ texturesType = 'switch', ...params }) => {
  return this.get(`api_backs/api/live2d/${texturesType}/textures`, params)
}

// 加载模型
export const loadLive2d = (modelId, texturesId) => {
  return this.get(
    `api_backs/api/live2d/model/${modelId}/textures/${texturesId}`
  )
}
