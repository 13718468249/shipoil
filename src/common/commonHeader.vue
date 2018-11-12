<template>
  <header>
    <div class="header clearfix ">
      <div class="float-l h-left clearfix">
        <!-- <span class="float-l ">
          <a :href="indexSippingoil">返回首页</a>
        </span> -->
        <span class="float-l">{{ companyName }}
          <a :href="login"
             v-show="loginBtn"
             class="loginbtn">&nbsp;&nbsp;&nbsp;请登录</a>
        </span>
        <span v-show="out"
              class="out">
          <a :href="logout">
            退出
          </a>
        </span>
      </div>
      <div class="float-r h-right clearfix">
        <span class="float-r">
          <em class="pointer"
              @click="OILEnglish">International</em> &nbsp; | &nbsp;
          <em @click="OILChinese"
              class="orgin pointer">中文站</em>
        </span>
        <span class="float-r">
          <div class="personlist">
            <transition name="fade">
              <el-dropdown>
                <span class="el-dropdown-link">
                  个人中心
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <a href="#"
                       @click="check1(userMessage)">账户信息</a>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <a href="#"
                       @click="check1(userSecurity)">账号安全</a>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <a href="#"
                       @click="check1(resetPassword)">修改密码</a>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <a href="#"
                       @click="check1(subaccountUrl)"
                       v-show="subaccount">子账户管理</a>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <a href="#"
                       @click="check1(enterpriseUrl)"
                       v-show="enterprise">绑定企业</a>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </transition>
          </div>
        </span>
        <span class="float-r pointer">
          <div class="personlist">
            <transition name="fade">
              <el-dropdown>
                <span class="el-dropdown-link">
                  卖家中心
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <a @click="check('sl-manage')">我的商品</a>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <a @click="check('or-sellup')">我的订单</a>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </transition>
          </div>
        </span>
        <span class="float-r">
          <div class="personlist">
            <transition name="fade">
              <el-dropdown>
                <span class="el-dropdown-link">
                  买家中心
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <a @click="check('by-manage')">我的采购</a>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <a @click="check('or-buyup')">我的订单</a>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </transition>
          </div>
        </span>
      </div>
    </div>

  </header>

</template>

<script>
import url from "@/api/api_or";
import Utils from "@/util/login";

export default {
  name: "headBar",
  data() {
    return {
      return: this.$route.fullPath,
      loginBtn: false,
      username: "",
      out: true,
      subaccount: false,
      enterprise: false,
      subaccountUrl: url.subaccountUrl,
      enterpriseUrl: url.enterpriseUrl,
      indexSippingoil: url.indexSippingoil, //首页
      logout: url.logout, //退出登录
      login: url.login, //登录
      userMessage: url.userMessage, //账户信息
      userSecurity: url.userSecurity, //账户安全
      resetPassword: url.resetPassword, //修改密码
      sellGoods: url.sellGoods, //我的商品
      sellOrder: url.sellOrder, //卖家订单
      buyPurchase: url.buyPurchase, //我的采购
      buyOrder: url.buyOrder, //买家订单
      companyName: "",
      language1: url.chinese,
      language2: url.english
    };
  },
  components: {},
  watch: {
    return: function(val) {
      alert(val);
    }
  },
  created() {
    // console.log(this.$route.fullPath)
    this.$http(url.selctLogin, {}, "get").then(res => {
      var data = res.data.datas;
      var message = res.data.message;
      if (message == "请登录") {
        this.loginBtn = true;
        this.out = false;
        this.companyName = "";
      } else if (message == "成功") {
        this.companyName = data.name;
        this.loginBtn = false;
        this.out = true;
        if (!data.roles.includes("enterprise")) {
          this.enterprise = true;
        }
        if (
          data.roles.includes("sales_trader") &&
          data.roles.includes("buy_trader")
        ) {
          document.cookie = "epMemberId=" + data.epMemberId;
        } else if (data.roles.includes("buy_trader")) {
          document.cookie = "epMemberId=" + data.epMemberId;
        } else if (data.roles.includes("sales_trader")) {
          document.cookie = "epMemberId=" + data.epMemberId;
        } else {
          return;
        }
        if (
          data.roles.includes("enter_admin") ||
          data.roles.includes("enter_master")
        ) {
          this.subaccount = true;
        }
        if (!data.roles.includes("enterprise")) {
          this.enterprise = true;
        }
      }
    });
  },
  methods: {
    OILEnglish() {
      document.cookie = "_l_=en_US;domain=.test.mycrudeoil.com;path=/";
      window.location.href = this.language2;
    },
    OILChinese() {
      document.cookie = "_l_=zh_CN;domain=.test.mycrudeoil.com;path=/";
      window.location.href = this.language1;
    },
    check(name) {
      this.$http(url.selctLogin, {}, "get").then(res => {
        if (res.data.status != 0) {
          this.$message("请登录");
        } else if (res.data.status == 0 && !res.data.datas.epMemberId) {
          this.$message("请先绑定企业");
        } else {
          this.$router.push({ name });
        }
      });
    },
    check1(src) {
      this.$http(url.selctLogin, {}, "get").then(res => {
        if (res.data.status != 0) {
          this.$message("请登录");
        } else {
          window.location.href = src;
        }
      });
    }
  },
  mounted() {}
};
</script>

<style >
.out {
  padding-left: 15px;
}
.tabbar {
  line-height: 100px;
}
.tabbar img {
  margin: 26px 20px 0 0;
}
.tabbar ul li {
  float: left;
  font-size: 16px;
  padding: 0 12px 0 76px;
}
.tit {
  font-size: 18px;
  padding-right: 100px;
}
.active {
  color: #f36523;
}
.orgin {
  color: #f36523;
}
header {
  width: 100%;
  height: 34px;
  background: #eeeeee;
}
.show {
  position: absolute;
  z-index: 999;
  background: #ffffff;
}
.header {
  width: 1180px;
  margin: 0 auto;
  line-height: 34px;
  height: 34px;
  color: #333333;
  font-size: 12px;
}
/* .h-left span:first-of-type {
  font-size: 12px;
  color: #333333;
  font-weight: bold;
  margin-right: 20px;
} */
.h-left span:first-of-type:hover {
  cursor: pointer;
}
.h-left span:nth-of-type(2) {
  font-size: 12px;
  color: #666666;
}
.header li {
  color: #666666;
}
.h-right {
  font-size: 12px;
}
.h-right span {
  margin-right: 10px;
}
.h-right span:nth-of-type(4):hover,
.h-right span:nth-of-type(5):hover {
  cursor: pointer;
}
.h-right span:nth-of-type(5):hover,
.h-right span:nth-of-type(2):hover {
  color: #ff9d32;
  cursor: pointer;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.personlist {
  position: relative;
}
.personlist ul {
  position: absolute;
  left: -30px;
  z-index: 9999;
  box-shadow: 0 0 3px #ececec;
}
.personlist ul li {
  width: 100px;
  padding: 0 3px;
  border: 1px solid #ececec;
  border-top: 0;
  text-align: center;
}
.personlist ul li:hover {
  background: #f36523;
  color: #fff;
}
.personlist ul li a {
  display: block;
  width: 100%;
  height: 100%;
}
.loginbtn {
  color: #f36523;
}
.el-dropdown-link {
  font-size: 12px !important;
}
.el-dropdown-link:hover {
  color: #f36523;
}
.el-dropdown-menu__item {
  font-size: 12px !important;
}
</style>
