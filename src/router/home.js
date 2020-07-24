
const Home = resolve => require(['@/containers/Home'], resolve)
const Details = resolve => require(['@/containers/Details'], resolve)
const Login = resolve => require(['@/containers/Login'], resolve)
const MoreCourse = resolve => require(['@/containers/Home/MoreCourse'], resolve)
const routes = [{
  path: '/home',
  name: 'Home',
  component: Home,
  meta: {
    login: true
  }
},
{path: '/details',
  name: 'Details',
  component: Details,
  meta: {
    hasBack: true,
    title: '课程详情'
  }},
{
  path: '/login',
  name: 'Login',
  component: Login,
  meta: {
    hasBack: true,
    title: '登录'
  }
},
{
  path: '/more-course',
  name: 'MoreCourse',
  component: MoreCourse,
  meta: {
    hasBack: true
  }
}
]

export default routes
