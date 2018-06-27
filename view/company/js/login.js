window.onload = function() {
  //登录操作
  $("#username")
    .focus(function() {
      $(this)
        .parent()
        .find(".kong")
        .html("");
      let span1 = "<span>账号不能为空</span>";
      $(this).css("border-color", "#ff3c00");
      $(span1).appendTo(
        $(this)
          .parent()
          .find("div")
          .html("")
      );
    })
    .blur(function() {
      if (
        $(this)
          .parent()
          .find("div")
          .html("")
      ) {
        $(this).css("border-color", "#d8d8d8");
      }
    });

  $("#password")
    .focus(function() {
      $(this)
        .parent()
        .find(".kong")
        .html("");
      let span2 = "<span>密码不能为空</span>";
      $(this).css("border-color", "#ff3c00");
      $(span2).appendTo(
        $(this)
          .parent()
          .find("div")
          .html("")
      );
    })
    .blur(function() {
      if (
        $(this)
          .parent()
          .find("div")
          .html("")
      ) {
        $(this).css("border-color", "#d8d8d8");
      }
    });
  $("#login_login").on("click", function() {
    $.ajax({
      type: "POST",
      url: "./login",
      async: true,
      data: $("#login1").serialize(),
      dataType: "JSON",
      success: function(data) {
        console.log(data);
        if (data.r == "not_exit") {
          alert("账号不存在");
          $(this)
            .parent()
            .find(".kong")
            .html("");
          let span3 = "<span>账号不存在请重新输入</span>";
          $(span3).appendTo(
            $(this)
              .parent()
              .find("div")
              .html("")
          );
        } else if (data.r == "passwd_err") {
            alert("密码错误");
          $(this)
            .parent()
            .find(".kong")
            .html("");
          let span4 = "<span>密码错误</span>";
          $(span4).appendTo(
            $(this)
              .parent()
              .find("div")
              .html("")
          );
        } else if (data.r == "ok") {
          alert("登录成功")
         window.location.href = "mynotes";

        }
      },
      error: function(err) {
        alert("请求错误！	");
        console.log(66600000);
      }
    });
  });
  //登录注册切换
  $(".mashang").on("click", function() {
    $(".login").hide();
    $(".hai").hide();
    $(".enroll").show();
    $(".hai2").show();
  });
  //注册操作
  $("#use")
    .focus(function() {
      $(this)
        .parent()
        .find(".kong1")
        .html("");
      let span5 = "<span>账号不能为空</span>";
      $(this).css("border-color", "#ff3c00");
      $(span5).appendTo(
        $(this)
          .parent()
          .find(".kong1")
          .html("")
      );
    })
    .blur(function() {
      if (
        $(this)
          .parent()
          .find(".kong1")
          .html("")
      ) {
        $(this).css("border-color", "#d8d8d8");
      }
    });
  $("#pas")
    .focus(function() {
      $(this)
        .parent()
        .find(".kong2")
        .html("");
      let span5 = "<span>密码不能为空</span>";
      $(this).css("border-color", "#ff3c00");
      $(span5).appendTo(
        $(this)
          .parent()
          .find(".kong2")
          .html("")
      );
    })
    .blur(function() {
      if (
        $(this)
          .parent()
          .find(".kong2")
          .html("")
      ) {
        $(this).css("border-color", "#d8d8d8");
      }
    });
  $("#tel")
    .focus(function() {
      $(this)
        .parent()
        .find(".kong3")
        .html("");
      let span5 = "<span>手机号码不能为空</span>";
      $(this).css("border-color", "#ff3c00");
      $(span5).appendTo(
        $(this)
          .parent()
          .find(".kong3")
          .html("")
      );
    })
    .blur(function() {
      if (
        $(this)
          .parent()
          .find(".kong3")
          .html("")
      ) {
        $(this).css("border-color", "#d8d8d8");
      }
    });
  //切换操作
  $(".mashang2").on("click", function() {
    $(".enroll").hide();
    $(".hai2").hide();
    $(".login").show();
    $(".hai").show();
  });
  //注册表单提交
  $("#enroll_enroll").on("click", function() {
    let pattern = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
    let uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
    let uuPattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    if (
      pattern.test($("#tel").val()) &&
      uPattern.test($("#use").val()) &&
      uuPattern.test($("#pas").val())
    ) {
      window.location.href = "./index.html";
    } else {
      if (!uPattern.test($("#use").val())) {
        let span7 = "<span>请输入正确账号</span>";
        $(".kong1").html(span7);
      }
      if (!uuPattern.test($("#pas").val())) {
        let span8 = "<span>请输入正确密码</span>";
        $(".kong2").html(span8);
      }
      if (!pattern.test($("#tel").val())) {
        let span9 = "<span>请输入正确手机号</span>";
        $(".kong3").html(span9);
      }
    }

    $.ajax({
      type: "POST",
      url: "./regs",
      async: true,
      data: $("#enroll1").serialize(),
      dataType: "JSON",
      success: function(data) {
        console.log(data);
        if (data.r == "exist") {
          alert("账号已存在");
        } else if (data.r == "ok") {
          alert("注册成功，正在跳转。。。");
          window.location.href = "login";
          console.log(data);
        }
      },
      error: function(err) {
        console.log(66611111);
      }
    });
  });
};
