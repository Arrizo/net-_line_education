let API_PATH = ''
let TRA_GET = ''
let TRA_GET_MANAGER = ''
if (process.env.NODE_ENV === 'development') {
  // API_PATH = ''
  // API_PATH = 'http://192.168.4.111:5840/api'
  API_PATH = 'http://192.168.4.165:5840/api'
  TRA_GET = 'http://192.168.4.165:5840/exam/socket/auth'
  TRA_GET_MANAGER = 'http://192.168.4.165:5840/exam/socket/manager'
  // API_PATH = 'http://api.edu.sjysz.com:80/api'
  // API_PATH = 'http://121.37.207.77:5840/api'
  //
} else if (process.env.NODE_ENV === 'production') {
  // api.edu.sjysz.com
  // API_PATH = 'http://api.edu.sjysz.com/api'
  API_PATH = 'http://api.edu.sjysz.com:80/api'
  TRA_GET = ''
  TRA_GET_MANAGER = ''
  // API_PATH = 'http://121.37.207.77:5840/api'
  // API_PATH = 'http://192.168.4.212:5840/api'
  // API_PATH = 'http://192.168.4.212:5840/api'
  // API_PATH = 'http://192.168.4.28:5840/api'
  // API_PATH = 'http://192.168.4.28:5840/api'
}
export {
  API_PATH,
  TRA_GET,
  TRA_GET_MANAGER
}
