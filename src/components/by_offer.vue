<template>
  <div class="bar-right" v-title="'报价单'">
    <div class="oil-title-2">{{ oilType }}报价单</div>
    <div class="bar-search">
      <form-msg :form-data="form" :type="type"></form-msg>
    </div>
    <el-table class="index-table" :data="tableData" style="width: 100%" border>
      <el-table-column prop="createDate" label="报价日期" width="100"></el-table-column>
      <el-table-column prop="companyName" label="公司名称"></el-table-column>
      <!-- <el-table-column prop="userName" label="公司账号"></el-table-column> -->
      <el-table-column prop="price" label="报价"></el-table-column>
      <el-table-column prop="contacts" label="联系人"></el-table-column>
      <el-table-column prop="tel" label="联系电话" width="120"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="address" label="操作" fixed="right" width="180">
        <template slot-scope="scope">
          <el-button 
            v-for="(item, i) in btnList" 
            :key="i" 
            :disabled="scope.row.isSoldOut"
            :type="scope.row.status===item?'':'primary'" 
            @click="changeStatus(scope.row, item)" 
            size="mini">{{ item }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-box">
      <el-pagination 
        background 
        layout="prev, pager, next"
        :pager-count="5" 
        :total="totalPage" 
        @current-change="newPageData">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import API from "@/api/api.js";
import FormMsg from "@/common/formMsg.vue";
import { formateDate, code2value } from "@/util/filter.js";

export default {
  components: {
    FormMsg
  },
  data() {
    return {
      form: {
        infoTitle: "",
        deliveryWay: "",
        transportWay: "",
        unitNumber: "",
        unitPrice: 0
      },
      statusList: ["未联系", "已联系", "已成交", "有效", "无效"],
      btnList: ["已联系", "已成交"],
      reqOfferFinished: false,
      reqPageFinished: false,
      tableData: [],
      totalPage: 0,
      oilType: "",
      status: "3",
      unit: "吨",
      type: 2
    };
  },
  watch: {
    // 监听单据请求
    reqPageFinished(val) {
      if (this.reqOfferFinished)
        this.tableData = this.formateTabData(this.tableData);
    }
  },
  mounted() {
    let param = this.$route.query;
    this.getPageData({
      uuid: param.needUuid,
      sysTag: param.sysTag
    });
    this.getOfferData({
      needUuid: param.needUuid,
      type: this.type
    });
    let otype = param.oilType;
    let types = this.$store.state.oilTypes;
    this.oilType = code2value(otype, types);
  },
  methods: {
    // 获取订单条目数据
    getPageData(param) {
      this.$http(API.BY_PAGE, param, "get").then(res => {
        let data = res.data.datas;
        if (data) {
          data.numberUnit = data.number + " " + data.unit;
          this.reqPageFinished = true;
          this.status = data.status;
          this.unit = data.unit;
          this.form = data;
        }
      });
    },
    getOfferData(param) {
      this.$http(API.OFFER, param).then(res => {
        let data = res.data;
        let tabData = data.datas;
        this.totalPage = data.total;
        this.reqOfferFinished = true;
        this.tableData = this.formateTabData(tabData);
      });
    },
    formateTabData(data) {
      if (data) {
        data.forEach(e => {
          e.createDate = formateDate(e.createDate);
          e.isSoldOut = this.isSoldOut(e);
          e.price = this.formatePrice(e.price);
        });
      }
      return data;
    },
    formatePrice(price) {
      let pric = price + "";
      let currency = "元/";
      let unit = currency + this.unit;
      if (pric.indexOf(currency) > -1) {
        pric = pric.split(currency)[0];
      }
      pric += unit;
      return pric;
    },
    isSoldOut(e) {
      return (
        this.status === "已撤销" ||
        this.status === "3" ||
        e.status === "已成交" ||
        e.status === "3"
      );
    },
    onFormSubmit(data) {
      this.formateFormData(data);
      this.getOfferData();
    },
    formateFormData(data) {
      if (data) {
        data.issueTimeStart = formateDate(data.issueTimeStart);
        data.issueTimeEnd = formateDate(data.issueTimeEnd);
      }
    },
    jump2page(row) {
      this.$router.push({
        name: "by-page",
        params: {
          uuid: row.needUuid
        }
      });
    },
    changeStatus(row, val) {
      if (row.status === val) return;
      let index = this.btnList.indexOf(val);
      let obj = {
        uuid: row.uuid,
        status: index + 2
      };
      this.updateOffer(obj);
      row.status = val;
      if (val === "已成交" || val === 3) {
        row.isSoldOut = true;
      }
    },
    updateOffer(param) {
      this.$http(API.OFFER_UPDATE, param).then(res => {
        let data = res.data;
        if (data.status === 0) {
          this.$message({
            message: "状态修改成功!",
            type: "success"
          });
        } else {
          this.$message.error("状态修改失败!");
        }
      });
    },
    newPageData(pnum) {
      this.form.pageNum = pnum;
      this.getOfferData();
    }
  }
};
</script>

