<template>
    <div>
 <group-title>我和春天有个约会</group-title>
    <swiper loop auto :list="demo06_list" :index="view" @on-index-change="demo06_onIndexChange"></swiper>
    <p>目的地: {{view}}</p>
    </div>
</template>

<script>
import { Swiper, GroupTitle } from "vux";

const imgList = [
  "http://placeholder.qiniudn.com/800x300/FF3B3B/ffffff",
  "http://placeholder.qiniudn.com/800x300/FFEF7D/ffffff",
  "http://placeholder.qiniudn.com/800x300/8AEEB1/ffffff"
];

export default {
  name: "Lunbo",
  components: {
    Swiper,
    GroupTitle
  },
  methods: {
    demo06_onIndexChange(index) {
      this.view = this.demo06_list[index].view;
    }
  },
  data() {
    return {
      demo06_list: [],
      view: null
      //   Url: "http://localhost:8081/app/"
    };
  },
  mounted() {
    var This = this;
    //通过给定的ID来发送请求
    this.$http
      .get("indexdata")
      .then(function(response) {
        // console.log(response.data.lista);
        const urlList = [];
        for (let index = 0; index < response.data.lista.length; index++) {
          urlList.push({
            img:
              This.GLOBAL.Url +
              response.data.lista[index].pic.replace(/\\/g, "/"),
            title: response.data.lista[index].title,
            view: response.data.lista[index].view
          });
        }
        // console.log(urlList);
        This.demo06_list = urlList;
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
</script>

<style scoped>
</style>