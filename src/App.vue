<template>
  <div id="app" class="oil">
    <div class="oil-header" v-if="!isSystem">
      <common-header v-if="!isSystem"></common-header>
      <tab-bar></tab-bar>
    </div>
    <div :class="isSystem?'oil-server':'oil-client'">
      <div class="oil-order">
        <bar-left v-if="!isSystem"></bar-left>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import "@/style/oil-style.scss";
import "@/style/style.scss";
import TabBar from "@/common/tabBar.vue";
import BarLeft from "@/common/barLeft.vue";
import CommonHeader from "@/common/commonHeader.vue";
import API from "@/api/api.js";

const typeName = "$OIL_ORDER_OILTYPE";
const tranName = "$OIL_ORDER_TRANSPORT";

export default {
  components: { BarLeft, CommonHeader, TabBar },
  data() {
    return {
      isSystem: false,
      infoType: 0,
      sysTag: 0
    };
  },
  methods: {
    getSelectOptions() {
      let oils = this.$store.state.oilTypes;
      this.setTypeStorage(oils);
      this.setTranStorage(oils);
    },
    reqOilTypeList(oils) {
      let voil = {};
      for (let i = 0; i < oils.length; i++) {
        let ele = oils[i];
        this.$http(API.OIL_TYPE, { oilType: ele.code }, "get").then(res => {
          let rdata = res.data.datas;
          voil[ele.code] = rdata;
          localStorage.setItem(typeName, JSON.stringify(voil));
          this.$store.commit("setOilTypeList", voil);
        });
      }
    },
    reqTransportWay(oils) {
      let voil = {};
      for (let i = 0; i < oils.length; i++) {
        let ele = oils[i];
        this.$http(API.TRANSPORT, { oilType: ele.code }, "get").then(res => {
          let rdata = res.data.datas;
          voil[ele.code] = rdata;
          localStorage.setItem(tranName, JSON.stringify(voil));
          this.$store.commit("setTransportWay", voil);
        });
      }
    },
    reqCurrentEnterprise() {
      this.$http(API.COMPANY_USER, {}).then(res => {
        let data = res.data.datas;
        if (data) {
          this.$store.commit("setEpMember", data);
        }
      });
    },
    setTypeStorage(oils){
      let type = localStorage.getItem(typeName);
      if (type) {
        let voil = JSON.parse(type);
        this.$store.commit("setOilTypeList", voil);
      } else {
        this.reqOilTypeList(oils);
      }
    },
    setTranStorage(oils){
      let tran = localStorage.getItem(tranName);
      if (tran) {
        let trsw = JSON.parse(tran);
        this.$store.commit("setTransportWay", trsw);
      } else {
        this.reqTransportWay(oils);
      }
    }
  },
  created() {
    let st = this.$route.query.sysTag;
    let ot = this.$route.query.oilType;
    let iss = st === "1";

    this.isSystem = iss;
    this.sysTag = st;

    this.$store.commit("setSysTag", st);
    this.$store.commit("setIsSystem", iss);
    if (ot) this.$store.commit("setOilType", ot);

    this.getSelectOptions();
  }
};
</script>
