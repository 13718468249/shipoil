<template>
  <el-form :inline="true" :model="formData" label-width="84px">
    <el-form-item label="发布日期:" :class="isSystem?'':'mg-r-0'">
      <el-date-picker :class="isSystem?'':'w-267'"
        v-model="datePicker"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期" 
        end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="状态:" :class="isSystem?'':'mg-r-1'">
      <el-select v-model="formData.status" clearable placeholder="请选择" :class="isSystem?'':'w-267'">
        <el-option 
          v-for="(item, i) in statusList"
          :key="i"
          :label="item"
          :value="i+1">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="油品类别:" :class="isSystem?'':'mg-r-0'">
      <el-select 
        v-model="formData.oilClassification" 
        clearable 
        @change="onOptionChange" 
        placeholder="请选择" 
        :class="isSystem?'':'w-267'">
        <el-option 
          v-for="item in oilTypeList"
          :key="item.code"
          :label="item.zhName"
          :value="item.code">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="规格:" :class="isSystem?'':'mg-r-1'">
      <el-select v-model="formData.oilVarieties" clearable :disabled="noDeliver" placeholder="请选择" :class="isSystem?'':'w-267'">
        <el-option 
          v-for="item in oilSpecList"
          :key="item.code"
          :label="item.zhName"
          :value="item.code">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="提货方式:" :class="isSystem?'':'mg-r-0'">
      <el-select v-model="formData.transportWay" clearable placeholder="请选择" :class="isSystem?'':'w-267'">
        <el-option 
          v-for="(item, i) in transportWay"
          :key="i"
          :label="item"
          :value="i+1">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="运输方式:" :class="isSystem?'':'mg-r-1'">
      <el-select v-model="formData.deliveryWay" clearable placeholder="请选择" :disabled="isDeliver" :class="isSystem?'':'w-267'">
        <el-option 
          v-for="item in deliveryList"
          :key="item.code"
          :label="item.zhName"
          :value="item.code">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="mg-b-20">
      <el-button type="primary" @click="onFormSubmit">搜索</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      datePicker: [],
      noDeliver: true
    };
  },
  props: {
    oilTypeList: Array,
    oilSpecList: Array,
    deliveryList: Array,
    transportWay: Array,
    isSystem: {
      type: Boolean,
      default: false
    },
    onPageJump: {
      type: Function,
      default() {}
    },
    onSubmit: {
      type: Function,
      default() {}
    },
    onSelectChange: {
      type: Function,
      default() {}
    },
    formData: {
      type: Object,
      default: {
        issueTimeEnd: "",
        issueTimeStart: "",
        oilClassification: "",
        oilVarieties: "",
        transportWay: "",
        deliveryWay: "",
        pageNum: 1,
        status: ""
      }
    },
    statusList: {
      type: Array,
      default() {
        return ["已发布", "已确认", "已下架"];
      }
    }
  },
  computed: {
    isDeliver() {
      this.formData.deliveryWay = "";
      return this.formData.transportWay === 2;
    }
  },
  watch: {
    oilSpecList(val) {
      if (val) {
        this.noDeliver = val.length < 1;
      } else {
        this.noDeliver = true;
      }
    }
  },
  methods: {
    onFormSubmit() {
      let fdata = this.formateFormData(this.formData);
      this.onSubmit(fdata);
    },
    onOptionChange() {
      this.formData.oilVarieties = "";
      this.onSelectChange(this.formData.oilClassification);
    },
    formateFormData(data) {
      data.issueTimeStart = "";
      data.issueTimeEnd = "";
      if (this.datePicker) {
        let len = this.datePicker.length;
        if (len > 0) {
          data.issueTimeStart = this.datePicker[0];
          data.issueTimeEnd = this.datePicker[1];
        }
      }
      return data;
    }
  }
};
</script>



