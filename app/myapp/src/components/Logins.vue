<template>
    <div>
       <x-header>输入账号</x-header>     
  <group title="账号登录">
      <x-input title="账号" v-model="username" name="username" placeholder="账号/手机号" is-type="china-name"></x-input>
    </group>
    <group title="确认密码">
      <x-input title="请输入密码" type="text"  v-model="password" :min="5" :max="15" @on-change="change"></x-input>
    </group>
   <divider></divider>
   <x-button type="primary" :gradients="['#FF5E3A', '#FF9500']" @click.native="submits" action-type="button">登录</x-button>
     <divider></divider>
      <divider>第三方账号登录</divider>
    <tab :animate="false">
      <tab-item>微信</tab-item>
      <tab-item >新浪</tab-item>
      <tab-item>QQ</tab-item>
    </tab>
     <divider></divider><divider></divider>
      <divider>没有账号?</divider>
     <divider></divider><divider></divider>
     <x-button type="primary" link="/Regs" :gradients="['#A644FF', '#FC5BC4']">快速注册</x-button>
    </div>
</template>

<script>
import { XButton, XHeader, Group, XInput, Tab, TabItem, Divider } from "vux";

import qs from "qs";

export default {
  name: "Regs",
  data() {
    return {
      tel: "",
      username: "",
      password: "",
      password2: ""
    };
  },
  components: {
    XButton,
    XHeader,
    Group,
    XInput,
    Tab,
    TabItem,
    Divider
  },

  methods: {
    getValid1() {
      this.valid1 = this.$refs.input01.valid;
    },
    getValid2() {
      this.valid2 = this.$refs.input02.valid;
    },
    change(val) {
      console.log("on change", val);
    },
    onBlur(val) {
      console.log("on blur", val);
    },
    onFocus(val, $event) {
      console.log("on focus", val, $event);
    },
    onEnter(val) {
      console.log("click enter!", val);
    },
    submits: function() {
      var This = this;
      //通过给定的ID来发送请求
      this.$http.defaults.headers.post["Content-Type"] =
        "application/x-www-form-urlencoded; charset=UTF-8";
      this.$http
        .post(
          "logins",
          qs.stringify({
            tel: This.tel,
            username: This.username,
            password: This.password
          })
        )
        .then(function(response) {
          console.log(response.data);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
</style>