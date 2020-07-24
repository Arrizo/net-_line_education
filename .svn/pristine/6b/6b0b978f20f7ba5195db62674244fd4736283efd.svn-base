
import fetch from '@/utils/fetch'
import {API_PATH} from '@/config/env'
export const userLogin = (objJson) => fetch(API_PATH + '/user/api/user/login/password', objJson, 'POST')
export const userRegist = (objJson) => fetch(API_PATH + '/user/api/user/register', objJson, 'POST')
export const sendCode = (objJson) => fetch(API_PATH + '/user/api/user/send/code', objJson, 'POST')
export const updataPass = (objJson) => fetch(API_PATH + '/user/api/user/update/password', objJson, 'POST')
export const studylog = (objJson) => fetch(API_PATH + '/course/api/course/user/study/log/list', objJson, 'POST')
export const studyPlan = (objJson) => fetch(API_PATH + '/course/auth/study/plan/list', objJson, 'POST')
export const checkUser = (objJson) => fetch(API_PATH + '/user/api/user/queryMobile', objJson, 'POST')
export const updateMobile = (objJson) => fetch(API_PATH + '/user/api/user/updateMobile', objJson, 'POST')
export const AccessToken = (objJson) => fetch(API_PATH + '/system/auth/sys/getAccessToken', objJson, 'POST')
// 下单
export const orderPay = (objJson) => fetch(API_PATH + '/user/pre_pay/order/pay', objJson, 'POST')
// export const orderPay = (objJson) => fetch(API_PATH + '/user/api/order/pay', objJson, 'POST')
// 订单查询结果
export const wxPayAppResult = (objJson) => fetch(API_PATH + '/user/pre_pay/order/wxPayAppResult', objJson, 'POST')
// 微信订单结果
export const getwxPayAppResult = (objJson) => fetch(API_PATH + '/user/pre_pay/order/getwxPayAppResult', objJson, 'POST')
