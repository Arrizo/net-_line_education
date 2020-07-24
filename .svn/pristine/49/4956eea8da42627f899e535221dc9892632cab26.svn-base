const Search = resolve => require(['@/components/Common/Search'], resolve)
const CoursDetails = resolve => require(['@/components/Common/CoursDetails'], resolve)
const routes = [
  {
    path: '/search',
    name: 'search',
    component: Search,
    meta: {
      hasHeader: false,
      hasFooter: false
    }
  },
  {
    path: '/cours_details',
    name: 'CoursDetails',
    component: CoursDetails,
    meta: {
      login: true,
      hasBack: true,
      hasFooter: false,
      title: '学习记录'
    }
  }]

export default routes
