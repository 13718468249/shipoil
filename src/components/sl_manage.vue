<template>
  <div class="bar-right" v-title="'销售信息管理'">
    <!-- <div class="oil-title-2">销售信息管理</div> -->
    <div class="clearfix oil-type-list">
      <el-radio-group v-model="oilType">
        <el-radio-button v-for="(item, i) in oilTypes" :key="i" :label="item.code">{{ item.zhName }}</el-radio-button>
      </el-radio-group>
      <el-button class="float-r" type="primary" @click="jump2input">发布商品</el-button>
    </div>
    <div class="bar-search">
      <manage-search 
        :form-data="form" 
        :is-system="isSystem" 
        :oil-type-list="oilTypeList" 
        :oil-spec-list="oilSpecList" 
        :delivery-list="deliveryType" 
        :transport-way="transportWay" 
        :onSubmit="onFormSubmit" 
        :onSelectChange="onSelectChange"></manage-search>
    </div>
    <el-table class="index-table" :data="tableData" style="width: 100%" border>
      <el-table-column prop="RELEASED_DATE" label="发布日期" width="100"></el-table-column>
      <!-- <el-table-column prop="INFO_TITLE" label="信息标题" width="250"></el-table-column> -->
      <el-table-column prop="OIL_CLASSIFICATION" label="油品类别"></el-table-column>
      <el-table-column prop="OIL_VARIETIES" label="规格"></el-table-column>
      <el-table-column prop="TRANSPORT_WAY" label="提货方式"></el-table-column>
      <el-table-column prop="DELIVERY_WAY" label="运输方式"></el-table-column>
      <el-table-column prop="unitPrice" label="单价"></el-table-column>
      <el-table-column prop="area" label="所在地区"></el-table-column>
      <el-table-column prop="STATUS" label="状态"></el-table-column>
      <el-table-column v-if="isSystem" label="操作" width="300px" fixed="right">
        <template slot-scope="scope">
          <el-button @click="jump2offer(scope.row)" type="primary" size="mini">询价单</el-button>
          <el-button @click="jump2page(scope.row)" type="primary" size="mini">详情</el-button>
          <el-button @click="jump2input(scope.row)" type="primary" size="mini" v-if="scope.row.unSoldOut">修改</el-button>
          <el-button @click="delOffer(tableData, scope.$index)" type="primary" size="mini" v-if="scope.row.unSoldOut">下架</el-button>
        </template>
      </el-table-column>
      <el-table-column v-else label="操作" width="200px" fixed="right">
        <template slot-scope="scope">
          <el-button @click="jump2page(scope.row)" type="primary" size="mini">详情</el-button>
          <el-button @click="jump2input(scope.row)" type="primary" size="mini" v-if="scope.row.unSoldOut" style="margin-left:0">修改</el-button>
          <el-button @click="delOffer(tableData, scope.$index)" type="primary" size="mini" v-if="scope.row.unSoldOut" style="margin-left:0">下架</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-box">
      <el-pagination 
        background 
        layout="prev,pager,next" 
        :pager-count="5" 
        :total="totalPage" 
        :current-page="currentPage" 
        @current-change="newPageData">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import API from "@/api/api.js";
import ManageSearch from "@/common/manageSearch.vue";
import { formateDate, code2value } from "@/util/filter.js";

export default {
  components: {
    ManageSearch
  },
  data() {
    return {
      sysTag: 0,
      currentPage: 1,
      isSystem: false,
      transportWay: this.$store.state.deliveryWay,
      oilTypes: this.$store.state.oilTypes,
      oilSpecList: [],
      tableData: [],
      totalPage: 0,
      form: {
        issueTimeEnd: "",
        issueTimeStart: "",
        oilClassification: "",
        oilVarieties: "",
        transportWay: "",
        deliveryWay: "",
        infoType: 1,
        status: "",
        sysTag: 0
      }
    };
  },
  computed: {
    // 监听store.oilTypeList属性
    oilTypeList() {
      let olist = this.$store.state.oilTypeList;
      return olist[this.oilType];
    },
    // 监听store.transportWay属性
    deliveryType() {
      let tw = this.$store.state.transportWay;
      return tw[this.oilType];
    },
    oilType: {
      get() {
        return this.$store.state.oilType;
      },
      set(val) {
        this.$store.commit("setOilType", val);
        this.onRadioChange(val);
      }
    },
    epMember() {
      return this.$store.state.epMember;
    }
  },
  watch: {
    oilType(val) {},
    oilTypeList(val) {},
    deliveryType(val) {},
    epMember(val) {}
  },
  mounted() {
    let iss = this.$store.state.isSystem;
    let stag = this.$store.state.sysTag;

    this.form.sysTag = stag;
    this.isSystem = iss;
    this.sysTag = stag;

    this.onRadioChange(this.oilType);
  },
  methods: {
    clearSearchData() {
      let init = {
        issueTimeEnd: "",
        issueTimeStart: "",
        oilClassification: "",
        oilVarieties: "",
        transportWay: "",
        deliveryWay: "",
        pageNum: 1,
        status: ""
      };
      Object.assign(this.form, init);
    },
    setInfoType(val) {
      let itype = this.$store.state.infoTypes;
      let infos = itype[val].sell;
      let ios = [];
      infos.forEach(e => {
        ios.push(e.code);
      });
      let infoType = ios.join(",");
      this.form.infoType = infoType;
    },
    getOfferData() {
      let param = this.initClientForm();
      let istype = Number(this.isSystem);
      this.$http(API.SL_MANAGE[istype], param).then(res => {
        let data = res.data;
        let tabData = data.datas;
        this.totalPage = data.total;
        this.currentPage = data.pageNum;
        if (tabData) this.tableData = this.formateTabData(tabData);
      });
    },
    initClientForm() {
      let param = {};
      if (this.isSystem) {
        param = this.form;
      } else {
        Object.assign(param, this.form);
        param.personal = "1";
      }
      return param;
    },
    onSelectChange(val) {
      this.$http(
        API.OIL_SPEC,
        {
          oilvarietie: val
        },
        "get"
      ).then(res => {
        this.oilSpecList = res.data.datas;
      });
    },
    onRadioChange(val) {
      this.clearSearchData();
      this.setInfoType(val);
      this.getOfferData();
    },
    onFormSubmit(data) {
      this.form = this.formateFormData(data);
      // console.log(this.form);
      this.getOfferData();
    },
    formateFormData(data) {
      if (data) {
        data.releaseBeginDate = formateDate(data.issueTimeStart);
        data.releaseEndDate = formateDate(data.issueTimeEnd);
        data.pageNum = 1;
      }
      return data;
    },
    formateTabData(data) {
      data.forEach(e => {
        e.RELEASED_DATE = formateDate(e.RELEASED_DATE);
        e.area = e.LOCATION_PROVINCE + "/" + e.LOCATION_CITY;
        e.unitPrice = e.UNIT_PRICE + "元/" + e.UNIT;
        e.unSoldOut = e.STATUS === "已发布";
      });
      return data;
    },
    jump2page(row) {
      this.$router.push({
        name: "sl-page",
        query: {
          uuid: row.UUID,
          sysTag: this.sysTag
        }
      });
    },
    jump2input(row) {
      let query = {
        sysTag: this.sysTag,
        oilType: this.oilType
      };
      if (row.UUID) {
        query.uuid = row.UUID; // 修改
      }
      this.$router.push({
        name: "sl-input",
        query
      });
    },
    jump2offer(row) {
      this.$router.push({
        name: "sl-inquiry",
        query: {
          uuid: row.UUID,
          sysTag: this.sysTag,
          oilType: this.oilType
        }
      });
    },
    delOffer(rows, index) {
      this.$confirm("此操作将下架该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.reqDelOffer(rows, index);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消下架"
          });
        });
    },
    reqDelOffer(rows, index) {
      let row = rows[index];
      let param = {
        uuid: row.UUID
      };
      this.$http(API.SL_SOLDOUT, param).then(res => {
        let rdata = res.data;
        if (rdata.status === 0) {
          this.$message({
            message: "下架成功!",
            type: "success"
          });
          this.changeStatus(row);
        } else {
          this.$message.error("下架失败!");
        }
      });
    },
    changeStatus(row) {
      row.STATUS = "已下架";
      row.unSoldOut = false;
    },
    newPageData(pnum) {
      this.form.pageNum = pnum;
      this.getOfferData();
    }
  }
};
</script>

