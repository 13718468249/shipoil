<template>
  <el-form ref="form" :model="formData" :inline="true" label-width="84px">
    <el-form-item label="创建日期:" :class="isSystem?'':'mg-r-0'">
      <el-date-picker class="w-267"
        v-model="datePicker" 
        clearable 
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="订单状态:" :class="isSystem?'':'mg-r-1'">
      <el-select v-model="formData.status" placeholder="请选择" clearable :class="isSystem?'':'w-267'">
        <el-option
          v-for="item in orderStatus"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="油品类别:" :class="isSystem?'':'mg-r-0'">
      <el-select v-model="formData.oilClassification" @change="onOpitonChange" placeholder="请选择" clearable :class="isSystem?'':'w-267'">
        <el-option
          v-for="item in oilvarieties" 
          :key="item.code" 
          :label="item.zhName" 
          :value="item.code">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="规格:" :class="isSystem?'':'mg-r-1'">
      <el-select v-model="formData.oilVarieties" placeholder="请选择" clearable :disabled="noDeliver" :class="isSystem?'':'w-267'">
        <el-option
          v-for="item in oilppms" 
          :key="item.code" 
          :label="item.zhName" 
          :value="item.code">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="提货方式:" :class="isSystem?'':'mg-r-0'">
      <el-select v-model="formData.deliveryWay" placeholder="请选择" clearable @change="onDeliverChange" :class="isSystem?'':'w-267'">
        <el-option 
          v-for="(item, i) in deliveryWay" 
          :key="i" 
          :label="item" 
          :value="i+1">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="运输方式:" :class="isSystem?'':'mg-r-1'">
      <el-select v-model="formData.transportWay" placeholder="请选择" clearable :disabled="unDeliver" :class="isSystem?'':'w-267'">
        <el-option
          v-for="item in tranportways"
          :key="item.code"
          :label="item.zhName"
          :value="item.code">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="订单号:" :class="isSystem?'':'mg-r-0'">
      <el-input v-model="formData.orderCode" clearable :class="isSystem?'':'w-267'"></el-input>
    </el-form-item>
    <el-form-item class="mg-b-20">
      <el-button type="primary" @click="search">搜索</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { formateDate } from "@/util/filter";

export default {
  data() {
    return {
      deliveryWay: this.$store.state.deliveryWay,
      unDeliver: false,
      noDeliver: true,
      orderStatus: [
        { value: 1, label: "洽谈中" },
        { value: 2, label: "已完成" }
      ],
      datePicker: []
    };
  },
  computed: {
    isSystem() {
      return this.$store.state.isSystem;
    }
  },
  watch: {
    oilppms(val) {
      if (val) {
        if (val.length > 0) this.noDeliver = false;
      } else {
        this.noDeliver = true;
      }
    }
  },
  props: {
    oilvarieties: {
      type: Array,
      default() {
        return [];
      }
    },
    tranportways: {
      type: Array,
      default() {
        return [];
      }
    },
    oilppms: {
      type: Array,
      default: []
    },
    formData: {
      type: Object,
      default() {
        return {
          status: "", // 状态
          sysTag: "",
          pageNum: 1,
          orderCode: "", // 订单号
          deliveryWay: "",
          transportWay: "", // 运输方式
          oilVarieties: "", // 规格
          orderTimeEnd: "",
          orderTimeStart: "",
          fuelChargingCode: "", // 供油编号
          oilClassification: "" // 品类
        };
      }
    }
  },
  methods: {
    search() {
      let obj = this.formateFormData(this.formData);
      this.$emit("order-search", obj);
    },
    formateFormData(data) {
      let orderDate = this.datePicker;
      if (orderDate) {
        data.orderTimeStart = formateDate(orderDate[0]);
        data.orderTimeEnd = formateDate(orderDate[1]);
      } else {
        data.orderTimeStart = "";
        data.orderTimeEnd = "";
      }
      return data;
    },
    onOpitonChange(val) {
      this.formData.oilVarieties = "";
      this.$emit("order-select-change", { oilvarietie: val });
    },
    onDeliverChange(val) {
      this.unDeliver = val > 1;
      this.formData.transportWay = "";
    },
    onDateChange(){
      this.datePicker = [];
    }
  }
};
</script>
