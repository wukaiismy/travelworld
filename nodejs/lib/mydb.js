const mysql = require("mysql");
//导出数据，设置相关参数
module.exports = (function() {
  var mydb = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 3306,
    database: "travel"
  });
  //链接数据库
  mydb.connect(function(err) {
    if (err) {
      console.log("数据库链接错误！");
      return;
    }
  });
  //防止乱码
  mydb.query("set names utf8");
  return mydb;
})();
