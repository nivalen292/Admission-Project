function pickFromDiploma(arr, gradeObj, examSubject) {
    let sum = 0;
    if (arr.length === 0) {
        return sum;
    }
    arr.forEach(subject => {
        if (examSubject === subject) {
            const gradeName = String(subject).toLowerCase() + "Grade";
            sum += +gradeObj[gradeName];
            return;
        }
        switch(subject) {
            case "Math":
                sum += +gradeObj.mathGrade;
                break;
            case "English":
                sum += +gradeObj.englishGrade;
                break;
            case "Chemistry":
                sum += +gradeObj.chemistryGrade;
                break;
            case "Literature":
                sum += +gradeObj.literatureGrade;
                break;
            case "Physics":
                sum += +gradeObj.physicsGrade;
                break;
            case "Biology":
                sum += +gradeObj.biologyGrade;
                break;
            case "History":
                sum += +gradeObj.historyGrade;
                break;
        }
    });
    return sum;
}

module.exports = {
    pickFromDiploma
}