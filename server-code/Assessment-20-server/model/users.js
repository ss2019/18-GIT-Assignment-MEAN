const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";

MongoClient.connect(
  url,
  { useNewUrlParser: true },
  function(err, db) {
    if (err) throw err;
    var dbo = db.db("project");
    /*    
    dbo.createCollection("userslist",
    {
            firstName:String,
            lastName:String,
            email:String,
            SSOID:String
    },function(err,res){
        if(err) throw err;
        console.log("collection  created");
    })*/

    var myobj = {
      firstName: "saon",
      lastName: "saila",
      email: "saon.saila@gmail.com",
      SSOID: "123456"
    };
    dbo.collection("userslist").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  }
);
