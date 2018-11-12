<template>
  <div class="bar-right">
    <div class="oil-title-2">{{ oilName }}单据管理</div>
    <!-- <ul class="main-top">
      <li v-for="item in tabList" :class="{'active': acitveTab===item.value}" :key="item.value" @click="switchMode(item.value)">{{ item.label }}</li>
    </ul> -->
    <!--凭证合同-->
    <el-form label-width="80px">
      <el-form-item class="main-bottom" label="供油凭证">
        <el-upload
          :action="fileuploadlist"
          :on-success="onUploadSuccess"
          :on-error="onUploadError"
          :on-remove="onRemoveFile"
          :file-list="voucher">
          <img src="../assets/images/upload.png" @click="onUploadFiles(1)" class="mg-t-10">
        </el-upload>
      </el-form-item>
      <el-form-item class="main-bottom" label="合同">
        <el-upload
          :action="fileuploadlist"
          :on-success="onUploadSuccess"
          :on-error="onUploadError"
          :file-list="contract">
          <img src="../assets/images/upload.png" @click="onUploadFiles(2)" class="mg-t-10">
        </el-upload>
      </el-form-item>
      <el-form-item class="main-bottom" label="发票">
        <el-upload
          :action="fileuploadlist"
          :on-success="onUploadSuccess"
          :on-error="onUploadError"
          :file-list="invoice">
          <img src="../assets/images/upload.png" @click="onUploadFiles(3)" class="mg-t-10">
        </el-upload>
      </el-form-item>
      <el-form-item class="or-btn-list">
        <el-button type="primary" @click="submmitFile()">提交</el-button>
        <el-button type="primary" @click="jump2order()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import url from "@/api/api_or.js";
import { code2value } from "@/util/filter";

export default {
  data() {
    return {
      acitveTab: 1,
      oilTypeList: this.$store.state.oilTypes,
      oilType: 1,
      tabList: [
        {
          label: "供油凭证与合同",
          value: 1
        },
        {
          label: "发票",
          value: 2
        }
      ],
      arrayTypeList: ["voucher", "contract", "invoice"],
      fileuploadlist: url.fileupload,
      uploadType: "CONTRACT",
      fileList: [],
      fileType: 1,
      voucher: [], //凭证
      invoice: [], //发票
      contract: [], //合同
      orderId: null,
      isSystem: false,
      sysTag: ""
    };
  },
  computed: {
    oilName() {
      let olist = this.$store.state.oilTypes;
      return code2value(this.oilType, olist);
    }
  },
  methods: {
    //上传提交
    submmitFile() {
      let businessType = this.$route.query.businessType;
      let formData = {
        oilSupplyVoucherList: this.voucher,
        contractList: this.contract,
        invoiceList: this.invoice,
        uploadType: this.uploadType,
        orderId: this.orderId,
        sysTag: this.sysTag
      };
      let URL = url.submmitfile;
      if (businessType === 4) URL = url.ordersupplyuploadsubmit;
      this.$http(URL, formData).then(res => {
        if (res.data.status === 0) {
          this.$message({
            message: "提交成功",
            type: "success"
          });
        } else {
          let msg = res.data.message;
          this.$message({
            message: msg,
            type: "error"
          });
        }
      });
    },
    // 删除订单
    delupload(item, fileType) {
      this.$confirm("确定删除该文件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let index = -1;
          let arr = this.getArrayName(fileType);
          index = arr.indexOf(item);
          arr.splice(index, 1);
          this.uploadType = this.setUploadType(fileType);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 上传成功
    onUploadSuccess(res, file) {
      var path = res.datas;
      var obj = {
        path: path,
        name: file.name
      };
      this.getArrayName(this.fileType).push(obj);
    },
    // 上传失败
    onUploadError(res, file) {
      this.$message({
        type: "warning",
        message: "上传失败!"
      });
    },
    // 上传前
    onBeforeUpload(file) {
      // console.log(this.fileupload)
    },
    // 点击上传
    onUploadFiles(fileType) {
      this.uploadType = this.setUploadType(fileType);
    },
    onRemoveFile(file, fileList){
      console.log(file);
    },
    // 合同发票切换
    switchMode(a) {
      this.acitveTab = a;
    },
    // 返回订单页
    jump2order() {
      this.$router.go(-1);
    },
    getArrayName(index) {
      let arrayType = this.arrayTypeList[index - 1];
      return this[arrayType];
    },
    setUploadType(fileType) {
      let uploadType = "CONTRACT";
      this.fileType = fileType;
      if (fileType > 2) uploadType = "INVOICE";
      return uploadType;
    },
    initSysData() {
      let syst = this.$store.state.sysTag;
      let iss = this.$store.state.isSystem;
      let otype = this.$route.query.oilType;

      this.sysTag = syst;
      this.isSystem = iss;
      this.oilType = otype;
      if (iss) {
        this.uploadUrl = url.importRIgnitionData;
      }
    },
    reqOrderList() {
      let oid = this.$route.query.orderId;
      this.orderId = oid;
      this.$http(url.showuploadedfiles, {
        orderId: oid
      }).then(res => {
        let odata = res.data.datas;
        if (odata) {
          odata.forEach(ele => {
            let fileType = ~~ele.fileType;
            // ele.url = ele.path;
            this.getArrayName(fileType).push(ele);
          });
        }
      });
    }
  },
  mounted() {
    this.initSysData();
    this.reqOrderList();
  }
};
</script>
<style lang="scss" scoped>
.mg {
  &-r {
    &-10 {
      margin-right:10px;
    }
  }
  &-t{
    &-10{
      margin-top: 10px;
    }
  }
}
.or{
  &-btn-list{
    text-align: right;
    margin-top: 20px;
  }
}
</style>
