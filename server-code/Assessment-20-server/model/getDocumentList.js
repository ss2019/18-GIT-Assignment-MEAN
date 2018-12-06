const route = require("express").Router();
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
/**
 * Request Type: GET
 * Details : Fetching document list from mongodb 
 * Database Name : "project"
 * Collection Name : "documentlist"
 */
route.get("/doclist",(req,res)=>{
    MongoClient.connect(url,{useNewUrlParser:true}, function(err,db){
        var  database =  db.db("project");
        database.collection("documentlist").find({}).toArray(function(err, docList){
            if(err)  throw err;
            res.json({"doclist":docList});
        });
    });
});
module.exports = route;