<template>
  <div>
   
    <tabbar style=" position: fixed;" >
      <tabbar-item link="/">
        <img slot="icon" src="../assets/i1.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item show-dot link="/Strategy">
        <img slot="icon" src="../assets/i2.png">
        <span slot="label">攻略</span>
      </tabbar-item>
      <tabbar-item selected link="/Center">
        <img slot="icon" src="../assets/i3.png">
        <span slot="label">个人中心</span>
      </tabbar-item>
      <tabbar-item badge="" link="/Logins">
        <img slot="icon" src="../assets/i4.png">
        <span slot="label">登录</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell } from "vux";

export default {
  name: "foot",
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell
  }
};
</script>
<style scoped>
</style>
