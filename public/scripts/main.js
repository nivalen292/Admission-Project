import { get as getRequest } from 'requester';

$("#result").on("click", () => {
    const examSubject = $("#choice").val();
    const grade = $("#gradeField").val();
    const mathGrade = $("#mathField").val();
    const chemistryGrade = $("#chemistryField").val();
    const literatureGrade = $("#literatureField").val();
    const physicsGrade = $("#physicsField").val();
    const englishGrade = $("#englishField").val();
    const historyGrade = $("#historyField").val();
    const biologyGrade = $("#biologyField").val();
    const overAllGrade = $("#overAllGrade").val();
    const gender = $('input[name=gender]:checked').val();
    let headers = {
        examSubject: examSubject,
        grade: grade,
        gender: gender,
        mathGrade: mathGrade,
        chemistryGrade: chemistryGrade,
        literatureGrade: literatureGrade,
        physicsGrade: physicsGrade,
        englishGrade: englishGrade,
        historyGrade: historyGrade,
        biologyGrade: biologyGrade,
        overAllGrade: overAllGrade
    };
    getRequest("/api/grades", headers)
        .then();
});