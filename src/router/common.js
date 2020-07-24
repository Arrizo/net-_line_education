const Search = resolve => require(['@/components/Common/Search'], resolve)
const CoursDetails = resolve => require(['@/components/Common/CoursDetails'], resolve)
const WrongRecord = resolve => require(['@/components/WrongRecord'], resolve)
const CertificateDetails = resolve => require(['@/components/CertificateDetails'], resolve)
const System = resolve => require(['@/components/Common/System'], resolve)
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
  },
  {
    path: '/certificate_details',
    name: 'CertificateDetails',
    component: CertificateDetails,
    meta: {
      login: false,
      hasBack: false,
      hasFooter: false,
      title: '证书详情'
    }
  },
  {
    path: '/wrongrecord',
    name: 'WrongRecord',
    component: WrongRecord,
    meta: {
      login: true,
      hasBack: true,
      hasFooter: false,
      title: '模拟错题记录'
    }
  },
  {
    path: '/system',
    name: 'System',
    component: System,
    meta: {
      hasBack: false,
      hasFooter: false,
      title: ' '
    }
  }
]

export default routes
