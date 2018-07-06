<template>
    <div>
       <x-header>快速注册</x-header>  
         <group title="">
      <x-input title="手机号码" v-model="tel" name="tel" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
    </group>
  <group title="">
      <x-input title="昵称" v-model="username" name="username" placeholder="请输入姓名" is-type="china-name"></x-input>
    </group>
    <group title="确认密码">
      <x-input title="请输入密码" type="text" placeholder="请输入密码" v-model="password" :min="5" :max="15" @on-change="change"></x-input>
      <x-input title="请确认密码" v-model="password2" type="text" placeholder="" :equal-with="password"></x-input>
    </group>
    <x-button :gradients="['#1D62F0', '#19D5FD']"  type="primary" @click.native="submits" action-type="button">完成注册，进入全世界</x-button>
      <toast v-model="showPositionValue" type="text" :time="2000" is-show-mask :text="msgs" position="bottom"></toast>
    </div>
</template>

<script>
import { XButton, XHeader, Group, Toast, XInput } from "vux";

import qs from "qs";

export default {
  name: "Regs",
  data() {
    return {
      tel: "",
      username: "",
      password: "",
      password2: "",
      showPositionValue: false,
      msgs: ""
    };
  },
  components: {
    XButton,
    XHeader,
    Group,
    Toast,
    XInput
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
          "regs",
          qs.stringify({
            tel: This.tel,
            username: This.username,
            password: This.password
          })
        )
        .then(function(response) {
          console.log(response.data);
          var rul = response.data;
          if (rul.r == "ok") {
            // alert("注册成功");
            This.msgs = "注册成功";
            This.showPositionValue = true;
            setTimeout(function() {
              This.$router.push({ path: "/logins" });
            }, 2000);
          } else if (rul.r == "exist") {
            // alert("账号重复");
            This.msgs = "账号重复，请确认";
            This.showPositionValue = true;
            return;
          }
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