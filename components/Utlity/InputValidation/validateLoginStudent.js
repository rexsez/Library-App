// edite for backend---------------------------------
import { STUDENS } from "../../../data/dummy-data";
import { getStudents } from "../http";
// ---------------------------------------------------
async function validateLoginStudent(loginStudentInfo, setError) {
  if (!!!(await isUsedEmail(loginStudentInfo))) {
    setError({
      errorMassage: "Email doesn't exist!",
      isValid: false,
      feilds: "Email",
    });
  } else if (!!!(await checkPassword(loginStudentInfo))) {
    setError({
      errorMassage: "Password is incorrect!",
      isValid: false,
      feilds: "psw",
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
  return studens.find((student) => student.psw === potentialStudent.psw);
}
export default validateLoginStudent;
