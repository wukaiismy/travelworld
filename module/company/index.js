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
  // router.get("/login", function(req, res) {
  //   res.render("company/login");
  // });

  //注册页面的数据处理
  router.post("/regs", function(req, res) {
    var str = req.body;
    console.log(str);
    var pw = md5(str.pas);
    var $sql =
      "select uid,usernames,passwd from user where usernames=? limit 1";
    mydb.query($sql, str.use, function(err, data) {
      console.log(err);
      // console.log(data);
      if (data.length) {
        res.send('{"r":"exist"}');
      } else {
        $sql1 = "INSERT INTO user(usernames,passwd,tel) VALUES(?,?,?)";
        var datas = [str.use, pw, str.tel];
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
    console.log(str);
    // console.log(pw);
    var $sql =
      "select uid,usernames,passwd from user where usernames=? limit 1";
    mydb.query($sql, str.username, function(err, result) {
      console.log(err);
      console.log(result);
      //引入加密
      var pw = md5(str.password);
      //判断账号是否存在
      if (result.length) {
        if (result[0].passwd == pw) {
          req.session.username = result[0].usernames;
          req.session.sid = result[0].uid;
          if (str.merber) {
            res.cookie("username", str.username, {
              maxAge: 30 * 24 * 3600 * 1000
            });
            res.cookie("passwd", str.password, {
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

  //进入到首页
  router.get("/index", function(req, res) {
    var $sql = "select * from strategy where status=1 order by sid DESC";
    mydb.query($sql, function(err, result) {
      console.log(err);
      console.log(result);
      res.render("company/index", {
        username: req.session.username,
        datalist: result
      });
    });
  });

  //

  //进入到xi额游记
  router.get("/mynotes", function(req, res) {
    var $sql = "select * from strategy where 1=1 ";
    mydb.query($sql, function(err, result) {
      console.log(err);
      // console.log(result);
      res.render("company/mynotes", {
        username: req.session.username
      });
    });
  });

  router.post("/mynotes", function(req, res) {
    //把数据保存到数据库
    var data = req.body;
    // console.log(data);
    var $data = [req.session.sid, data.title, data.pic, data.content];
    var $sql =
      "INSERT INTO strategy(uid,title, pic, content) VALUES ( ?, ?, ?, ?)";
    mydb.query($sql, $data, function(err, result) {
      if (err) {
        console.log(err);
        res.json({ r: "db_error" });
      } else {
        res.json({ r: "ok" });
      }
    });
  });

  //处理图片上传
  //实际开发应该怎么样
  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      var folder =
        "./uploads/" +
        new Date().getFullYear() +
        "/" +
        (new Date().getMonth() + 1).toString().padStart(2, "0");
      var fArr = folder.split("/");
      var fe = ".";
      for (var i = 1; i < fArr.length; i++) {
        fe += "/" + fArr[i];
        if (!fs.existsSync(fe)) {
          fs.mkdirSync(fe, 0777);
        }
      }
      cb(null, folder);
    },
    filename: function(req, file, cb) {
      var filename =
        new Date().valueOf() +
        "_" +
        Math.random()
          .toString()
          .substring(2, 8) +
        path.parse(file.originalname).ext;
      cb(null, filename);
    }
  });
  var upload = multer({
    storage: storage
  });
  router.post("/uploadimg", upload.array("uploadfile", 50), function(req, res) {
    // console.log(req.files);
    var data = [];
    for (var i = 0; i < req.files.length; i++) {
      data.push(req.files[i].path);
    }
    res.json({
      errno: 0,
      data: data
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
