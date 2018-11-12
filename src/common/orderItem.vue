<template>
  <div class="details-lists-box" v-if="isDeleted">
    <div class="details-lists-one">
      <span style="line-height:28px;">{{ orderData.status }}</span>
      <el-button v-if="canDelete" size="mini" @click="delorder(orderData)">删除</el-button>
    </div>
    <div class="details-box">
      <div class="details-lists-two">
        <img src="../assets/images/order.png" alt="">
        <i class="orderiCon">订单</i>
        <ol>
          <li>
            <span>创建日期 :</span>
            <span>{{ orderData.orderTime }}</span>
          </li>
          <li>
            <span>订单号 :</span>
            <span>{{ orderData.orderCode }}</span>
          </li>
          <li>
            <span>总价 :</span>
            <span>{{ orderData.totalPrice }}&nbsp;{{ orderData.currency }}</span>
          </li>
          <li v-if="isBuyer">
            <span> 卖家名称 :</span>
            <span>{{ orderData.sellCompanyName}}</span>
          </li>
          <li v-if="isSeller">
            <span> 买家名称 :</span>
            <span>{{ orderData.buyCompanyName }}</span>
          </li>
        </ol>
      </div>
      <div class="details-lists-two">
        <img src="../assets/images/logistics.png" alt="">
        <i>物流</i>
        <ol v-if="upDown==='up'">
          <li>
            <span>提货日期 :</span>
            <span>{{ orderData.pickUpTime }}</span>
          </li>
          <li>
            <span>提货方式 :</span>
            <span>{{ orderData.deliveryWay }}</span>
          </li>
          <li v-if="isDeliver">
            <span>运输方式 :</span>
            <span>{{ orderData.transportWay }}</span>
          </li>
        </ol>
        <ol v-else>
          <li>
            <span>加油日期 :</span>
            <span>{{ orderData.fuelChargingTime }}</span>
          </li>
          <li>
            <span>供油单号 :</span>
            <span>{{ orderData.fuelChargingCode }}</span>
          </li>
          <li>
            <span>港口 :</span>
            <span>{{ orderData.port }}</span>
          </li>
          <li>
            <span>船名 :</span>
            <span>{{ orderData.vesselName }}</span>
          </li>
        </ol>
      </div>
      <div class="details-lists-table">
        <div class="category">
          <img src="../assets/images/category.png" alt="">
          <i>品类</i>
        </div>
        <el-table :data="orderData.goryList" border style="width: 100%">
          <el-table-column label="序号" width="52">
            <template slot-scope="scope">
              <span style="text-align:center;display:block;">{{ listIndex(scope.$index) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="oilClassification" label="油品类别"></el-table-column>
          <el-table-column prop="oilVarieties" label="规格"></el-table-column>
          <el-table-column prop="unitPrice" label="单价"></el-table-column>
          <el-table-column prop="number" label="数量"></el-table-column>
          <el-table-column prop="litotalPrice" label="总价"></el-table-column>
        </el-table>
      </div>
      <div class="order-upload">
        <!-- <el-button v-if="isDeleted" :disabled="true">{{ uploadBtnText }}</el-button> -->
        <el-button type="primary" @click="checkOrder(orderData.orderId)">{{ uploadBtnText }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    uploadBtnText() {
      let text = "上传单据";
      if (this.orderData.status === "已完成") text = "查看单据";
      return text;
    },
    isDeleted() {
      return this.orderData.aliveFlag !== "0";
    },
    canDelete() {
      return this.orderData.status !== "已完成";
    },
    isBuyer() {
      let ib = this.identity === "b";
      return this.isSystem || ib;
    },
    isSeller() {
      let is = this.identity !== "b";
      return this.isSystem || is;
    },
    isDeliver() {
      return this.orderData.deliveryWay !== "自提";
    }
  },
  watch: {
    isDeleted() {}
  },
  props: {
    identity: {
      type: String,
      default: "b"
    },
    businessType: {
      type: Number,
      default: 3
    },
    orderData: {
      type: Object,
      default: {}
    },
    upDown: {
      type: String,
      default: "up"
    },
    checkOrder: {
      type: Function,
      default() {
        return () => {};
      }
    },
    isSystem: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    delorder(orderData) {
      if (orderData.aliveFlag === "0") {
        this.$message({
          message: "该订单已是删除状态!",
          type: "info"
        });
      } else {
        this.$emit("order-delete", orderData);
      }
    },
    listIndex(index) {
      return index + 1;
    }
  }
};
</script>

<style scoped>
.order-upload {
  margin: 10px 0 0 70px;
}
.details-lists-box {
  padding-top: 20px;
  overflow: hidden;
}
.details-box {
  border: 1px solid #ebebeb;
  box-sizing: border-box;
  padding: 10px 20px 20px 20px;
  margin-top: 10px;
  border-radius: 5px;
  box-shadow: 0 0 1px 1px #f6f6f6;
}
.details-lists-one {
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
}
.details-lists-one em {
  cursor: pointer;
}
.details-lists-two {
  display: -webkit-box;
  margin-top: 10px;
}
.details-lists-two img {
  display: block;
  width: 12px;
  height: 14px;
  margin-right: 6px;
  margin-top: 3px;
}
.details-lists-two .orderiCon {
  width: 28px;
}
.details-lists-two i {
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: #f36523;
  margin-right: 20px;
  font-style: normal;
}
.details-lists-two ol {
  display: flex;
}
.details-lists-two ol li {
  margin-right: 47px;
}
.details-lists-two ol li span:first-child {
  color: #666666;
  margin-right: 10px;
}
.details-lists-two ol li span:nth-of-type(2) {
  color: #333333;
}
.details-lists-table {
  margin-top: 10px;
  display: flex;
}
.details-lists-table .category {
  display: flex;
}
.details-lists-table .category img {
  display: block;
  width: 13px;
  height: 13px;
  margin-right: 6px;
  margin-top: 3px;
}
.details-lists-table .category i {
  font-style: normal;
  color: #f36523;
  margin-right: 20px;
}
.details-lists-table table {
  width: 100%;
  border-collapse: collapse;
  border-top: 1px solid #ebebeb;
  border-left: 1px solid #ebebeb;
  margin-top: 10px;
}
</style>

