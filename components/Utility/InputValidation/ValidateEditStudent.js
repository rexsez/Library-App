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

function isCorrectPassword(oldPassword, contextPassword) {
  if (contextPassword == oldPassword) return true;
  else return false;
}

async function validateEditStudent(
  newStudent,
  setError,
  oldPsw,
  contextPassword,
  rePsw
) {
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
  }
  // -------------------- check if the old password matchs the context ----------------------
  else if (!isCorrectPassword(oldPsw, contextPassword)) {
    setError({
      errorMassage: "Please enter the correct old password!",
      isValid: false,
      feilds: "oldPsw",
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
      feilds: "newPsw",
    });
  }
  // ----------------------- check new passowrd match re-entried password --------
  else if (!(newStudent.psw == rePsw)) {
    setError({
      errorMassage: "Re-enter password doesn't match the new password entered",
      isValid: false,
      feilds: "rePsw",
    });
  }
  // -----------------------If all things valid, no error---------------
  else {
    setError({
      errorMassage: "",
      isValid: true,
      feilds: "",
    });
  }
}
export default validateEditStudent;
