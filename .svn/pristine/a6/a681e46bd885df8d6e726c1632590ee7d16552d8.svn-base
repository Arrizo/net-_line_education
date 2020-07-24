import store from '@/store'
import { Toast } from 'mint-ui'
let END_TIME = parseInt(new Date(store.getters.plantInfo.endTime).getTime() / 1000)
let STIPULATEDTIME = parseInt(store.getters.plantInfo.stipulatedTime) * 60
export const autoExam = (time, callBack) => {
  (STIPULATEDTIME - time) === 600 && Toast({message: '距离考试结束还有10分钟', duration: 5000});
  (STIPULATEDTIME - time) === 300 && Toast({message: '距离考试结束还有5分钟', duration: 5000});
  (time === STIPULATEDTIME || parseInt(Date.now() / 1000) > END_TIME) && callBack()
}
