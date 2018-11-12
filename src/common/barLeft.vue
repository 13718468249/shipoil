<template>
  <div class="bar-left">
    <ul class="oil-menu" v-for="(item, i) in menuList" :key="i">
      <li class="oil-menu-title">{{ item.title }}</li>
      <li class="oil-menu-item" 
        v-for="(sitem, si) in item.children" 
        :key="si" 
        :class="computeActive(sitem)">
        <router-link class="oil-link" :to="{name: sitem.name}">{{ sitem.title }}</router-link>
      </li>
    </ul>
  </div>
  <!-- <div class="bar-left">
    <el-menu :default-active="activeItem" :default-openeds="openeds">
      <el-submenu :index="item.index" v-for="(item, i) in menuList" :key="i">
        <template slot="title">{{ item.title }}</template>
        <el-menu-item 
          :index="gitem.index" 
          v-for="(gitem, gi) in item.children" 
          :key="gi" 
          @click="jump2detail(gitem)">{{ gitem.title }}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div> -->
</template>

<script>
export default {
  name: "leftBar",
  data() {
    return {
      activeItem: "by-manage",
      routeHeads: ["by", "sl", "or-buy", "or-sell"],
      routeNames: ["by-manage", "sl-manage", "or-buyup", "or-sellup"],
      menuList: [
        {
          title: "买家中心",
          index: "1",
          children: [
            {
              title: "我的采购",
              name: "by-manage",
              index: "1-1"
            },
            {
              title: "我的订单",
              name: "or-buyup",
              index: "1-2"
            }
          ]
        },
        {
          title: "卖家中心",
          index: "2",
          children: [
            {
              title: "我的商品",
              name: "sl-manage",
              index: "2-1"
            },
            {
              title: "我的订单",
              name: "or-sellup",
              index: "2-2"
            }
          ]
        }
      ]
    };
  },
  watch: {
    $route(val) {
      this.activeItem = this.getRouteName(val.name);
    }
  },
  mounted() {
    this.activeItem = this.getInitActive();
  },
  methods: {
    getInitActive() {
      let name = this.$route.name;
      return this.getRouteName(name);
    },
    jump2detail(item) {
      this.$router.push(item);
    },
    computeActive(item) {
      return item.name === this.activeItem ? "on" : "";
    },
    getRouteName(name) {
      let heads = this.routeHeads;
      for (let i = 0; i < heads.length; i++) {
        let hi = heads[i];
        if (name.indexOf(hi) > -1) {
          return this.routeNames[i];
        }
      }
      let enter = this.$route.query.enter;
      return enter;
    }
  }
};
</script>
