import store from '@/store'
import { Toast } from 'mint-ui'
let END_TIME = parseInt(new Date(store.getters.plantInfo.endTime).getTime() / 1000)
let STIPULATEDTIME = parseInt(store.getters.plantInfo.stipulatedTime) * 60
export const autoExam = (time, callBack) => {
  (STIPULATEDTIME - time) === 600 && Toast({message: '距离考试结束还有10分钟', duration: 5000});
  (STIPULATEDTIME - time) === 300 && Toast({message: '距离考试结束还有5分钟', duration: 5000});
  (time === STIPULATEDTIME || parseInt(Date.now() / 1000) > END_TIME) && callBack()
}
export const promptCode = (code) => {
  let tips = ''
  switch (code) {
    case 'KICK':
      tips = '用户被踢掉'
      break
    case 'SUBMITTED':
      tips = '用户提交'
      break
    case 'SUCCESS':
      tips = '成功'
      break
    case 'NET_ERR':
      tips = '网络错误'
      break
    case 'EXAM_AUDITING':
      tips = '考试结算中'
      break
  }
  return tips
}
