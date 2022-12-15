// edite for backend---------------------------------
import { getStudents } from "../http";
// ---------------------------------------------------
async function validateLoginStudent(loginStudentInfo, setError) {
  if (!!!(await checkPassword(loginStudentInfo))) {
    setError({
      errorMassage: "Wrong credentials!",
      isValid: false,
      feilds: "Email",
    });
  } else {
    setError({
      errorMassage: "",
      isValid: true,
      feilds: "",
    });
  }
}

async function isUsedEmail(potentialStudent) {
  const studens = await getStudents();
  return studens.find((student) => student.Email === potentialStudent.Email);
}
async function checkPassword(potentialStudent) {
  const studens = await getStudents();
  return studens.find(
    (student) =>
      student.Email === potentialStudent.Email &&
      student.psw == potentialStudent.psw
  );
}
export default validateLoginStudent;
