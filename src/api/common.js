import fetch from '@/utils/fetch'
import {API_PATH} from '@/config/env'
export const courseDetails = (objJson) => fetch(API_PATH + '/course/api/course/view', objJson, 'POST')
export const commonSign = (objJson) => fetch(API_PATH + '/course/auth/course/sign', objJson, 'POST')
export const isPlayOver = (objJson) => fetch(API_PATH + '/course/api/course/user/study/log/appPlayOver', objJson, 'POST')
export const getUserInfo = (objJson) => fetch(API_PATH + '/user/auth/user/ext/view', objJson, 'POST')
export const updataUserInfo = (objson) => fetch(API_PATH + '/user/auth/user/ext/update', objson, 'POST')
export const getCertificate = (objson) => fetch(API_PATH + '/course/auth/certificate/detail', objson, 'POST')
export const getWrongRecord = (objson) => fetch(API_PATH + '/exam/auth/practice/wrong/record', objson, 'POST')

// export const weixinToken = (objson) => fetch('/weixin/', objson, 'GET')
