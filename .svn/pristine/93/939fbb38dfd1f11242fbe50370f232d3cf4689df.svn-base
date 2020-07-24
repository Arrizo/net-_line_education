import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/containers/Layout'
import home from '@/router/home'
import person from '@/router/person'
import search from '@/router/common'
import sort from '@/router/sort'
import ware from '@/router/ware'
Vue.use(Router)

const routes = [{
  path: '/layout',
  component: Layout,
  children: [
    ...home,
    ...person,
    ...search,
    ...sort,
    ...ware
  ]
},
{path: '/*', redirect: '/home'}
]

let router = new Router({
  routes
})
export default router
