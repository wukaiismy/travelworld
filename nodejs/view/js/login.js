//登录页面的js代码
$(function () {
    var login=$("#login");
    login.click(function () {
        var username=$(".username");
        var passwd=$(".passwd");
        //判断账号是否填写
        if(!username.val()){
            username.focus();
            username.next().html("请输入账号");
            return;
        }else{
            username.next().html("");
        }

        //判断密码是否填写
        if(!passwd.val()){
            passwd.focus();
            passwd.next().html("请输入密码");
            return;
        }else{
            passwd.next().html("");
        }
     $.ajax({
         url:"logins",
         type:"post",
         async:true,
         dataType:"json",
         data:$("#from").serialize(),
         success:function (data) {
             console.log(data);
             if(data.r=="ok"){
                 alert("正在跳转");
                window.location.href="center";
             }else if(data.r=="passwd_err"){
                 alert("密码错误");
             }else if(data.r=="not_exit"){
                 alert("账号不存在");
             };
         },
         error:function (err) {
             console.log("请求失败！");
         }

     });
    });
});