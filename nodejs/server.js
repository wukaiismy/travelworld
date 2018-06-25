const express = require("express");
const els = require("ejs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

//创建一个服务
const app = express();

//引入中间件
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

//创建模板引擎，用于没有使用Vue框架的页面
app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.set("views", ["view", "../view"]);

//设置cookie和session参数

app.use(cookieParser());
app.use(
  session({
    name: "s_id",
    secret: "h51803",
    cookie: {
      maxAge: 3600 * 1000
    },
    resave: true,
    saveUninitialized: true
  })
);

//下面分辨是进入到前台和后台的路由
app.use("/index", require("./module/company/")());
app.use("/admin", require("./module/admin/")());

//端口监听
app.listen(81);
console.log("81运行中。。。");
