export default {
  // 验证手机号码
  isvalidPhone (str) {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    return reg.test(str)
  },
  // 验证码正整数
  isInteger (num) {
    var reg = /^[1-9]\d*$/
    return reg.test(num)
  },
  // 只能中文或者英文
  isName (name) {
    const reg = /^[a-zA-Z\u4e00-\u9fa5]+$/
    return reg.test(name)
  },
  getCookie (name) {
    let arr = null
    const reg = new RegExp('(^| )' + name + '=([^]*)(|$)')
    if ((arr = document.cookie.match(reg))) {
      // return true
      return arr[2]
    } else {
      return false
    }
  },
  // '2017-09-09'
  formatString (str) {
    return new Date(str).getTime()
  }
}
