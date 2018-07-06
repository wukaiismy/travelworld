<template>
  <div>
      <x-header style="width: 100%; position: fixed; left: 0px; top: 0px; z-index: 100;">游记攻略</x-header> 
    <divider>攻略详情页面</divider>
    <card>
      <img slot="header" :src="img" style="width:100%;display:block;">
      <div slot="content" class="card-padding">
        <p style="color:#e64db0;font-size:32px;">{{title}}</p>
       <divider>正文</divider>
        <p class="imgs" style="font-size:14px;line-height:1.2;" v-html="desc"></p>
      </div>
    </card>
    <tabbar/>
  </div>
</template>

<script>
import { Divider, Card, XHeader } from "vux";

export default {
  components: {
    Card,
    Divider,
    XHeader
  },
  data() {
    return {
      img: "",
      title: "",
      desc: ""
    };
  },
  mounted() {
    var This = this;
    var aaa = This.$route.query.sid;
    console.log(aaa);
    //通过给定的ID来发送请求
    this.$http
      .get("details?sid=" + aaa)
      .then(function(response) {
        console.log(response.data.datalist);
        var datas = response.data.datalist;

        This.img = This.GLOBAL.url + datas.pic.replace(/\\/g, "/");
        This.title = datas.title;
        This.desc = datas.content;
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
</script>

<style scoped lang="less">
@import "~vux/src/styles/1px.less";
.card-padding {
  padding: 5px;
}
.imgs a img {
  width: 100px;
}
</style>