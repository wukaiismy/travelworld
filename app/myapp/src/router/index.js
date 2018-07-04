import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/HelloFromVux";
import Strategy from "@/components/Strategy";
import Details from "@/components/Details";
import Regs from "@/components/Regs";
import Logins from "@/components/Logins";
import Center from "@/components/Center";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/Strategy",
      component: Strategy
    },
    {
      path: "/Details",
      component: Details
    },

    {
      path: "/Regs",
      component: Regs
    },

    {
      path: "/Logins",
      component: Logins
    },

    {
      path: "/Center",
      component: Center
    }
  ]
});
