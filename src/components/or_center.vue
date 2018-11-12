<template>
  <div class="bar-right" v-title="'单据管理'">
    <div class="oil-title-2">{{ oilName }}单据管理</div>
    <!--凭证合同-->
    <!-- <ul class="main-bottom">
      <li v-if="voucher.length===0">
        <div class="b-left"><span class="color-on">*</span><span>凭证</span></div>
        <el-upload
          :show-file-list="false"
          :action="fileuploadlist"
          :on-success="onUploadSuccess"
          :on-error="onUploadError"
          :file-list="fileList">
          <img src="../assets/images/upload.png" alt="" @click="onUploadFiles(1)" class="mg-t-24">
        </el-upload>
      </li>
      <li v-for="(item, i) in voucher" :key="i">
        <div class="b-left"><span class="color-on">*</span><span>凭证</span></div>
        <div class="b-right">
          <span><a :href="item.path">{{item.name}}</a></span>
          <div class="b-right-btn">
            <span @click="download(item.path)"><img src="../assets/images/download.png" alt="" ></span>
            <i @click="delupload(item, 1)"><img src="../assets/images/delete-icon.png" alt=""></i>
            <el-upload
              :show-file-list="false"
              :action="fileuploadlist"
              :on-success="onUploadSuccess"
              :on-error="onUploadError"
              :file-list="fileList">
              <img src="../assets/images/upload.png" alt="" @click="onUploadFiles(1)" class="mg-t-24">
            </el-upload>
          </div>
        </div>
      </li>
    </ul> -->
    <!--合同-->
    <ul class="main-bottom">
      <li v-if="contract.length===0">
        <div class="b-left"><span class="color-on">*</span><span>合同</span></div>
        <el-upload
          :show-file-list="false"
          :action="fileuploadlist"
          :on-success="onUploadSuccess"
          :on-error="onUploadError"
          :file-list="fileList">
          <img src="../assets/images/upload.png" alt="" @click="onUploadFiles(2)" class="mg-t-24">
        </el-upload>
      </li>
      <li v-for="(item, i) in contract" :key="i">
        <div class="b-left"><span class="color-on">*</span><span>合同</span></div>
        <div class="b-right">
          <span><a :href="item.path" target="_blank">{{ item.name }}</a></span>
          <div class="b-right-btn">
            <!-- <span @click="download(item.path)"><img src="../assets/images/download.png" alt="" ></span> -->
            <i @click="delupload(item, 2)"><img src="../assets/images/delete-icon.png" alt=""></i>
            <el-upload
              :show-file-list="false"
              :action="fileuploadlist"
              :on-success="onUploadSuccess"
              :on-error="onUploadError"
              :file-list="fileList">
              <img src="../assets/images/upload.png" alt="" @click="onUploadFiles(2)" class="mg-t-24">
            </el-upload>
          </div>
        </div>
      </li>
    </ul>
    <!--发票-->
    <ul class="main-bottom">
      <li v-if="invoice.length===0">
        <div class="b-left"><span>&nbsp;</span><span>发票</span></div>
        <el-upload
          :show-file-list="false"
          :action="fileuploadlist"
          :on-success="onUploadSuccess"
          :on-error="onUploadError"
          :file-list="fileList">
          <img src="../assets/images/upload.png" alt="" @click="onUploadFiles(3)" class="mg-t-24">
        </el-upload>
      </li>
      <li v-for="(item, i) in invoice" :key="i">
        <div class="b-left"><span>&nbsp;</span><span>发票</span></div>
        <div class="b-right" >
          <span><a :href="item.path" target="_blank">{{ item.name }}</a></span>
          <div class="b-right-btn">
            <!-- <span @click="download(item.path)"><img src="../assets/images/download.png" alt="" ></span> -->
            <i @click="delupload(item, 3)"><img src="../assets/images/delete-icon.png" alt=""></i>
            <el-upload
              :show-file-list="false"
              :action="fileuploadlist"
              :on-success="onUploadSuccess"
              :on-error="onUploadError"
              :file-list="fileList">
              <img src="../assets/images/upload.png" alt="" @click="onUploadFiles(3)" class="mg-t-24">
            </el-upload>
          </div>
        </div>
      </li>
    </ul>
    <!--其它-->
    <ul class="main-bottom">
      <li v-if="others.length===0">
        <div class="b-left"><span>&nbsp;</span><span>其他单据</span><div style="font-size:12px;">(包括运单、签收单、提货单等)</div></div>
        <el-upload
          :show-file-list="false"
          :action="fileuploadlist"
          :on-success="onUploadSuccess"
          :on-error="onUploadError"
          :file-list="fileList">
          <img src="../assets/images/upload.png" alt="" @click="onUploadFiles(5)" class="mg-t-24">
        </el-upload>
      </li>
      <li v-for="(item, i) in others" :key="i">
        <div class="b-left"><span>&nbsp;</span><span>其他单据</span><div style="font-size:12px;">(包括运单、签收单、提货单等)</div></div>
        <div class="b-right">
          <span><a :href="item.path" target="_blank">{{ item.name }}</a></span>
          <div class="b-right-btn">
            <!-- <span @click="download(item.path)"><img src="../assets/images/download.png" alt="" ></span> -->
            <i @click="delupload(item, 5)"><img src="../assets/images/delete-icon.png" alt=""></i>
            <el-upload
              :show-file-list="false"
              :action="fileuploadlist"
              :on-success="onUploadSuccess" 
              :on-error="onUploadError"
              :file-list="fileList">
              <img src="../assets/images/upload.png" alt="" @click="onUploadFiles(5)" class="mg-t-24">
            </el-upload>
          </div>
        </div>
      </li>
    </ul>
    <div class="or-btn-list">
      <el-button type="primary" @click="submmitFile()">提交</el-button>
      <el-button type="primary" @click="jump2order()">返回</el-button>
    </div>
  </div>
</template>

<script>
import url from "@/api/api_or.js";
import { code2value } from "@/util/filter";

export default {
  data() {
    return {
      oilType: 1,
      fileType: 1,
      acitveTab: 1,
      fileuploadlist: url.fileupload,
      oilTypeList: this.$store.state.oilTypes,
      arrayTypeList: ["voucher", "contract", "invoice", "picture", "others"],
      fileList: [],
      contract: [], //合同
      invoice: [], //发票
      picture: [],
      voucher: [], //凭证
      others: [], //其它
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
        // oilSupplyVoucherList: this.voucher,
        contractList: this.contract,
        invoiceList: this.invoice,
        otherList: this.others,
        oilType: this.oilType + "",
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    onUploadFiles(number){
      this.fileType = number;
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
    // 返回订单页
    jump2order() {
      this.$router.go(-1);
    },
    getArrayName(index) {
      let arrayType = this.arrayTypeList[index - 1];
      return this[arrayType];
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


