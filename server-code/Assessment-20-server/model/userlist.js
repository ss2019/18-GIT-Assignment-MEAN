const route = require("express").Router();
const multer = require("multer");
var path = require("path");

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
/**
 * Default Request
 */
route.get("/", (req, res) => {
  res.send("Working");
});

// Set Storage Engine

const storage = multer.diskStorage({
  destination: "./uploads/images/",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({
  storage: storage
}).single("myImage");

/**
 * Request Type: POST
 * Details : Adding File Upload Information  into mongodb
 * Database Name : "project"
 * Collection Name : "documentObject"
 */

route.post("/uploads", (req, res) => {
  upload(req, res, err => {
    if (err) {
      console.log("Error in file upload");
    } else {
      var documentFileObject = {
        fileName: req.file.originalname,
        fileType: req.file.mimetype,
        description: req.body.description
      };
      console.log(documentFileObject);
      console.log("Desc =" + req.body.description);
      MongoClient.connect(
        url,
        { useNewUrlParser: true },
        function(err, db) {
          var database = db.db("project");
          database
            .collection("documentObject")
            .insertOne(documentFileObject, function(err, records) {
              if (err) throw err;
              else {
                //console.log(records);
                res.redirect("http://localhost:5500/index.html");
                //res.json({ message: "Document uploaded successfully" });
              }
            });
        }
      );

      //console.log(req.file);
      //res.send("test" + req.file.filename);
    }
  });
});

/**
 * Request Type: GET
 * Details : Fetching document List from mongodb
 * Database Name : "project"
 * Collection Name : "documentObject"
 */
route.get("/documentlist", (req, res) => {
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, db) {
      var database = db.db("project");
      database
        .collection("documentObject")
        .find({})
        .toArray(function(err, results) {
          res.json({ documentlist: results });
        });
    }
  );
});

/**
 * Request Type: POST
 * Details : Adding users into mongodb
 * Database Name : "project"
 * Collection Name : "userslist"
 */
route.post("/add", (req, res) => {
  var userObject = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    SSOID: req.body.SSOID
  };
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, db) {
      var database = db.db("project");
      database
        .collection("userslist")
        .insertOne(userObject, function(err, records) {
          if (err) throw err;
          else {
            //console.log(records);
            res.json({ message: "Added successfully" });
          }
        });
    }
  );
});
/**
 * Request Type: GET
 * Details : Fetching userlist from mongodb
 * Database Name : "project"
 * Collection Name : "userslist"
 */
route.get("/userlist", (req, res) => {
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, db) {
      var database = db.db("project");
      database
        .collection("userslist")
        .find({})
        .toArray(function(err, results) {
          res.json({ userlist: results });
        });
    }
  );
});

module.exports = route;
