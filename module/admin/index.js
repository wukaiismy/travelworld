//各种模板的引入
const express = require("express");
const url = require("url");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const mydb = require("../../lib/mydb.js");
const md5 = require("../../lib/md5.js");

module.exports = function() {
  var router = express.Router();
  //无论进入哪个页面，进行登录检查，若没有登录，直接到登录页面进行登录
  router.use(function(req, res, next) {
    if (
      !req.session.username && //没有session值
      url.parse(req.url).pathname != "/login" && //登录的静态的页面
      url.parse(req.url).pathname != "/logins" && //登录处理
      !path.parse(req.url).ext
    ) {
    }
    next();
  });

  //登录页面的渲染
  router.get("/login", function(req, res) {
    var datas = {
      username: req.cookies.username,
      passwd: req.cookies.passwd
    };
    res.render("admin/login", datas);
  });

  //登录页面的post 数据处理
  router.post("/logins", function(req, res) {
    //将post过来的数据用一个变量保存
    var str = req.body;
    var ps = str.passwd;
    //在数据库里查询账号和密码是正确
    var $sql =
      "select aid,username,passwd from admin where username=? limit 1 ";
    mydb.query($sql, str.username, function(err, result) {
      console.log(err);
      var pw = md5(ps);
      if (result.length) {
        //如果密码正确
        if ((result[0].passwd = pw)) {
          //设置session值
          req.session.username = result[0].username;
          req.session.aid = result[0].aid;
          //用户是否勾选了记住密码
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
          return res.json({ r: "ok" });
        } else {
          return res.json({
            r: "passwd_err"
          });
        }
      } else {
        return res.json({
          r: "not_exit"
        });
      }
    });
  });

  //跳转到center时，渲染页面
  router.get("/center", function(req, res) {
    var datas = {
      username: req.cookies.username,
      passwd: req.cookies.passwd
    };
    res.render("admin/center", datas);
  });

  //添加旅游类型的表单提交
  router.post("/addlist", function(req, res) {
    var str = req.body;
    //判断数据库是否有相同数据
    var $sqll = "select username,status from user where username=? limit 1";
    mydb.query($sqll, str.inp, function(err, result) {
      console.log(err);
      // console.log(result);
      if (result.length) {
        var $sql1 =
          "UPDATE user SET status =?,lasttime=? WHERE username = ? LIMIT 1";
        mydb.query(
          $sql1,
          [str.status, new Date(), result[0].username],
          function(err, result) {
            console.log(err);
            return res.json({
              r: "ok",
              s: "used"
            });
          }
        );
      } else {
        res.json({
          r: "ok"
        });
      }
    });
  });

  //跳转到titlelist时,渲染
  router.get("/titlelist", function(req, res) {
    // var mydb = require("../golbal/mydb.js").mys();
    var $sql = "select * from user where 1=1";
    mydb.query($sql, function(err, result) {
      console.log(err);
      // console.log(result);
      var datas = {
        username: req.session.username,
        lists: result
      };
      res.render("admin/titlelist", datas);
    });
  });

  //跳转到replace(修改)时,添加标题页面
  router.get("/replace", function(req, res) {
    // var mydb = require("../golbal/mydb.js").mys();
    var $sql = "select * from user where uid=" + req.query.uid;
    mydb.query($sql, function(err, result) {
      console.log(err);
      // console.log(result);
      var datas = {
        username: req.session.username,
        lists: result[0]
      };
      res.render("admin/replace", datas);
    });
  });

  //修改权限的表单提交处理
  router.post("/relist", function(req, res) {
    var str = req.body;
    // console.log(str);
    // console.log(pw);
    // var mydb = require("../golbal/mydb.js").mys();
    var $sql = "UPDATE user SET status = ? WHERE uid = ? LIMIT 1";
    mydb.query($sql, [str.status, str.uid], function(err, result) {
      console.log(err);
      res.json({
        r: "ok"
      });
    });
  });

  //跳转到xiaoheiwu,渲染
  router.get("/xiaoheiwu", function(req, res) {
    // var mydb = require("../golbal/mydb.js").mys();
    var $sql = "select * from user where status=0";
    mydb.query($sql, function(err, result) {
      console.log(err);
      // console.log(result);
      var datas = {
        username: req.session.username,
        lists: result
      };
      res.render("admin/xiaoheiwu", datas);
    });
  });

  //渲染newslist审核页面
  router.get("/newslist", function(req, res) {
    // var mydb = require("../golbal/mydb.js").mys();
    //查出未审核的攻略
    var $sql =
      "select s.*,user.usernames,a.username from strategy as s left join user on s.uid=user.uid left join admin as a on s.aid=a.aid where s.status=0 and s.kw=1";
    mydb.query($sql, function(err, result) {
      console.log(err);
      // console.log(result);
      var datas = {
        username: req.session.username,
        lists: result
      };
      res.render("admin/newslist", datas);
    });
  });

  //跳转到newsadd时,添加标题页面
  router.get("/newsadd", function(req, res) {
    var dids = 0;
    dids = req.query.sid;
    console.log("did=" + dids);
    // var mydb = require("../golbal/mydb.js").mys();
    var $sql = "select * from strategy where status=0 and kw=1";
    mydb.query($sql, function(err, result) {
      console.log(err);
      // console.log(result);
      if (dids) {
        var $sql1 = "select * from strategy where sid=? limit 1";
        mydb.query($sql1, dids, function(errs, newsdata) {
          console.log(newsdata[0]);
          var data11 = {
            username: req.session.username,
            lists: result,
            newsdata: newsdata[0]
          };
          res.render("admin/newsadd", data11);
        });
      } else {
        var data12 = {
          username: req.session.username,
          lists: result,
          newsdata: {}
        };
        res.render("admin/newsadd", data12);
      }
    });
  });

  //审核页面提交的表单提交处理
  router.post("/addnews", function(req, res) {
    //把数据保存到数据库
    var str = req.body;
    console.log(str.sid);
    if (str.status == 1) {
      //表示修改
      var $sql = "UPDATE strategy SET aid=?, status=1,kw=1 WHERE sid=?";
    } else {
      var $sql = "UPDATE strategy SET aid=?,status=0,kw=0 WHERE sid=?";
    }
    mydb.query($sql, [req.session.aid, str.sid], function(err, result) {
      if (err) {
        console.log(err);
        res.json({
          r: "db_error"
        });
      } else {
        res.json({
          r: "ok"
        });
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

  //设置默认首页
  router.get("/", function(req, res) {
    var datas = {
      username: req.session.username,
      passwd: req.cookies.passwd
    };
    res.render("admin/login", datas);
  });
  //静态页面的渲染
  router.use("/uploads", express.static("uploads"));
  router.use(express.static("view/admin"));
  //错误页面
  router.use("*", function(req, res) {
    res.render("admin/404");
  });

  return router;
};
