const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

var path = require("path");

var routesUserList = require("./model/userlist.js");
var routesDocumentList = require("./model/getDocumentList.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5500");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/", routesUserList);
app.use("/", routesDocumentList);
//app.use("/", express.static(path.join(__dirname, "client")));

const port = 3000;
app.listen(port, () => {
  console.log(`localhost working on port ${port}`);
});
