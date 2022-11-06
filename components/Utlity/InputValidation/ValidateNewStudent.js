import { STUDENS } from "../../../data/dummy-data";
import { getStudents } from "../http";
function hasNumber(myString) {
  return /\d/.test(myString);
}
function hasLowerCase(myString) {
  return /[abcdefghijklmnopqrstuvwxuz]/.test(myString);
}
function hasUpperCase(myString) {
  return /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/.test(myString);
}
function hasNonLetters(myString) {
  let isValid = true;
  let pattern = /[^ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxuz]/;
  for (let i = 0; i < myString.length; i++) {
    let temp = myString.charAt(i);

    if (pattern.test(temp)) {
      isValid = false;

      break;
    }
  }
  return isValid;
}
function isValidPsw(psw) {
  if (
    psw.trim().length < 6 ||
    !hasLowerCase(psw) ||
    !hasUpperCase(psw) ||
    !hasNumber(psw)
  ) {
    return false;
  } else {
    return true;
  }
}

async function isUsedEmail(potentialStudent) {
  // since we used asnyc on getStudents, so it will return a promise
  // so we need to wait for that promise using asyn and await beofore
  // the method that returns the promise.
  const studens = await getStudents();
  for (let i = 0; i < studens.length; i++) {
    console.log(studens[i].Email + "\n");
  }
  const isUsedEmail1 = !!studens.find(
    (student) => student.Email === potentialStudent
  );
  return isUsedEmail1;
}
//  since isUsedEmail is asyn, then it will always also return a promise
//  so this function also needs to be async and waits for isUsedEmail
// the return value of validateNewStudent will be promise
// but it is not used, so we wont have to worry about that anymore
// thanks god
async function validateNewStudent(newStudent, setError, isChecked) {
  // -----------------------First name checks---------------
  if (newStudent.FName.trim() == "") {
    setError({
      errorMassage: "Please enter your first name",
      isValid: false,
      feilds: "FName",
    });
  } else if (newStudent.FName.length == 1) {
    setError({
      errorMassage: "Please enter your first name correctly.",
      isValid: false,
      feilds: "FName",
    });
  } else if (!hasNonLetters(newStudent.FName.trim())) {
    setError({
      errorMassage: "Invalid first name, Please retry",
      isValid: false,
      feilds: "FName",
    });
  } // -----------------------Last name checks---------------
  else if (newStudent.LName.trim() == "") {
    setError({
      errorMassage: "Please enter your last name",
      isValid: false,
      feilds: "LName",
    });
  } else if (newStudent.LName.length == 1) {
    setError({
      errorMassage: "Please enter your last name correctly.",
      isValid: false,
      feilds: "LName",
    });
  } else if (!hasNonLetters(newStudent.LName.trim())) {
    setError({
      errorMassage: "Invalid last name, Please retry",
      isValid: false,
      feilds: "LName",
    });
  } // -----------------------Email name checks---------------
  else if (newStudent.Email.trim() == "") {
    setError({
      errorMassage: "Please enter your email",
      isValid: false,
      feilds: "Email",
    });
  } else if (!newStudent.Email.toLowerCase().includes("@psu.edu.sa")) {
    setError({
      errorMassage: "You need to use your PSU email address",
      isValid: false,
      feilds: "Email",
    });
  } else if (newStudent.Email.length != 20) {
    setError({
      errorMassage: "Please enter your PSU email correctly",
      isValid: false,
      feilds: "Email",
    });
  } else if (!!(await isUsedEmail(newStudent.Email))) {
    setError({
      errorMassage: "Sorry! This email is already in use.",
      isValid: false,
      feilds: "Email",
    });
  }
  // -----------------------password name checks---------------
  else if (newStudent.psw.trim == "") {
    setError({
      errorMassage: "Please enter your password",
      isValid: false,
      feilds: "psw",
    });
  } else if (!isValidPsw(newStudent.psw)) {
    setError({
      errorMassage:
        "Password most contain 6 character, uppercase letter, lowercase letter and a number",
      isValid: false,
      feilds: "psw",
    });
  } // -----------------------Checking checkbox check, if it has been checked---------------
  else if (!isChecked) {
    setError({
      errorMassage: "Sorry, You forgot to accept the Terms & Conditions!",
      isValid: false,
      feilds: "Term",
    });
  } // -----------------------If all things valid, no error---------------
  else {
    setError({
      errorMassage: "",
      isValid: true,
      feilds: "",
    });
  }
}
export default validateNewStudent;
