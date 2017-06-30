const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;
const connectionURL = "mongodb://nivalen:123ndb123@ds141232.mlab.com:41232/nivalen-db";

let db;
MongoClient.connect(connectionURL, function (err, database) {
        if (err) {
            console.error(err);
        }
        db = database;
    });

app.get("/", (request, response) => {
    db.collection("year2016").find({"school": "СУ"});
    response.sendFile(__dirname + "/public/index.html");
});

app.listen(3000, () => console.log("Listening on port 3000"));
