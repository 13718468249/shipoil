<template>
  <el-form class="msg-form" label-width="90px">
    <div class="oil-title-2">{{ formData.infoTitle }}</div>
    <el-form-item label="提货方式：">
      <div>{{ formData.transportWay }}</div>
    </el-form-item>
    <el-form-item label="运输方式：">
      <div>{{ formData.deliveryWay }}</div>
    </el-form-item>
    <el-form-item v-if="type===2" label="数量：">
      <el-button type="text">{{ formData.numberUnit }}</el-button>
    </el-form-item>
    <el-form-item v-else label="单价：">
      <el-button type="text">{{ formData.uunitPrice }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {};
  },
  props:{
    formData: {
      type: Object,
      default: {
        infoTitle: "",
        deliveryWay: "",
        transportWay: "",
        uunitPrice: "",
        numberUnit: "",
        unitPrice: "",
        unit: ""
      }
    },
    type: {
      type: Number,
      default: 1
    }
  }
};
</script>

