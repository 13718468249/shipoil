<template>
  <div class="bar-right" v-title="'卖家订单'">
    <!-- <div class="oil-title-2">卖家订单</div> -->
    <el-radio-group class="oil-type-list" v-model="oilType">
      <el-radio-button v-for="(item, i) in oilTypes" :key="i" :label="item.code">{{ item.zhName }}</el-radio-button>
    </el-radio-group>
    <div class="bar-search">
      <order-search 
        ref="orderSearch" 
        :form-data="form" 
        :oilppms="oilSpecList" 
        :oilvarieties="oilTypeList" 
        :tranportways="transportWay" 
        :sysTag="form.sysTag" 
        @order-search="orderSearchFn" 
        @order-select-change="orderSelectChange"></order-search>
    </div>
    <div class="btn-order">
      <el-button type="text" @click="downLoad" style="margin-right:10px;text-decoration:underline;">下载导入订单模版.xlsx</el-button>
      <el-upload
        style="margin-right:10px" 
        :data="uploadData" 
        :action="uploadUrl" 
        :on-success="uploadSuccess" 
        :before-upload="uploadBefore" 
        :on-error="uploadError" 
        :show-file-list="false" 
        :file-list="uploadList">
        <el-button type="primary">导入订单</el-button>
      </el-upload>
      <el-button type="primary" :disabled="isNullTable" @click="exportTemplate">导出订单</el-button>
    </div>
    <div class="main-details">
      <ul>
        <li v-for="(order, i) in orderOptions" :key="i">
          <order-item :is-system="isSystem" :order-data="order" :business-type="3" identity="s" :checkOrder="jump2center" @order-delete="orderDelete"/>
        </li>
        <li v-if="isNullTable">
          <div class="noInfo">无订单信息</div>
        </li>
      </ul>
      <!--分页-->
      <div class="page-box">
        <el-pagination 
          :pager-count="5" 
          background 
          layout="prev,pager,next" 
          :total="totalPage" 
          :current-page="currentPage" 
          @current-change="newPageData"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import url from "@/api/api_or";
import OrderItem from "@/common/orderItem";
import OrderSearch from "@/common/orderSearch";
import { formateDate, code2value, fixed2 } from "@/util/filter";

export default {
  components: { OrderSearch, OrderItem },
  data() {
    return {
      uploadUrl: url.sellerImportRIgnitionData,
      oilTypes: this.$store.state.oilTypes,
      totalPage: 0,
      currentPage: 1,
      sellerCompanyId: "",
      isSystem: false,
      uploadList: [],
      form: {
        sysTag: "",
        status: "",
        pageNum: 1,
        infoType: 1,
        orderCode: "",
        orderTimeEnd: "",
        oilVarieties: "",
        orderTimeStart: "",
        oilClassification: "",
        fuelChargingCode: "",
        transportWay: "",
        deliveryWay: ""
      },
      choiceDetailsActive: "normal",
      orderStatus: ["已删除", "洽谈中", "已完成"],
      orderOptions: [],
      oilSpecList: []
    };
  },
  computed: {
    // 监听store.oilTypeList属性
    oilTypeList() {
      return this.$store.state.oilTypeList[this.oilType];
    },
    // 监听store.transportWay属性
    transportWay() {
      let tw = this.$store.state.transportWay;
      return tw[this.oilType];
    },
    isNullTable() {
      return this.orderOptions.length < 1;
    },
    uploadData() {
      return {
        oilType: this.oilType
      };
    },
    oilType: {
      get() {
        return this.$store.state.oilType;
      },
      set(val) {
        this.$store.commit("setOilType", val);
        this.onRadioChange(val);
      }
    }
  },
  watch: {
    oilType(val) {},
    oilTypeList(val) {},
    transportWay(val) {}
  },
  methods: {
    // 交易方
    getNormalData() {
      this.getDataList(url.selllist, this.form);
    },
    // 搜索传值
    orderSearchFn(sdata) {
      Object.assign(this.form, sdata);
      this.getNormalData();
    },
    formatePrice(ela, currency) {
      let price = ela.unitPrice * ela.number;
      ela.litotalPrice = fixed2(price) + " " + currency;
      ela.unitPrice = ela.unitPrice + " " + currency + "/" + ela.unit;
      ela.number = ela.number + " " + ela.unit;
    },
    // 获取列表数据
    getDataList(url, param) {
      this.$http(url, param).then(res => {
        let data = res.data;
        let tdata = data.datas;
        this.totalPage = data.total;
        this.currentPage = data.pageNum;
        if (tdata) {
          tdata.forEach((ele, i) => {
            this.formateTabData(ele);
            ele.goryList.forEach(ela => {
              this.formatePrice(ela, ele.currency);
            });
          });
          this.orderOptions = tdata;
        }
      });
    },
    formateTabData(data) {
      let status = data.status;
      if (data.aliveFlag === "0") status = data.aliveFlag;
      data.status = this.orderStatus[status];
      data.orderTime = formateDate(data.orderTime);
      data.pickUpTime = formateDate(data.pickUpTime);
    },
    downLoad() {
      window.open(url.orderBuyerExcel[this.oilType]);
    },
    exportTemplate() {
      let obj = {
        infoType: this.oilType,
        sellerCompanyId: this.sellerCompanyId,
        deliveryWay: this.form.deliveryWay,
        transportWay: this.form.transportWay,
        orderTimeEnd: this.form.orderTimeEnd,
        orderTimeStart: this.form.orderTimeStart,
        oilClassification: this.form.oilClassification,
        oilVarieties: this.form.oilVarieties,
        orderCode: this.form.orderCode,
        status: this.form.status,
        sysTag: this.form.sysTag,
        buyerCompanyId: ""
      };

      this.$http(url.sellerExportRIgnitionData, obj).then(res => {
        let eurl = res.data.datas;
        if (eurl) {
          window.open(eurl);
        } else {
          this.$message({
            type: "error",
            message: "导出失败"
          });
        }
      });
    },
    orderDelete(odata) {
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.orderDeleteById(odata);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    orderDeleteById(odata) {
      let ids = {
        orderId: odata.orderId
      };
      this.$http(url.Delorderignition, ids).then(res => {
        let data = res.data.status;
        if (data === 0) {
          odata.status = "已删除";
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        } else {
          this.$message.error("删除失败!");
        }
      });
    },
    orderSelectChange(val) {
      let params = val || {};
      this.$http(url.oilppms, params, "get").then(res => {
        this.oilSpecList = res.data.datas;
      });
    },
    uploadSuccess(res) {
      let data = res.datas;
      this.$message({
        type: "success",
        message: data
      });
      this.getNormalData();
    },
    uploadError() {
      this.$message.error("上传失败!");
    },
    uploadBefore(file) {
      let isExcel = file.type.indexOf("excel") > -1;
      if (!isExcel) {
        this.$message({
          message: "只能上传excel文件!",
          type: "error"
        });
      }
      return isExcel;
    },
    newPageData(pnum) {
      this.form.pageNum = pnum;
      this.getNormalData();
    },
    initSysData() {
      let stag = this.$store.state.sysTag;
      let iss = this.$store.state.isSystem;
      let otype = this.$route.query.oilType;

      this.form.sysTag = stag;
      this.isSystem = iss;
      this.sysTag = stag;
      if (iss) {
        this.uploadUrl = url.importRIgnitionData;
      }
      if (otype) {
        this.oilType = otype;
      } else {
        this.onRadioChange(this.oilType);
      }
    },
    onRadioChange(val) {
      this.clearSearchData();
      this.setInfoType(val);
      this.getNormalData();
    },
    clearSearchData() {
      let init = {
        orderTimeEnd: "",
        orderTimeStart: "",
        oilClassification: "",
        oilVarieties: "",
        transportWay: "",
        deliveryWay: "",
        orderCode: "",
        pageNum: 1,
        status: ""
      };
      Object.assign(this.form, init);
      let os = this.$refs.orderSearch;
      os.onDateChange();
    },
    setInfoType(val) {
      let itype = this.$store.state.infoTypes;
      let infos = itype[val].buy;
      let ios = [];
      infos.forEach(e => {
        ios.push(e.code);
      });
      let infoType = ios.join(",");
      this.form.infoType = infoType;
    },
    jump2center(orderId) {
      this.$router.push({
        name: "or-center",
        query: {
          orderId,
          sysTag: this.sysTag,
          oilType: this.oilType,
          enter: "or-sellup"
        }
      });
    }
  },
  mounted() {
    this.initSysData();
    // this.onRadioChange(this.oilType);
  }
};
</script>
