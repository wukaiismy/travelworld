//加载各种模块
const express = require("express");
const url = require("url");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const mydb = require("../../lib/mydb.js");
const md5 = require("../../lib/md5.js");
module.exports = function() {
  var router = express.Router();

  //注册页面的渲染
  router.get("/reg", function(req, res) {
    res.render("company/reg");
  });

  //注册页面的数据处理
  router.post("/regs", function(req, res) {
    var str = res.body;
    var pw = md5(str.passwd);
    var $sql = "select uid,username,passwd from user where username=? limit 1";
    mydb.query($sql, str.username, function(err, data) {
      console.log(err);
      console.log(data);
      if (data.length) {
        res.send('{"r":"exist"}');
      } else {
        $sql1 = "INSERT INTO user(username,passwd,tel) VALUES(?,?,?)";
        var datas = [str.username, pw, str.tel];
        mydb.query($sql1, datas, function(err, data) {
          console.log(err);
          // console.log(data.insertId);
          res.send('{"r":"ok"}');
        });
      }
    });
  });

  //登录页面的渲染
  router.get("/login", function(req, res) {
    // var filename=url.parse(req.url,true).pathname.substring(1);
    var datas = {
      username: req.cookies.username,
      passwd: req.cookies.passwd
    };
    res.render("company/login", datas);
  });
  //登录界面数据处理
  router.post("/login", function(req, res) {
    var str = req.body;
    // console.log(str.passwd);
    // console.log(pw);
    var $sql = "select uid,username,passwd from user where username=? limit 1";
    mydb.query($sql, str.username, function(err, result) {
      console.log(err);
      // console.log(result[0].passwd);
      //引入加密
      var pw = md5(str.passwd);
      //判断账号是否存在
      if (result.length) {
        if (result[0].passwd == pw) {
          req.session.username = result[0].username;
          req.session.sid = result[0].sid;
          if (str.merber) {
            res.cookie("username", str.username, {
              maxAge: 30 * 24 * 3600 * 1000
            });
            res.cookie("passwd", str.passwd, {
              maxAge: 30 * 24 * 3600 * 1000
            });
          } else {
            res.clearCookie("username", {
              maxAge: 0
            });
            res.clearCookie("passwd", {
              maxAge: 0
            });
          }
          return res.json({
            r: "ok"
          });
        } else {
          return res.json({
            r: "passwd_err"
          });
        }
      } else {
        return res.send('{"r":"not_exit"}');
      }
    });
  });

  router.use("/uploads", express.static("uploads"));
  router.use(express.static("view/company"));
  //设置错误输入页面
  router.use("*", function(req, res) {
    res.render("company/404");
  });
  return router;
};
