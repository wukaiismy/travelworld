<template>
    <div>

    <div class="top">
      <div class="log" v-show="ddd" >
        <divider> 个人中心 </divider>
          <h3>全世界欢迎你</h3>
           <x-button mini  :gradients="['#FF5E3A', '#FF9500']" link="/Logins">登录/注册</x-button>
    <group>
      <cell title="p"> 
        <marquee>
          <marquee-item v-for="(msg,i) of msgs" :key="i">{{msg }} {{i}}</marquee-item>
        </marquee>
      </cell>
    </group>
    <br>
      </div>
       <div class="loged" v-show="!ddd">
         <x-header :left-options="{showBack: false}">{{username}}-个人中心</x-header>  
         <b>欢迎回来：{{username}}</b>
         <br>
          <x-button style="border-radius:99px;color:#000000"   :gradients="['#FF5E3A', '#FF9500']" link="/Logins">
          <img class="imgs" src="../assets/照相机.svg" alt="">
          记录我的旅行
          </x-button>
       </div>
    </div>

    <group-title>功能列表</group-title>
    <grid :show-lr-borders="false" :show-vertical-dividers="false">
      <grid-item link="/component/cell" label="我的收藏">
        <img slot="icon" src="../assets/收藏.svg">
      </grid-item>
      <grid-item :link="{ path: '/component/cell'}" label="我的下载">
        <img slot="icon" src="../assets/下载.svg">
      </grid-item>
      <grid-item :link="{ path: '/component/cell'}" label="我的订单">
        <img slot="icon" src="../assets/订单.svg">
      </grid-item>
      <grid-item link="/component/cell" @on-item-click="onItemClick">
        <img slot="icon" src="../assets/游记.svg">
        <span slot="label">我的游记</span>
      </grid-item>
    </grid>
  <grid :show-lr-borders="false" :show-vertical-dividers="false">
      <grid-item link="/component/cell" label="我的问答">
        <img slot="icon" src="../assets/问答.svg">
      </grid-item>
      <grid-item :link="{ path: '/component/cell'}" label="我的活动">
        <img slot="icon" src="../assets/活动.svg">
      </grid-item>
      <grid-item :link="{ path: '/component/cell'}" label="分享有礼">
        <img slot="icon" src="../assets/礼物.svg">
      </grid-item>
      <grid-item link="/component/cell" @on-item-click="onItemClick">
        <img slot="icon" src="../assets/钱包.svg">
        <span slot="label">我的钱包</span>
      </grid-item>
    </grid>
    <tabbar/>
    </div>
</template>

<script>
import {
  Divider,
  Grid,
  GridItem,
  XButton,
  GroupTitle,
  Group,
  Cell,
  Marquee,
  MarqueeItem,
  XHeader
} from "vux";
export default {
  data() {
    return {
      msgs: [
        "小海山岛，无人岛，露营装备",
        "北海道clubmed 富良野之旅",
        "呼伦贝尔，这一刻我们都中了草原的毒。",
        "卢沟桥、宛平城；不忘屈辱、铭记历史",
        "台湾8日游"
      ],
      ddd: true,
      username: ""
    };
  },
  components: {
    Divider,
    Grid,
    GridItem,
    XButton,
    GroupTitle,
    Group,
    Cell,
    Marquee,
    MarqueeItem,
    XHeader
  },
  methods: {
    onItemClick() {
      console.log("on item click");
    }
  },
  mounted() {
    console.log(3333);
    console.log(localStorage.userName);
    if (localStorage.userName) {
      this.ddd = false;
      this.username = localStorage.userName;
    }
  }
};
</script>

<style scoped>
.top {
  width: 100%;
  height: 200px;
  background-color: beige;
  position: relative;
  /* top: -25px; */
  background-image: url(../assets/timg.gif);
}
h3 {
  margin: 20px 20px;
  font-family: BiauKai;
}
b {
  display: inline-block;
  margin: 20px;
}
.log {
  text-align: center;
}
.imgs {
  width: 40px;
  height: 40px;
  position: absolute;
  left: 80px;
}
</style>