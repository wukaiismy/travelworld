$(function () {
    var adds = $(".add");
    adds.click(function () {
        var inp = $("#inp");
        var status = $("#status");
        if (!inp.val()) {
            inp.focus();
            inp.next().html("必填");
            inp.parent().parent().addClass("error");
            return;
        } else {
            inp.next().html("");
            inp.parent().parent().removeClass("success");
        };
        $.ajax({
            url: "addlist",
            type: "post",
            async: true,
            dataType: "json",
            data: {
                inp: inp.val(),status: status.val()
            },
            success: function (data) {
                console.log(data);
                if (data.r == "ok") {
                    if (data.s == "used") {
                        alert("权限修改成功");
                    } else {
                        alert("没有该账号，请确认");
                    }
                    window.location.href = "titlelist";
                } else {
                    alert("未知错误");
                }
            },
            error: function (err) {
                console.log("请求失败！");
            }

        });
    });
    //修改标题
    var replace = $(".replace");
    replace.click(function () {
        var inp = $("#inp");
        var status = $("#status");
        if (!inp.val()) {
            inp.focus();
            inp.next().html("必填");
            inp.parent().parent().addClass("error");
            return;
        } else {
            inp.next().html("");
            inp.parent().parent().removeClass("success");
        };
        $.ajax({
            url: "relist",
            type: "post",
            async: true,
            dataType: "json",
            data: {
                inp: inp.val(),
                uid: $("#uid").val(),
                status: status.val(),
            },
            success: function (data) {
                console.log(data);
                if (data.r == "ok") {
                    alert("权限设置成功");
                    window.location.href = "titlelist";
                } else {
                    alert("未知错误");
                }
            },
            error: function (err) {
                console.log("请求失败！");
            }

        });
    })
    //删除标题
    var dell = $(".dell");
    dell.click(function () {
        if (!confirm("删除后数据不可恢复，确认删除？")) {
            return;
        };
        alert("没有权限删除用户数据");
        return;
        $.ajax({
            url: "dellist",
            type: "post",
            async: true,
            dataType: "json",
            data: {
                cid: $(this).attr('cid')
            },
            success: function (data) {
                console.log(data);
                if (data.r == "ok") {
                    alert("删除成功");
                    window.location.reload();
                } else {
                    alert("未知错误");
                }
            },
            error: function (err) {
                console.log("请求失败！");
            }

        });
    });

    //newsadd相关操作.添加新闻标题
    var addnews = $(".addnews");
    addnews.click(function () {
        console.log($("#newsform").serialize());
        $.ajax({
            url: "addnews",
            type: "post",
            async: true,
            dataType: "json",
            data: $("#newsform").serialize(),
            success: function (data) {
                console.log(data);
                if (data.r == "ok") {
                    alert("操作成功");
                    window.location.href = "newslist";
                } else {
                    alert("未知错误");
                }
            },
            error: function (err) {
                console.log("请求失败！");
            }

        });
    });

    //删除标题newslist相关操作
    var newsdell = $(".newsdell");
    newsdell.click(function () {
        if (!confirm("删除后数据不可恢复，确认删除？")) {
            return;
        };
        alert("请在修改项中进行操作");
        return;
        $.ajax({
            url: "newsdellist",
            type: "post",
            async: true,
            dataType: "json",
            data: {
                nid: $(this).attr('nid')
            },
            success: function (data) {
                console.log(data);
                if (data.r == "ok") {
                    alert("删除成功");
                    window.location.reload();
                } else {
                    alert("未知错误");
                }
            },
            error: function (err) {
                console.log("请求失败！");
            }

        });
    });


});