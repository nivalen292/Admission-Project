import { get as getRequest } from 'requester';

$("#result").on("click", () => {
    const examSubject = $("#choice").val();
    const grade = $("#gradeField").val();
    const gender = $('input[name=gender]:checked').val();
    let headers = {
        examSubject: examSubject,
        grade: grade,
        gender: gender
    };
    getRequest("/api/grades", headers)
        .then(value => console.log(value));
});