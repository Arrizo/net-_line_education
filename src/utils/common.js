
export const oscript = () => {
  let oscript = document.createElement('script')
  oscript.type = 'text/javascript'
  oscript.src = 'https://player.polyv.net/script/polyvplayer.min.js'
  document.body.appendChild(oscript)
}
export const randomNo = () => {
  let random = ''
  for (let i = 0; i < 4; i++) {
    random += Math.floor(Math.random() * 10)
  }
  random = new Date().getTime() + random
  return random
}
// 获取大写字母
export const getlatter = (index) => String.fromCharCode(65 + index)
// 题目的选项的撰文

export const formatAnswer = (list) => {
  let answer = ''
  if (list.length > 0) {
    (list.sort()).forEach(item => {
      answer += getlatter(item - 1) + '、'
    })
  }
  return answer.replace(/、$/, '')
}

export const testFormat = (data) => {
  data.forEach(item => {
    (item.opts.sort((a, b) => a.value - b.value)).forEach((item, index) => {
      item.label = getlatter(index) + '、' + item.content
    })
    item.right = formatAnswer(item.answer)
  })
  return data.length
}
export const pickerDate = (picker) => {
  let name = ''; let id = ''
  picker.forEach(item => {
    if (item && item.name !== ' ') {
      name += item.name + '-'
      id = item.id
    }
  })
  name = name.substring(0, name.length - 1)
  return {name, id}
}
// 时间格式
export const timeOut = time => {
  let [h, m, s] = [Math.floor(time / 3600 % 24), Math.floor(time / 60 % 60), Math.floor(time % 60)]
  h = h < 10 ? '0' + h : h
  m = m < 10 ? '0' + m : m
  s = s < 10 ? '0' + s : s
  return `${h}:${m}:${s}`
}
// 支付随机数
export const payRandom = () => {
  let random = ''
  for (let i = 0; i < 6; i++) {
    random = String.fromCharCode(65 + (Math.floor(Math.random() * 10)))
  }
  return new Date().getTime() + random + new Date().getTime()
}
// 获取浏览器参数
export const GetQueryString = () => {
  let r = /code=([\w-]*)&/
  return r.exec(location.search) ? r.exec(location.search)[1] : ''
}

// 判断是否微信浏览器
export const isWeixin = () => {
  var ua = navigator.userAgent.toLowerCase()
  var isWeixin = ua.indexOf('micromessenger') !== -1
  if (isWeixin) {
    return true
  } else {
    return false
  }
}
export const examTitle = (a) => {
  let title = ''
  switch (parseInt(a)) {
    case 2:
      title = '随机练习'
      break
    case 3:
      title = '错题练习'
      break
    case 4:
      title = '难题练习'
      break
    case 5:
      title = '自评测试'
      break
    default:
      title = '反假货币知识模拟测试'
      break
  }
  return title
}
export const examType = (type) => {
  let labal = ''
  switch (parseInt(type)) {
    case 1:
      labal = '单选题'
      break
    case 2:
      labal = '多选题'
      break
    case 3:
      labal = '判断题'
      break
    case 4:
      labal = '分析单选题'
      break
    case 5:
      labal = '分析多选题'
      break
    default:
      labal = '单选题'
      break
  }
  return labal
}
