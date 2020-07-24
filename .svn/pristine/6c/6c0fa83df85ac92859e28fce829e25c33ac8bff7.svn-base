import fetch from '@/utils/fetch'
import {API_PATH} from '@/config/env'
import store from '@/store'
export const categoryTree = (objJson) => fetch(API_PATH + '/exam/auth/category/tree', objJson, 'GET')
export const collectTest = (objJson) => fetch(API_PATH + '/exam/auth/difficult/mark', objJson, 'POST')
export const historyList = (objJson) => fetch(API_PATH + '/exam/auth/exam/log/list', objJson, 'POST')
export const historyDetail = (objJson) => fetch(API_PATH + '/exam/auth/exam/log/detail', objJson, 'POST')
export const paperList = (objJson) => fetch(API_PATH + '/exam/auth/practice/paperList', objJson, 'GET')

export const testResult = (objJson) => {
  let url = ''
  switch (parseInt(objJson.type)) {
    case 5:
      url = '/exam/auth/self/asses/test/audit'
      break
    default:
      url = '/exam/auth/test/audit'
      break
  }
  return fetch(API_PATH + url, objJson, 'POST')
}

export const randomTest = (objJson) => {
  let url = ''
  switch (parseInt(objJson.type)) {
    case 1:
      url = '/exam/auth/practice/start'
      break
    case 2:
      url = '/exam/auth/test/randomTest'
      break
    case 3:
      url = '/exam/auth/err_record/randomErrTest?page=' + objJson.page + '&type=' + objJson.type + '&userNo=' + store.getters.userInfo.userNo
      break
    case 4:
      url = '/exam/auth/difficult/list'
      break
    case 5:
      url = '/exam/auth/self/asses/test/start'
      break
  }
  return fetch(API_PATH + url, objJson, 'POST')
}
