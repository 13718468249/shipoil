import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sysTag: 0,
    oilType: 1,
    isSystem: false,
    epMember: {},
    deliveryWay: ['配送', '自提'],
    transportWay: {
      1: [],
      9: []
    },
    oilTypeList: {
      1: [],
      9: []
    },
    oilTypes: [{
      zhName: '船油',
      enName: '',
      code: 1
    }, {
      zhName: '原料油',
      enName: '',
      code: 9
    }],
    infoTypes: {
      1: {
        sell: [{
          zhName: '船燃贸易',
          enName: '',
          code: 1
        }, {
          zhName: '船舶加油(内贸)',
          enName: '',
          code: 2
        }, {
          zhName: '船舶加油(保税)',
          enName: '',
          code: 3
        }],
        buy: [{
          zhName: '船燃采购',
          enName: '',
          code: 1
        }]
      },
      9: {
        sell: [{
          zhName: '原料油销售',
          enName: '',
          code: 9
        }],
        buy: [{
          zhName: '原料油采购',
          enName: '',
          code: 9
        }]
      }
    }
  },
  mutations: {
    setOilType (state, oilType) {
      state.oilType = oilType
    },
    setSysTag (state, sysTag) {
      state.sysTag = sysTag
    },
    setIsSystem (state, isSystem) {
      state.isSystem = isSystem
    },
    setTransportWay (state, transportWay) {
      state.transportWay = transportWay
    },
    setOilTypeList (state, oilTypeList) {
      state.oilTypeList = oilTypeList
    },
    setEpMember (state, epMember) {
      state.epMember = epMember
    }
  }
})
