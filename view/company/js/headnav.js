window.onload = function() {
  var vm = new Vue({
    el: "#app",
    data: {
      activeIndex: "",
      pic: "",
      title: "",
      content: "",
      message: "hhh",
      type: "innfo"
    },
    methods: {
      getChange: function(event) {
        console.log(event.target);
        console.log(123);
      },
      btns: function() {
        var This = this;
        // console.log(pic);
        this.$prompt("按'四川 成都'的格式输入", "请填写游记目的地", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: /^(\S+)(\ {1})(\S+)$/,
          inputErrorMessage: "格式不正确"
        })
          .then(({ value }) => {
            this.$message({
              type: "success",
              message: value
            });
            //发送一个`POST`请求
            axios.defaults.headers.post["Content-Type"] =
              "application/x-www-form-urlencoded";
            axios
              .post(
                "/index/mynotes",
                Qs.stringify({
                  pic: This.pic,
                  title: This.title,
                  content: This.content,
                  view: value
                })
              )
              .then(function(response) {
                alert("上传成功，待审核");
                console.log(response);
                window.location.href = "center";
              })
              .catch(function(error) {
                console.log(error);
              });
          })
          .catch(value => {
            console.log(value);
            this.$message({
              type: "info",
              message: "取消输入"
            });
          });
      }
    }
  });
  //富文本编辑器
  var E = window.wangEditor;
  var editor = new E("#div1", "#mycontent");

  editor.customConfig.uploadImgServer = "./uploadimg"; //处理图片上传的服务器地址
  editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
  editor.customConfig.uploadFileName = "uploadfile";

  editor.customConfig.onchange = function(html) {
    // 监控变化，同步更新到 textarea
    $("#content").val(html);
    vm.content = html;
  };
  editor.create();

  //上传单张图片
  var editor2 = new E("#picmenu", "#newspic");
  editor2.customConfig.uploadImgServer = "./uploadimg"; //处理图片上传的服务器地址
  editor2.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
  editor2.customConfig.uploadFileName = "uploadfile";
  editor2.customConfig.menus = ["image"];
  //监听上传成功
  editor2.customConfig.uploadImgHooks = {
    success: function(xhr, editor, result) {
      console.log(result);
      $("#mainpic").attr("src", result.data[0]);
      $("#pic").val(result.data[0]);
      vm.pic = result.data[0];
    }
  };

  editor2.create();
};
