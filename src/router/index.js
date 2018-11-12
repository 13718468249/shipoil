import Vue from 'vue'
import Router from 'vue-router'

import SlInquiry from '@/components/sl_inquiry'
import SlManage from '@/components/sl_manage'
import SlInput from '@/components/sl_input'
import SlPage from '@/components/sl_page'
import ByPage from '@/components/by_page'
import ByOffer from '@/components/by_offer'
import ByInput from '@/components/by_input'
import ByManage from '@/components/by_manage'
import OrSellup from '@/components/or_sellup'
import OrCenter from '@/components/or_center'
import OrCeTest from '@/components/or_ctest'
import OrBuyup from '@/components/or_buyup'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'by-manage',
    component: ByManage
  }, {
    path: '/sl-inquiry',
    name: 'sl-inquiry',
    component: SlInquiry
  }, {
    path: '/by-offer',
    name: 'by-offer',
    component: ByOffer
  }, {
    path: '/sl-input',
    name: 'sl-input',
    component: SlInput
  }, {
    path: '/sl-manage',
    name: 'sl-manage',
    component: SlManage
  }, {
    path: '/sl-page',
    name: 'sl-page',
    component: SlPage
  }, {
    path: '/by-input',
    name: 'by-input',
    component: ByInput
  }, {
    path: '/by-page',
    name: 'by-page',
    component: ByPage
  }, {
    path: '/or-buyup',
    name: 'or-buyup',
    component: OrBuyup
  }, {
    path: '/or-sellup',
    name: 'or-sellup',
    component: OrSellup
  }, {
    path: '/or-center',
    name: 'or-center',
    component: OrCenter
  }, {
    path: '/or-ctest',
    name: 'or-ctest',
    component: OrCeTest
  }]
})
