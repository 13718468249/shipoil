<template>
  <el-form :inline="true" :model="formData" label-width="84px">
    <el-form-item label="报价日期:" :class="isSystem?'':'mg-r-0'">
      <el-date-picker
        :class="isSystem?'':'w-267'"
        popper-class="oil-type"
        v-model="datePicker"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="联系人:" :class="isSystem?'':'mg-r-1'">
      <el-input v-model="formData.contacts" :class="isSystem?'':'w-267'"></el-input>
    </el-form-item>
    <el-form-item label="公司名称:" :class="isSystem?'':'mg-r-0'">
      <el-input v-model="formData.epMemberName" :class="isSystem?'':'w-267'"></el-input>
    </el-form-item>
    <el-form-item label="联系电话:" :class="isSystem?'':'mg-r-1'">
      <el-input v-model="formData.tel" :class="isSystem?'':'w-267'"></el-input>
    </el-form-item>
    <el-form-item label="公司帐号:" :class="isSystem?'':'mg-r-0'">
      <el-input v-model="formData.account" :class="isSystem?'':'w-267'"></el-input>
    </el-form-item>
    <el-form-item label="状态:" :class="isSystem?'':'mg-r-1'">
      <el-select v-model="formData.status" clearable placeholder="请选择" :class="isSystem?'':'w-267'">
        <el-option class="oil-type"
          v-for="(item, i) in statusList"
          :key="i"
          :label="item"
          :value="i+1">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="mg-b-20">
      <el-button type="primary" @click="onSubmit">搜索</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      datePicker: []
    };
  },
  props: {
    statusList:{
      type: Array,
      default: []
    },
    formData: {
      type: Object,
      default: {
        issueTimeStart:"",
        issueTimeEnd: "",
        epMemberName: "",
        contacts: "",
        account: "",
        status: "",
        pageNum: 1,
        tel: "",
        type: 2
      }
    }
  },
  methods: {
    onSubmit(){
      this.$emit("form-submit", this.formateFormData(this.formData));
    },
    formateFormData(data){
      if(this.datePicker){
        data.issueTimeStart = this.datePicker[0];
        data.issueTimeEnd = this.datePicker[1];
      }else{
        data.issueTimeStart = "";
        data.issueTimeEnd = "";
      }
      return data;
    }
  }
};
</script>

