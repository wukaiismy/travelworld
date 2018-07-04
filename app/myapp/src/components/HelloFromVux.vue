<template>
  <div>
      <div class="top">
      <img class="imgs" src="../assets/favicon12.png" alt="">
       <h3>全世界路过</h3>
        <input class="ipt" type="text" placeholder="大佬们都在搜的">
        <i class="shou"></i>
       </div>  
  <lunbo/>
   <contents />
   <tabbar/>
  </div>
</template>

<script>
import { XInput, Group } from "vux";
import Contents from "@/components/Contents";
import Lunbo from "@/components/Lunbo";
export default {
  components: {
    Contents,
    Lunbo
  },
  data() {
    return {
      value: "新加坡"
    };
  }
};
</script>

<style scoped >
.imgs {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 30px;
  left: 20px;
}
.top {
  position: relative;
  width: 100%;
  height: 100px;
  background-color: rgb(230, 240, 240);
  padding: 5px 5px;
  text-align: center;
  line-height: 100px;
}
h3 {
  display: inline-block;
  position: absolute;
  left: 70px;
  color: #000000;
  font-size: 24px;
}
.ipt {
  width: 150px;
  height: 38px;
  position: absolute;
  left: 200px;
  top: 35px;
}
.shou {
  position: absolute;
  width: 40px;
  height: 40px;
  background: url(../assets/shou.png) no-repeat;
  background-size: 35px 35px;
  color: #ccc;
}
i {
  position: absolute;
  top: 40px;
  left: 310px;
}
</style>