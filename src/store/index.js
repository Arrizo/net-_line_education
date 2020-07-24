import Vue from 'vue'
import Vuex from 'vuex'
import home from '@/store/modules/home'
import user from '@/store/modules/user'
import getters from './getters'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    home,
    user
  },
  getters
})
export default store
