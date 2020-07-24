import NoDate from '@/components/NoData'
import Loading from '@/components/Loading'
import LoadingMore from '@/components/LoadingMore'
import ExamDetails from '@/components/ExamDetails'
const install = Vue => {
  Vue.component('NoDate', NoDate)
  Vue.component('loading', Loading)
  Vue.component('LoadingMore', LoadingMore)
  Vue.component('ExamDetails', ExamDetails)
}
export default install
