<template>
    <div>
  <panel link="/Details" header="热门攻略" :footer="footer" :list="list" :type="type" @on-img-error="onImgError"></panel>
    </div>
</template>

<script>
import { Panel } from "vux";
export default {
  name: "Contents",
  components: {
    Panel
  },
  methods: {
    onImgError(item, $event) {
      // console.log(item, $event);
    }
  },
  data() {
    return {
      type: "5",
      list: [],
      footer: {
        title: "没有更多了",
        url: "http://vux.li"
      }
    };
  },
  mounted() {
    var This = this;
    //通过给定的ID来发送请求
    this.$http
      .get("strategy")
      .then(function(response) {
        console.log(response.data.datalist);
        var datas = response.data.datalist;
        const urlList = [];
        for (let index = 0; index < datas.length; index++) {
          urlList.push({
            src: This.GLOBAL.url + datas[index].pic.replace(/\\/g, "/"),
            title: datas[index].title,
            desc: datas[index].content,
            url: "/Details?sid=" + datas[index].sid
          });
        }
        console.log(urlList);
        This.list = urlList;
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
</script>

<style scoped lang="less">
@import "~vux/src/styles/1px.less";
.flex-demo {
  text-align: center;
  color: #fff;
  background-color: #20b907;
  border-radius: 4px;
  background-clip: padding-box;
}
</style>