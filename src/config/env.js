let API_PATH = ''
if (process.env.NODE_ENV === 'development') {
  // API_PATH = ''
  API_PATH = 'http://121.37.207.77:5840/api'
  // API_PATH = 'http://192.168.4.111:5840/api'
  // API_PATH = 'http://192.168.4.186:5840/api'
  // API_PATH = 'http://192.168.4.212:5840/api'
  // API_PATH = 'http://192.168.4.186:5840/api'
  // 4.28s
  //
} else if (process.env.NODE_ENV === 'production') {
  API_PATH = 'http://121.37.207.77:5840/api'
  // API_PATH = 'http://192.168.4.212:5840/api'
  // API_PATH = 'http://192.168.4.212:5840/api'
  // API_PATH = 'http://192.168.4.28:5840/api'
  // API_PATH = 'http://192.168.4.28:5840/api'
}
export {
  API_PATH
}
