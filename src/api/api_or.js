import host from './host'

const HOST = host.refuUrl
const HOSTINFO = host.infoUrl
const HOSTUSER = host.userUrl

export default {
  HOST: HOST,
  HOSTUSER: HOSTUSER,
  // 下拉列表
  tranportways: HOST + '/ordercommon/tranportways.json', // 运输方式
  oilvarieties: HOST + '/ordercommon/oilvarieties.json', // 油品类别
  oilppms: HOST + '/ordercommon/oilppms.json', // 油规格
  // 船燃订单（上游订单）买家
  buyerOrderUp: HOST + '/orderignition/buylist.json', // 分页列表
  listbycompany: HOST + '/orderignition/buylistbycompany.json', // 分页列表(按交易对手展示)
  ordersbycompany: HOST + '/orderignition/buyordersbycompany.json', // 查询要展开的订单
  // 卖家船燃订单（上游订单）
  selllist: HOST + '/orderignition/selllist.json', // 分页列表
  selllistbycompany: HOST + '/orderignition/selllistbycompany.json', // 分页列表(按交易对手展示)
  sellordersbycompany: HOST + '/orderignition/sellordersbycompany.json', // 查询要展开的订单
  // 船供订单（下游订单）
  // 买家
  supplybuylist: HOST + '/ordersupply/buylist.json', // 分页列表
  supplyBuylistbycompany: HOST + '/ordersupply/buylistbycompany.json', // 分页列表(按交易对手展示)
  supplyBuyorderSbycompany: HOST + '/ordersupply/buyordersbycompany.json', // 查询要展开的订单
  // 卖家
  supplyselllistbycompany: HOST + '/ordersupply/selllistbycompany.json', // 分页列表(按交易对手展示)
  supplyListbyCompany: HOST + '/ordersupply/sellordersbycompany.json', // 查询要展开的订单
  supplyOrderCompany: HOST + '/ordersupply/selllist.json', // 分页列表
  // 下载模板
  exportRIgnition: HOST + '/exportRIgnition.json', // 上游（船燃）模板
  exportRSupply: HOST + '/exportRSupply.json', // 下游（船供）模板
  orderBuyerExcel: {
    1: HOST + '/xls/10f1b8a06793406382d237e4fc8e11a6.xls',
    9: HOST + '/xls/2b036b42343d4b9ba427a302105f3db4.xls'
  },
  orderSellerExcel: HOST + '/xls/orderSellerExcel.xls',
  // 导出订单
  buyerExportRIgnitionData: HOST + '/buyerExportRIgnitionData.json', // 上游（船燃）导出买家
  sellerExportRIgnitionData: HOST + '/sellerExportRIgnitionData.json', // 上游（船燃）导出卖家
  buyerExportRSupplyData: HOST + '/buyerExportRSupplyData.json', // 下游（船供）导出买家
  sellerExportRSupplyData: HOST + '/sellerExportRSupplyData.json', // 下游（船供）导出卖家
  // 导入订单
  buyImportRIgnitionData: HOST + '/buyImportRIgnitionData.json', // 买家上游（船燃）导入
  buyImportRSupplyData: HOST + '/buyImportRSupplyData.json', // 买家下游（船供）导入
  sellerImportRIgnitionData: HOST + '/sellerImportRIgnitionData.json', // 卖家上游（船燃）导入
  sellerImportRSupplyData: HOST + '/sellerImportRSupplyData.json', // 卖家下游（船供）导入
  // 导入订单(后台)
  importRIgnitionData: HOST + '/omImportRIgnitionData.json', // /上游（船燃）导入
  importRSupplyData: HOST + '/omImportRSupplyData.json', // /下游（船供）导入

  // 删除订单
  Delorderignition: HOST + '/orderignition/delete.json', // 船燃订单（上游订单）
  Delordersupply: HOST + '/ordersupply/delete.json', // 船供订单（下游订单）
  // 船燃船供订单文件上传
  fileupload: HOST + '/file/upload.json', // 订单文件上传
  deletefile: HOST + '/order/deletefile.json', // 订单文件删除
  submmitfile: HOST + '/orderignition/uploadsubmit.json', // 文件上传提交上游订单
  ordersupplyuploadsubmit: HOST + '/ordersupply/uploadsubmit.json', // 文件上传提交下游订单
  showuploadedfiles: HOST + '/order/uploadedfiles.json', // 已上传的单据查询
  // 个人信息
  chinese: HOST + '/index.html',
  infoHome: HOST + '/index.html#/home',
  infoHall: HOST + '/index.html#/hall',
  information: HOSTINFO + '/page/#/',
  indexSippingoil: HOST + '/index.html#/', // 首页
  selctLogin: HOST + '/selctLogin.json', // 个人中心user信息
  encyclopedias: HOSTINFO + '/page/#/encyclopedia',
  english: 'http://transaction.test.mycrudeoil.com/',
  myCenter: HOSTUSER + '/secure/center/my.htm', // 个人中心页
  login: HOSTUSER + '/secure/login.htm', // 登陆页面
  logout: HOSTUSER + '/secure/logout.htm', // 退出登陆页面
  userMessage: HOSTUSER + '/secure/center/safety.htm', // 账户信息
  userSecurity: HOSTUSER + '/secure/center/setting.htm', // 账户安全
  resetPassword: HOSTUSER + '/secure/center/reset/password.htm', // 修改密码
  subaccountUrl: HOSTUSER + '/secure/center/role/role_permission.htm', // 子账户管理,
  enterpriseUrl: HOSTUSER + '/secure/center/activite_account.htm' // 绑定企业
}
