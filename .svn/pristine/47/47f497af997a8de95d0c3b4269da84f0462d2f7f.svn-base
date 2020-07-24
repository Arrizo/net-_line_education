import config from '@/config/client'
import Storage from '@/utils/Storage_Cookie'
import * as TypeConfig from '../mutationTypes'
import {getUserInfo} from '@/api'
const state = {
  clientData: config.CLIENT,
  userInfo: Storage.getCookie(TypeConfig.LOGIN_INFO) ? JSON.parse(Storage.getCookie(TypeConfig.LOGIN_INFO)) : {},
  personInfo: Storage.getCookie(TypeConfig.PERSON_INFO) ? JSON.parse(Storage.getCookie(TypeConfig.PERSON_INFO)) : {}
}
const actions = {
  loginInfo ({commit, state}, params) {
    return new Promise((resolve, reject) => {
      Storage.setCookie(TypeConfig.LOGIN_INFO, params, 1)
      commit(TypeConfig.LOGIN_INFO, params)
      actions.getPerInfo({commit})
      resolve()
    })
  },
  changConfirm ({commit, state}, flag) {
    commit(TypeConfig.IS_CONFIRM, flag)
  },
  logOut ({commit, state}) {
    Storage.removeCookie(TypeConfig.LOGIN_INFO)
    commit(TypeConfig.LOGOUT_INFO)
  },
  // 获取用户信息
  getPerInfo ({commit}) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(res => {
        res.data.sexd = res.data.sex === 1 ? '男' : res.data.sex === 2 ? '女' : '保密'
        Storage.setCookie(TypeConfig.PERSON_INFO, res.data, 1)
        commit(TypeConfig.PERSON_INFO, res.data)
        resolve()
      })
    })
  }
}
const mutations = {
  [TypeConfig.LOGIN_INFO] (state, params) {
    state.userInfo = params
  },
  [TypeConfig.LOGOUT_INFO] (state, params) {
    state.userInfo = {}
  },
  [TypeConfig.IS_CONFIRM] (state, flag) {
    state.isConfirm = flag
  },
  [TypeConfig.PERSON_INFO] (state, obj) {
    state.personInfo = obj
  }
}
export default{
  state,
  actions,
  mutations
}
