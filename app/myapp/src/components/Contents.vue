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
      console.log(item, $event);
    }
  },
  data() {
    return {
      type: "5",
      list: [
        {
          src: "http://somedomain.somdomain/x.jpg",
          fallbackSrc: "http://placeholder.qiniudn.com/60x60/3cc51f/ffffff",
          title: "标题一",
          desc:
            "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
          url: "/Details?sid=2"
        },
        {
          src: "http://placeholder.qiniudn.com/60x60/3cc51f/ffffff",
          title: "标题二",
          desc:
            "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
          url: {
            path: "/Details?sid=1",
            replace: false
          },
          meta: {
            source: "来源信息",
            date: "时间",
            other: "其他信息"
          }
        }
      ],
      footer: {
        title: "加载更多",
        url: "http://vux.li"
      }
    };
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