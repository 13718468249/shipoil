<template>
<div class="tabbar">
  <div class="clearfix w-1180">
    <div class="float-l">
      <img class="float-l" src="../assets/images/oilbank.png"/>
      <span class="float-l tit">中国首个成品油国际贸易平台</span>
    </div>
    <div class="float-r">
      <ul class="float-l">
        <li v-for="(item, i) in datas" 
          :key="i"
          :class="{'active':i ==checkindex }"
          class="pointer"><a :href="item.href" style="display:block;">{{ item.label }}</a>
        </li>
        <li>
          <a :href="information"
             target="_blank">信息资讯</a>
        </li>
        <li>
          <a :href="encyclopedias"
             target="_blank">油品百科</a>
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>

<script>
import url from "@/api/api_or";
export default {
  name: "tabBar",
  data() {
    return {
      datas: [
        {
          label: "首页",
          href: url.infoHome
        },
        {
          label: "油品大厅",
          href: url.infoHall
        }
      ],
      checkindex: 0,
      information: url.information,
      encyclopedias: url.encyclopedias
    };
  },
  components: {},
  watch: {},
  created() {
    window.home = this;
    if (this.$route.path == "/home" || this.$route.path == "/") {
      this.checkindex = 0;
    } else {
      this.checkindex = 1;
    }
  },
  methods: {
    toggle(index) {
      this.checkindex = index;
      if (index == 0) {
        this.$router.push({ path: "/home" });
      } else if (index == 1) {
        this.$router.push({ path: "/hall" });
      }
    }
  },
  mounted() {}
};
</script>

<style scoped>
.tabbar {
  line-height: 100px;
  border-bottom: 1px solid rgba(236, 236, 236, 1);
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
</style>
