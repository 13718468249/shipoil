<template>
  <div class="bar-right" v-title="'销售详情'">
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
        <span>{{ form.oilClassification }}</span>
      </el-form-item>
      <el-form-item label="规格:">
        <span>{{ form.oilVarieties }}</span>
      </el-form-item>
      <el-form-item label="提货方式:">
        <span>{{ form.transportWay }}</span>
      </el-form-item>
      <el-form-item label="运输方式:">
        <span>{{ form.deliveryWay }}</span>
      </el-form-item>
      <el-form-item label="单价:">
        <span>{{ form.unitPrice }}&nbsp;元/{{ form.unit }}</span>
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
          <el-col :span="4" v-for="(item, i) in form.chmentsVOList" :key="i" :offset="i > 0 ? 1 : 0">
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
import API from '@/api/api.js';
import { formateDate } from '@/util/filter.js';

export default {
  data() {
    return {
      infoTypeList: "船燃销售",
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
  mounted(){
    let param = this.$route.query;
    this.getPageData({
      uuid: param.uuid
    });
  },
  methods: {
    getPageData(param){
      this.$http(API.SL_PAGE, param).then(res => {
        let data = res.data.datas;
        if(data){
          let pdata = data.infoVO;
          if(pdata) this.form = this.formateData(pdata);
        }
      });
    },
    formateData(data){
      this.infoTypeList = data.infoType;
      data.createDate = formateDate(data.createDate);
      return data;
    },
    jump2list(){
      this.$router.go(-1);
    }
  }
};
</script>

<style>
.w-194{
  width: 194px;
}
.image {
  width: 100%;
  display: block;
}
</style>
