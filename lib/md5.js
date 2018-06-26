const crypto = require("crypto");
//导出模板
module.exports = function(str) {
  //创建hash
  var md5 = crypto.createHash("md5");
  md5.update(str + "h51803");
  return md5.digest("hex");
};
