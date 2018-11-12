<template>
  <div class="bar-right" v-title="'采购信息管理'">
    <!-- <div class="oil-title-2">采购信息管理</div> -->
    <div class="clearfix oil-type-list">
      <el-radio-group v-model="oilType">
        <el-radio-button v-for="(item, i) in oilTypes" :key="i" :label="item.code">{{ item.zhName }}</el-radio-button>
      </el-radio-group>
      <el-button class="float-r" type="primary" @click="jump2input">发布需求</el-button>
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
        :status-list="statusList" 
        :onSelectChange="onSelectChange"></manage-search>
    </div>
    <el-table class="index-table" :data="tableData" style="width: 100%" border>
      <el-table-column prop="releasedDate" label="发布日期" width="100"></el-table-column>
      <!-- <el-table-column prop="infoTitle" label="信息标题" width="250"></el-table-column> -->
      <el-table-column prop="ypname" label="油品类别"></el-table-column>
      <el-table-column prop="ggname" label="规格"></el-table-column>
      <el-table-column prop="transportWay" label="提货方式"></el-table-column>
      <el-table-column prop="deliveryWay" label="运输方式"></el-table-column>
      <el-table-column prop="unitNumber" label="数量"></el-table-column>
      <el-table-column prop="area" label="所在地区"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column v-if="isSystem" label="操作" width="300px" fixed="right">
        <template slot-scope="scope">
          <el-button @click="jump2offer(scope.row)" type="primary" size="mini">报价单</el-button>
          <el-button @click="jump2page(scope.row)" type="primary" size="mini">详情</el-button>
          <el-button @click="jump2input(scope.row)" type="primary" size="mini" v-if="scope.row.unSoldOut">修改</el-button>
          <el-button @click="delOffer(tableData, scope.$index)" type="primary" v-if="scope.row.unSoldOut" size="mini">撤消</el-button>
        </template>
      </el-table-column>
      <el-table-column v-else label="操作" width="200px" fixed="right">
        <template slot-scope="scope">
          <el-button @click="jump2page(scope.row)" type="primary" size="mini">详情</el-button>
          <el-button @click="jump2input(scope.row)" type="primary" size="mini" v-if="scope.row.unSoldOut" style="margin-left:0">修改</el-button>
          <el-button @click="delOffer(tableData, scope.$index)" type="primary" size="mini" v-if="scope.row.unSoldOut" style="margin-left:0">撤消</el-button>
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
      statusList: ["已发布", "已确认", "已撤消"],
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
    // 重置搜索表单
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
    // 获取信息类型
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
    // 获取订单列表数据
    getOfferData() {
      let param = this.initClientForm();
      this.$http(API.BY_MANAGE, param).then(res => {
        let data = res.data;
        let tabData = data.datas;
        this.totalPage = data.total;
        this.currentPage = data.pageNum;
        this.tableData = this.formateTabData(tabData);
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
    // 格式化订单列表数据
    formateTabData(data) {
      data.forEach(e => {
        e.releasedDate = formateDate(e.releasedDate);
        e.unitNumber = e.number + e.unit;
        e.area = e.locationProvince + "/" + e.locationCity;
        e.unSoldOut = e.status === "已发布";
      });
      return data;
    },
    // 事件：切换油品类型
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
    // 事件：提交表单
    onFormSubmit(data) {
      this.formateFormData(data);
      this.getOfferData();
    },
    // 事件：切换油种
    onRadioChange(val) {
      this.clearSearchData();
      this.setInfoType(val);
      this.getOfferData();
    },
    formateFormData(data) {
      if (data) {
        data.issueTimeStart = formateDate(data.issueTimeStart);
        data.issueTimeEnd = formateDate(data.issueTimeEnd);
      }
    },
    // 跳转：详情页
    jump2page(row) {
      this.$router.push({
        name: "by-page",
        query: {
          uuid: row.uuid,
          sysTag: this.sysTag
        }
      });
    },
    // 跳转：发布页
    jump2input(row) {
      let query = {
        sysTag: this.sysTag,
        oilType: this.oilType
      };
      if (row.uuid) {
        query.uuid = row.uuid; // 修改
      }
      this.$router.push({
        name: "by-input",
        query
      });
    },
    // 跳转：报价单
    jump2offer(row) {
      this.$router.push({
        name: "by-offer",
        query: {
          needUuid: row.uuid,
          sysTag: this.sysTag,
          oilType: this.oilType
        }
      });
    },
    // 撤销报价单
    delOffer(rows, index) {
      this.$confirm("此操作将撤消该订单, 是否继续?", "提示", {
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
            message: "已取消撤消"
          });
        });
    },
    // 请求：撤销报价单
    reqDelOffer(rows, index) {
      let row = rows[index];
      let param = {
        uuid: row.uuid
      };
      this.$http(API.BY_RECOVATION, param).then(res => {
        let data = res.data;
        if (data.status === 0) {
          this.$message({
            message: "撤消成功!",
            type: "success"
          });
          this.changeStatus(row);
        } else {
          this.$message.error("撤消失败!");
        }
      });
    },
    // 本地：撤销报价单
    changeStatus(row) {
      row.status = "已撤销";
      row.unSoldOut = false;
    },
    // 分页查询
    newPageData(pnum) {
      this.form.pageNum = pnum;
      this.getOfferData();
    }
  }
};
</script>

