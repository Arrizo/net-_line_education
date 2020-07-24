import {HOME_NAME, TEST_TIME, IS_FINISH} from '@/store/mutationTypes'
import {randomTest} from '@/api'
const state = {
  isLogin: '111',
  type: 0,
  plantInfo: {},
  time: 200,
  setInter: null
}
const actions = {
  doLogin ({commit, state}, params) {
    commit(HOME_NAME, params)
  },
  finishPlan ({commit, state}) {
    let obj = {}
    randomTest({type: 5}).then(res => {
      if (res.code === 200) {
        obj.endTime = (res.data.endTime).replace(/-/g, '/')
        obj.startTime = (res.data.startTime).replace(/-/g, '/')
        obj.stipulatedTime = res.data.stipulatedTime
      } else {
        obj.msg = res.msg
      }
    })
    commit(IS_FINISH, obj)
    // actions.timeToTest({commit, state})
  }
}
const mutations = {
  [HOME_NAME] (state, params) {
    state.isLogin = params
  },
  [TEST_TIME] (state, time) {
    state.time = time
  },
  [IS_FINISH] (state, data) {
    state.plantInfo = data
  }
}
export default{
  state,
  actions,
  mutations
}
