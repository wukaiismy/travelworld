// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import FastClick from "fastclick";
import App from "./App";
import router from "./router";
import foot from "@/components/foot";
import { AjaxPlugin } from "vux";
import Global_ from "../static/global";
FastClick.attach(document.body);

Vue.config.productionTip = false;
Vue.component("tabbar", foot);
Vue.use(AjaxPlugin);
Vue.prototype.GLOBAL = Global_;
Vue.prototype.$http.defaults.baseURL = Global_.Url;
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount("#app-box");
