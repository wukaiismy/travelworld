<template>
  <div id="app">
    <router-view  @userSignIn="userSignIn"></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      userName: localStorage.userName
    };
  },
  methods: {
    userSignIn(userName) {
      localStorage.userName = userName;
      this.userName = localStorage.userName;
      console.log(this.userName);
    }
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";

body {
  background-color: #fbf9fe;
}
</style>
