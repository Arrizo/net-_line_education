const Person = resolve => require(['@/containers/Person'], resolve)
const Menber = resolve => require(['@/containers/Person/VipMember'], resolve)
const StudyRecord = resolve => require(['@/containers/Person/StudyRecord'], resolve)
const StudyPlan = resolve => require(['@/containers/Person/StudyPlan'], resolve)
const PlanList = resolve => require(['@/containers/Person/PlanList'], resolve)
const Certificate = resolve => require(['@/containers/Person/Certificate'], resolve)
const PersonInfo = resolve => require(['@/containers/Person/PersonInfo'], resolve)
const EditePage = resolve => require(['@/containers/Person/PersonInfo/EditePage'], resolve)
const PlanDetails = resolve => require(['@/components/Common/PlanDetails'], resolve)
const routes = [{
  path: '/person',
  name: 'Person',
  component: Person,
  meta: {
    hasHeader: false,
    hasFooter: true,
    login: true
  }
},
{
  path: '/menber',
  name: 'Menber',
  component: Menber,
  meta: {
    login: true,
    hasFooter: true,
    title: '会员中心',
    hasBack: true
  }
},
{
  path: '/study',
  name: 'study_record',
  component: StudyRecord,
  meta: {
    login: true,
    hasBack: true,
    title: '学习记录'
  }
},
{
  path: '/plan',
  name: 'Study_Plan',
  component: StudyPlan,
  meta: {
    login: true,
    hasBack: true,
    title: '学习计划'
  }
},
{
  path: '/plan_details',
  name: 'Plan_Details',
  component: PlanDetails,
  meta: {
    login: true,
    hasBack: true,
    title: '计划详情'
  }
},
{
  path: '/plan_list',
  name: 'PlanList',
  component: PlanList,
  meta: {
    login: true,
    hasBack: true,
    title: '计划列表'
  }
},
{
  path: '/personinfo',
  name: 'PersonInfo',
  component: PersonInfo,
  meta: {
    login: true,
    hasBack: true,
    title: '个人信息'
  }
},
{
  path: '/edite-page',
  name: 'EditePage',
  component: EditePage,
  meta: {
    login: true,
    hasHeader: false
  }
},
{
  path: '/certificate',
  name: 'Certificate',
  component: Certificate,
  meta: {
    login: true,
    hasBack: true,
    hasFooter: false
  }
}
]

export default routes
