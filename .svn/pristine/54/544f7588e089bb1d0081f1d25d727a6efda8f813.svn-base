const getScrollTop = () => {
  return document.documentElement.scrollTo || document.body.scrollTo
}

const getClientHeight = () => {
  return document.body.clientHeight || document.documentElement.clientHeight
}
const getScrollHeight = () => {
  return document.body.scrollHeight || document.documentElement.scrollHeight
}
window.onscroll = function () {
  if (getScrollTop() + getClientHeight() === getScrollHeight()) {
    alert('到达底部')
  }
}
