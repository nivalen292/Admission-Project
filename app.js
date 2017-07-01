const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;
const connectionURL = "mongodb://nivalen:123ndb123@ds141232.mlab.com:41232/nivalen-db";

app.set('port', (process.env.PORT || 3000));

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

app.get("/api/grades", (request, response) => {
    const gender = request.headers.gender;
    const examSubject = request.headers.examsubject;
    const grade = +request.headers.grade;

    const mathGrade = +request.headers.mathgrade;
    const chemistryGrade = +request.headers.chemistrygrade;
    const literatureGrade = +request.headers.literaturegrade;
    const physicsGrade = +request.headers.physicsgrade;
    const englishGrade = +request.headers.englishgrade;
    const historyGrade = +request.headers.historygrade;
    const biologyGrade = +request.headers.biologygrade;
    const overAllGrade = +request.headers.overallgrade;

    const diplomaGrades = {
        mathGrade: mathGrade,
        chemistryGrade: chemistryGrade,
        literatureGrade: literatureGrade,
        physicsGrade: physicsGrade,
        englishGrade: englishGrade,
        historyGrade: historyGrade,
        biologyGrade: biologyGrade,
        overAllGrade: overAllGrade
    };

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
            const pickFromDiploma = require("./public/scripts/pick-from-diploma").pickFromDiploma;
            let coef = +course.entry[examSubject];
            if (grade * coef + pickFromDiploma(course.schoolGradeChoice, diplomaGrades, examSubject) >= course.grade) {
                return true;
            }
        });
        response.status(200).send(arr);
        console.log(arr);
    });
});

app.listen(app.get('port'), (err) => {  
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log('Server is running at http://localhost:' + app.get('port'));
});