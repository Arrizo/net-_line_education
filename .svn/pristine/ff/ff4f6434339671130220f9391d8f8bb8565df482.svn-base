import router from './index'
import store from '@/store'
import { MessageBox } from 'mint-ui'

router.beforeEach((to, from, next) => {
  if (to.meta.login) {
    if (store.getters.userInfo.token) {
      next()
    } else {
      MessageBox.alert('请先登录!').then(() => {
        next({
          name: 'Login',
          query: {redirect: to.fullPath}
        })
      })
    }
  } else {
    next()
  }
})
