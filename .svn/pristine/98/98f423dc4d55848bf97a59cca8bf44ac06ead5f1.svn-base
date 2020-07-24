import {HOME_NAME, TEST_TYPE} from '@/store/mutationTypes'

const state = {
  isLogin: '111',
  type: 0
}
const actions = {
  doLogin ({commit, state}, params) {
    commit(HOME_NAME, params)
  },
  changeType ({commit, state}, type) {
    return new Promise((resolve, reject) => {
      commit(TEST_TYPE, type)
      resolve()
    })
  }
}
const mutations = {
  [HOME_NAME] (state, params) {
    state.isLogin = params
  },
  [TEST_TYPE] (state, type) {
    state.type = type
  }
}
export default{
  state,
  actions,
  mutations
}
