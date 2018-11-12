let configURL = {
  infoUrl: 'http://refueling.test.mycrudeoil.com',
  refuUrl: 'http://refueling.test.mycrudeoil.com',
  userUrl: 'http://user.test.mycrudeoil.com'
}
// let configURL = {
//   infoUrl: 'http://10.26.10.41',
//   userUrl: 'http://10.26.10.41'
// }
const protocol = location.protocol
const urlStr = location.hostname
const host = location.host
// 区分开发和生产环境
if (urlStr !== 'localhost') {
  configURL = {
    refuUrl: setRefuUrl(host),
    userUrl: setUserUrl(host),
    infoUrl: setInfoUrl(host)
  }
}

function setRefuUrl (hostname) {
  let hname = hostname.replace('user', 'refueling')
  return protocol + '//' + hname
}

function setUserUrl (hostname) {
  let hname = hostname.replace('refueling', 'user')
  return protocol + '//' + hname
}

function setInfoUrl (hostname) {
  let hname = hostname.replace('refueling', 'info')
  return protocol + '//' + hname
}
export default configURL
