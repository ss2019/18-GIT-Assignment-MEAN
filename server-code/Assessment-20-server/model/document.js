const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";

MongoClient.connect(url, {useNewUrlParser:true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("project");
    /*   
    dbo.createCollection("documentlist",
    {
            fileName:String,
            fileType:String,
            description:String,
            
    },function(err,res){
        if(err) throw err;
        console.log("collection  created");
    })
    */
      
    var myobj = { fileName: "saon", fileType: "saila", description:'saon.saila@gmail.com',SSOID:'123456' };
    dbo.collection("documentlist").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
    
    

  });

