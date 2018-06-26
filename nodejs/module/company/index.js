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

  router.use("/uploads", express.static("uploads"));
  router.use(express.static("view"));
  router.use("*", function(req, res) {
    res.render("404");
  });
  return router;
};
