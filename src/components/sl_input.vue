<template>
  <div class="bar-right" v-title="'销售信息管理'">
    <el-form :model="form" :rules="rules" ref="msgForm" label-width="86px">
      <el-form-item label="信息类型:">
        <el-select v-if="isInput" v-model="form.infoType" placeholder="请选择">
          <el-option 
            v-for="item in oilTypes" 
            :key="item.code" 
            :label="item.zhName" 
            :value="item.zhName">
          </el-option>
        </el-select>
        <el-button v-else type="text">{{ infoTypeList }}</el-button>
      </el-form-item>
      <el-form-item label="发布日期:" prop="releasedDate">
        <el-date-picker
          type="date" 
          v-model="form.releasedDate" 
          value-format="yyyy-MM-dd" 
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="公司名称:" prop="epMemberName">
        <el-autocomplete  class="w-194"
          v-if="isSystem" 
          v-model="form.epMemberName" 
          :fetch-suggestions="querySearchAsync" 
          placeholder="请输入公司名称" 
          @focus="getCompanyData" 
          @select="handleCompanySelect"></el-autocomplete>
        <el-button v-else type="text">{{ form.epMemberName }}</el-button>
      </el-form-item>
      <el-form-item label="油品类型:" prop="oilClassification">
        <el-select v-model="form.oilClassification" @change="handleTypeChange" placeholder="请选择">
          <el-option 
            v-for="item in oilTypeList" 
            :key="item.code" 
            :label="item.zhName" 
            :value="item.zhName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规格:">
        <el-select v-model="form.oilVarieties" @change="handleSpecChange" :disabled="specDisable" placeholder="请选择">
          <el-option 
            v-for="item in oilSpecList"
            :key="item.code" 
            :label="item.zhName"
            :value="item.zhName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="提货方式:" prop="transportWay">
        <el-select v-model="form.transportWay" @change="handleTranChange" placeholder="请选择">
          <el-option
            v-for="(item, i) in transportType" 
            :key="i" 
            :label="item" 
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="运输方式:">
        <el-select v-model="form.deliveryWay" :disabled="isDeliver" placeholder="请选择">
          <el-option 
            v-for="item in deliveryType"
            :key="item.code" 
            :label="item.zhName" 
            :value="item.zhName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="单价:" prop="unitPrice">
        <el-input class="w-194" v-model.number="form.unitPrice"></el-input>
        <!-- <span>{{ setUnit }}</span> -->
        <span>元/</span>
        <el-select v-model="form.unit" style="width:70px">
          <el-option
            v-for="(item, i) in unitList" 
            :key="i" 
            :label="item" 
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在地区:" prop="area">
        <el-cascader 
          v-model="form.area" 
          :options="area"></el-cascader>
       </el-form-item>
      <el-form-item label="信息标题:">
        <span>{{ company }}</span>
        <span>{{ tagOilType }}</span>
        <span>{{ tagOilSpec }}</span>
        <span>{{ setAreaShow }}</span>
      </el-form-item>
      <el-form-item label="详细说明:">
        <el-input v-model="form.detailedDescription" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="产品图片:">
        <el-upload ref="uploadBox" 
          list-type="picture-card" 
          :limit="4" 
          :action="uploadAPI" 
          :file-list="picList" 
          :on-preview="handlePictureCardPreview" 
          :on-success="handleUpload" 
          :on-remove="handleRemove" 
          :disabled="uploadDisable"
          :before-upload="beforeImageUpload">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item class="index-form-last">
        <el-button type="primary" :disabled="btnFormSubmit" @click="validateForm">提交</el-button>
        <el-button :disabled="btnFormSubmit" @click="jump2list">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import API from "@/api/api.js";
import { formateDate, code2value, value2code, isNumber } from "@/util/filter.js";
import {
  provinceAndCityData,
  CodeToText,
  TextToCode
} from "element-china-area-data";

export default {
  data() {
    return {
      // oilType: 1,
      picList: [],
      oilTypes: [],
      oilSpecList: [],
      companyList: [],
      imgDeleteList: [],
      company: "",
      tagOilType: "",
      tagOilSpec: "",
      tagAreaShow: "",
      dialogImageUrl: "",
      validateMessage: "",
      isInput: true,
      isSystem: false,
      isDeliver: false,
      specDisable: false,
      dialogVisible: false,
      validateResult: true,
      uploadDisable: false,
      btnFormSubmit: false,
      uploadAPI: API.UPLOAD,
      unitList: ["吨", "桶"],
      infoTypeList: "船燃销售",
      area: provinceAndCityData,
      transportType: this.$store.state.deliveryWay,
      form: {
        area: [],
        unit: "吨",
        infoType: 1,
        infoTitle: "",
        unitPrice: "",
        deliveryWay: "",
        transportWay: "",
        releasedDate: "",
        oilVarieties: "",
        chmentsVOList: [],
        oilClassification: "",
        detailedDescription: ""
      },
      rules: {
        releasedDate: [{ message: "请选择发布日期", required: true }],
        area: [{ message: "请选择区域", required: true }],
        unitPrice: [
          { message: "请输入单价", required: true },
          { type: "number", message: "必须为数字值" },
          {
            pattern: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
            message: "最多两位小数"
          }
        ],
        transportWay: [{ message: "请选择提货方式", required: true }],
        deliveryWay: [{ message: "请选择运输方式", required: true }],
        oilClassification: [{ message: "请选择油品类型", required: true }],
        oilVarieties: [{ message: "请选择规格", required: true }],
        epMemberName: [{ message: "请输入公司名称", required: true }]
      }
    };
  },
  computed: {
    setAreaShow() {
      let text = [];
      let area = this.form.area;
      for (let i = 0; i < area.length; i++) {
        text.push(CodeToText[area[i]]);
      }
      this.tagAreaShow = text;
      return this.tagAreaShow.join("/");
    },
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
    oilType() {
      return this.$store.state.oilType;
    }
  },
  watch: {
    oilTypeList(val) {},
    deliveryType(val) {},
    oilType(val) {}
  },
  mounted() {
    let infos = this.$store.state.infoTypes;
    let iss = this.$store.state.isSystem;
    let param = this.$route.query;
    let types = infos[this.oilType].sell;

    this.oilTypes = types;
    this.isSystem = iss;
    if (param.uuid) {
      this.getPageData({
        uuid: param.uuid
      });
      this.isInput = false;
    } else {
      // this.form.infoType = types[0].code;
      this.form.infoType = types[0].zhName;
      if (!iss) this.initClientData();
    }
  },
  methods: {
    initClientData() {
      this.$http(API.COMPANY_USER, {}).then(res => {
        let data = res.data.datas;
        if (data) {
          this.company = data.name;
          this.form.epMemberName = data.name;
          this.form.epMemberId = data.memberId;
        }
      });
    },
    getUploadBox() {
      // 获取上传窗口(很不明智的操作)
      let div = this.$refs.uploadBox.$children[1];
      return div.$el;
    },
    getCompanyData() {
      if (this.companyList.length > 0) return this.companyList;
      this.$http(API.COMPANY_LIST).then(res => {
        let cdata = res.data.datas;
        if (cdata) {
          cdata.forEach(ele => {
            ele.value = ele.name;
          });
          this.companyList = cdata;
        }
      });
    },
    getSpecData(val) {
      // 油规格下拉框
      let param = {
        oilvarietie: val || ""
      };
      this.$http(API.OIL_SPEC, param, "get").then(res => {
        let sdata = res.data.datas;
        if (sdata && sdata.length > 0) {
          this.specDisable = false;
          this.oilSpecList = sdata;
        } else {
          this.specDisable = true;
          this.form.oilVarieties = "";
        }
      });
    },
    getAreaCode(province, city) {
      let provinceObj = TextToCode[province];
      let cityObj = provinceObj[city];
      return [provinceObj.code, cityObj.code];
    },
    getPageData(params) {
      this.$http(API.SL_PAGE, params).then(res => {
        let data = res.data.datas;
        if (data.infoVO) this.form = this.formateGetData(data.infoVO);
      });
    },
    validateForm() {
      if (this.validateResult) {
        this.$refs.msgForm.validate(valid => {
          if (valid) {
            this.formSubmit();
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        this.$message.error(this.validateMessage);
      }
    },
    formateChments(data) {
      if (!data) return [];
      data.forEach(ele => {
        ele.url = ele.path;
      });
      return data;
    },
    formateGetData(data) {
      this.company = data.epMemberName;
      this.infoTypeList = data.infoType;
      this.tagOilSpec = data.oilVarieties;
      this.tagOilType = data.oilClassification;
      this.isDeliver = data.transportWay === "自提";
      this.picList = this.formateChments(data.chmentsVOList);
      this.handleHideUpload();
      if (data.oilClassification) {
        let oilVarieties = value2code(data.oilClassification, this.oilTypeList);
        this.getSpecData(oilVarieties);
      }
      data.area = this.getAreaCode(data.locationProvince, data.locationCity);
      data.releasedDate = formateDate(data.releasedDate);

      return data;
    },
    formatePostData(data) {
      let strArea = this.tagAreaShow.join("/");
      let titleList = [this.company, this.tagOilType, this.tagOilSpec, strArea];
      let chmentsVOList = this.picList.concat(this.imgDeleteList);
      let locationProvince = this.tagAreaShow[0];
      let locationCity = this.tagAreaShow[1];
      let fdata = this.formValue2code(data);
      let infoTitle = titleList.join(" ");
      
      return {
        uuid: data.uuid,
        unit: data.unit,
        infoId: data.infoId,
        infoTitle: infoTitle,
        infoType: fdata.infoType,
        unitPrice: data.unitPrice,
        locationCity: locationCity,
        epMemberId: data.epMemberId,
        epMemberName: data.epMemberName,
        chmentsVOList: chmentsVOList,
        deliveryWay: fdata.deliveryWay,
        detailedDescription: data.detailedDescription,
        releasedDate: data.releasedDate,
        transportWay: fdata.transportWay,
        locationProvince: locationProvince,
        oilVarieties: fdata.oilVarieties,
        oilClassification: fdata.oilClassification
      };
    },
    formValue2code(data){
      let types = this.$store.state.infoTypes;
      let type = types[this.oilType].sell;
      let tw = data.transportWay;

      let infoType = value2code(data.infoType, type);
      let deliveryWay = value2code(data.deliveryWay, this.deliveryType);
      let oilVarieties = value2code(data.oilVarieties, this.oilSpecList);
      let oilClassification = value2code(data.oilClassification, this.oilTypeList);
      let transportWay = this.transportType.indexOf(tw) + 1;

      return {
        infoType,
        deliveryWay,
        oilVarieties,
        transportWay,
        oilClassification
      }
    },
    formSubmit() {
      let params = this.formatePostData(this.form);
      this.$http(API.SL_INPUT, params).then(res => {
        let data = res.data;
        if (data.status === 0) {
          this.$message({
            message: "提交成功,2秒后跳转到列表页!",
            type: "success",
            duration: 3000
          });
          this.btnFormSubmit = true;
          let jump2list = this.jump2list;
          setTimeout(jump2list, 2000);
        }
      });
    },
    handleUpload(res) {
      let url = res.datas;
      if (url) {
        this.picList.push({
          id: "",
          url: url,
          path: url
        });
        this.$message({
          message: "图片上传成功!",
          type: "success"
        });
        this.handleHideUpload();
      } else {
        this.$message.error("图片上传失败");
      }
    },
    handleHideUpload() {
      let box = this.getUploadBox();
      if (this.picList.length > 3) {
        box.style = "display: none";
      } else {
        box.style = "";
      }
    },
    handleRemove(file, filelist) {
      file.url = "";
      file.path = "";
      this.picList = filelist;
      this.handleHideUpload();
      this.imgDeleteList.push(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleTypeChange(val) {
      this.tagOilSpec = " ";
      this.tagOilType = val;
      this.form.oilVarieties = "";
      let otype = value2code(val, this.oilTypeList);
      this.getSpecData(otype);
    },
    handleSpecChange(val) {
      // this.tagOilSpec = code2value(val, this.oilSpecList);
      this.tagOilSpec = val;
    },
    handleTranChange(val) {
      let isDeliver = val === "自提";
      this.isDeliver = isDeliver;
      this.form.deliveryWay = "";
    },
    beforeImageUpload(file) {
      let isJPG = file.type.indexOf("image") > -1;
      let isLt5M = file.size / 1024 / 1024 < 5;
      if (!isJPG) {
        this.$message({
          message: "只能上传图片类型!",
          type: "error"
        });
      }
      if (!isLt5M) {
        this.$message({
          message: "文件尺寸最大5M!",
          type: "error"
        });
      }
      return isJPG && isLt5M;
    },
    handleCompanySelect(item) {
      this.company = item.name;
      this.form.epMemberId = item.memberId;
      this.form.epMemberName = item.name;
      this.validateResult = true;
    },
    querySearchAsync(queryString, cb) {
      let comlist = this.companyList;
      let results = queryString
        ? comlist.filter(this.createStateFilter(queryString))
        : comlist;
      if (results.length < 1) {
        this.validateResult = false;
        this.validateMessage = "请选择已注册的公司!";
        this.$message.error(this.validateMessage);
      }
      cb(results);
    },
    createStateFilter(queryString) {
      return state => {
        let rest = false;
        let name = state.name;
        if (name) {
          rest = name.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
        }
        return rest;
      };
    },
    jump2list() {
      let query = {};
      if (this.isSystem) {
        query.sysTag = 1;
      }
      this.$router.push({
        name: "sl-manage",
        query
      });
    }
  }
};
</script>

<style scoped>
.w-194 {
  width: 194px;
}
</style>
