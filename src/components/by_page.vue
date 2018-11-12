<template>
  <div class="bar-right" v-title="'采购详情'">
    <el-form :model="form" label-width="86px">
      <el-form-item label="信息类型:">
        <el-button type="text">{{ infoTypeList }}</el-button>
      </el-form-item>
      <el-form-item label="发布日期:">
        <span>{{ form.releasedDate }}</span>
      </el-form-item>
      <el-form-item label="公司名称:">
        <span>{{ form.epMemberName }}</span>
      </el-form-item>
      <el-form-item label="油品类型:">
        <span>{{ form.ypname }}</span>
      </el-form-item>
      <el-form-item label="规格:">
        <span>{{ form.ggname }}</span>
      </el-form-item>
      <el-form-item label="提货方式:">
        <span>{{ form.transportWay }}</span>
      </el-form-item>
      <el-form-item label="运输方式:">
        <span>{{ form.deliveryWay }}</span>
      </el-form-item>
      <el-form-item label="数量:">
        <span>{{ form.number }}&nbsp;{{ form.unit }}</span>
      </el-form-item>
      <el-form-item label="所在地区:">
        <span>{{ form.locationProvince }}/{{ form.locationCity }}</span>
       </el-form-item>
      <el-form-item label="信息标题:">
        <span>{{ form.infoTitle }}</span>
      </el-form-item>
      <el-form-item label="详细说明:">
        <span>{{ form.detailedDescription }}</span>
      </el-form-item>
      <el-form-item label="产品图片:">
        <el-row>
          <el-col :span="4" v-for="(item, i) in form.chments" :key="i" :offset="i > 0 ? 1 : 0">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="item.path" class="image">
            </el-card>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="jump2list">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import API from "@/api/api.js";
import { formateDate } from "@/util/filter.js";

export default {
  data() {
    return {
      infoTypeList: "船燃采购",
      form: {
        createDate: "",
        oilType: "",
        price: "",
        port: "",
        pic: "",
        spec: "",
        area: [],
        detail: "",
        transType: "",
        datePicker: "",
        deliveryType: ""
      }
    };
  },
  created() {
    this.getPageData();
  },
  methods: {
    getPageData() {
      let param = this.$route.query;
      this.$http(API.BY_PAGE, param, "get").then(res => {
        let data = res.data.datas;
        if (data) this.form = this.formateData(data);
      });
    },
    formateData(data) {
      this.infoTypeList = data.infoType;
      data.oilVarieties= data.ggname;
      data.oilClassification = data.ypname;
      data.releasedDate = formateDate(data.releasedDate);
      return data;
    },
    jump2list(){
      this.$router.go(-1);
    }
  }
};
</script>

<style>
.w-194 {
  width: 194px;
}
.image {
  width: 100%;
  display: block;
}
</style>
