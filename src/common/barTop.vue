<template>
  <div class="bar-top">
    <div class="w-1180">
      <div class="bar-left">
        <img src="" alt="">
        <span>买原油后台管理</span>
      </div>
      <div class="bar-right">
        <ul class="oil-tabs">
          <li class="oil-tabs-item" 
            :class="{'on':activeItem===item.value}" 
            v-for="(item, i) in tabsList" 
            :key="i"
            @click="changeActive(item.value)">{{item.label}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'topBar',
  data () {
    return {
      activeItem: '',
      tabsList: [{
        label: '系统',
        value: 'system'
      },{
        label: '用户',
        value: 'users'
      },{
        label: '商品',
        value: 'goods'
      },{
        label: '咨询',
        value: 'consult'
      },{
        label: '船舶',
        value: 'ship'
      },{
        label: '订单',
        value: 'order'
      },{
        label: '船加油',
        value: 'ship-oil'
      }]
    }
  },
  methods: {
    changeActive(value){
      this.activeItem = value;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/_common.scss';

$topH: 100px;
.bar-top{
  .bar-left{
    line-height: $topH;
  }
}
.oil-tabs{
  float: right;
}
.oil-tabs-item{
  line-height: $topH;
}
</style>
