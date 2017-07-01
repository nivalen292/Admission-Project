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

app.use("/public", express.static("public"));
app.use("/libs", express.static("node_modules"));

app.get("/", (request, response) => {

    response.sendFile(__dirname + "/public/index.html");
});

app.get("/api/grades", (request, resposne) => {
    const gender = request.headers.gender;
    const examSubject = request.headers.examsubject;
    const grade = +request.headers.grade;
    let arr;

    const query = {};
    const prop = "entry." + examSubject;
    query.gender = gender;
    query[prop] = { $exists: true, $ne: null };

    const promise = new Promise((resolve, reject) => {
        db.collection("year2016").find(query)
        .toArray((err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                resolve(result);
            }
        });
    });
    promise.then((value) => {
        arr = value;
        arr = arr.filter(course => {
            let coef = +course.entry[examSubject];
            if (grade * coef + grade >= course.grade) {
                return true;
            }
        });
        console.log(arr)
    });
});


app.listen(3000, () => console.log("Listening on port 3000"));
