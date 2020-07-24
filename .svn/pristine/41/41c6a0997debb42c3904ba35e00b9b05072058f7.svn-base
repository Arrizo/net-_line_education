import Cookies from 'js-cookie'
let storage = new Storage()
/**
 * @author chenzechao
 * @description 数据持久化工具
 * @example
 */
function Storage () {
  this.getInstance = function () {
    if (!storage) {
      storage = new Storage()
    }
    return storage
  }
}
const expireDate = 100000
// -------------------------------------------------------设置cookie
Storage.prototype.setCookie = function (cname, cvalue, expire) {
  Cookies.set(cname, cvalue, { expires: expire })
}
// 获取cookie
Storage.prototype.getCookie = function (key) {
  return Cookies.get(key)
}
// 删除cookie
Storage.prototype.removeCookie = function (name) {
  Cookies.remove(name)
}
// --------------------------------------------------------设置localStrong
Storage.prototype.setStorage = function (key, value) {
  try {
    localStorage.setItem(key, value)
  } catch (error) {
    Cookies.set(key, value, { expires: expireDate })
  }
}
Storage.prototype.removeStorage = function (key) {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    Cookies.remove(key)
  }
}
Storage.prototype.getStorage = function (key) {
  let storages = localStorage.getItem(key)
  if (!storages) storages = Cookies.get(key)
  return storages
}
// ----------------------------------------------设置localSession
Storage.prototype.setSession = function (key, value) {
  try {
    sessionStorage.setItem(key, value)
  } catch (error) {
    Cookies.set(key, value, {expires: expireDate})
  }
}
Storage.prototype.getSession = function (key) {
  let session = sessionStorage.getItem(key)
  if (!session) session = Cookies.get(key)
  return session
}
Storage.prototype.removeSession = function (key) {
  try {
    sessionStorage.removeItem(key)
  } catch (error) {
    Cookies.remove(key)
  }
}
export default storage
