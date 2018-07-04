<template>
  <div>
    <divider>攻略详情页面</divider>
    <card>
      <img slot="header" src="http://placeholder.qiniudn.com/640x300" style="width:100%;display:block;">
      <div slot="content" class="card-padding">
        <p style="color:#999;font-size:12px;">时间</p>
        <p style="font-size:14px;line-height:1.2;">某年某月的某一天</p>
      </div>
    </card>
  </div>
</template>

<script>
import { Divider, Card } from "vux";

export default {
  components: {
    Card,
    Divider
  }
};
</script>

<style scoped lang="less">
@import "~vux/src/styles/1px.less";
.card-padding {
  padding: 15px;
}
</style>