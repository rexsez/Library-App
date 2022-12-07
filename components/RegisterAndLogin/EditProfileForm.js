import { useState, useContext, useLayoutEffect } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getStudentID } from "../Utility/http";
import Student from "../../models/Student";
import ErrorComponent from "./ErrorComponent";

import Inpute from "./Inpute";
import PressableButton from "./PressableButton";
import { StudentContext } from "../../store/StudentContext";
import validateEditStudent from "../Utility/InputValidation/ValidateEditStudent";
import { updateProfile } from "../Utility/http";
function EditProfileForm() {
  // ----------------- Navigation stuff --------------
  const navigation = useNavigation();
  // We need studetn context for checking with the old password if it matchs the context.
  const oldStudentContext = useContext(StudentContext);

  const [oldPassword, setOldPassword] = useState("");
  //   Checking for errors on every input
  function onChangeTextHanddler(feild, entertedText) {
    // This function handles all text changes.
    // The function knows which text has been changed based on
    // The name of the field passed. (Switch)
    switch (feild) {
      case "FName":
        // To change only the first name, we need the values from previous state,
        //  coz we keep everything as it is, but we change only the first name
        setNewStudent((currentState) => {
          const temp = { ...currentState, FName: entertedText };
          validateEditStudent(
            temp,
            setError,
            oldPassword,
            oldStudentContext.student.psw,
            rePsw
          );
          return temp;
        });
        break;
      case "LName":
        setNewStudent((currentState) => {
          const temp = { ...currentState, LName: entertedText };
          validateEditStudent(
            temp,
            setError,
            oldPassword,
            oldStudentContext.student.psw,
            rePsw
          );
          return temp;
        });
        break;
      case "newPsw":
        // We put the new password into the student state, so we can save it to context later
        // We also use old validation from register form on passowrd ( letters, nummbers, one upper, one lower)
        setNewStudent((currentState) => {
          const temp = { ...currentState, psw: entertedText };
          validateEditStudent(
            temp,
            setError,
            oldPassword,
            oldStudentContext.student.psw,
            rePsw
          );
          return temp;
        });
        break;
      case "oldPsw":
        validateEditStudent(
          newStudent,
          setError,
          entertedText,
          oldStudentContext.student.psw,
          rePsw
        );
        setOldPassword((oldPassword) => entertedText);
        break;
      case "rePsw":
        validateEditStudent(
          newStudent,
          setError,
          oldPassword,
          oldStudentContext.student.psw,
          entertedText
        );
        SetRePsw((psw) => entertedText);
        break;
      default:
    }
  }
  const studentContext = useContext(StudentContext);
  const initialError = {
    errorMassage: "Fill the form please!",
    isValid: false,
    feilds: "",
    errorComponent: <View></View>,
  };

  const [error, setError] = useState(initialError);
  const [rePsw, SetRePsw] = useState("");
  function onPress() {
    //  we check if the inpute wasnt valid,
    // if inpute not valid we put error component with
    // appropriate message
    if (!error.isValid) {
      let newRrrorComponent = (
        <ErrorComponent>{error.errorMassage}</ErrorComponent>
      );
      setError((currentState) => {
        return { ...currentState, errorComponent: newRrrorComponent };
      });
      // else we just pass student infomation (fav list, barrowed list)
      //  to the app wide context
      //  so it can be used every where else
    } else {
      // putting new student data in context to be used locally
      studentContext.registerStudent(newStudent);
      // modifying the passowrd to be the new password
      updateProfile(studentContext.ID, newStudent);
      lastTouch();
      // re-intilalizing states
      setError(initialError);
      setNewStudent(initialNewStudent);
      setOldPassword("");
      SetRePsw("");
      navigation.navigate({ name: "DrawerProfile" });
    }
  }
  async function lastTouch() {
    // console.log(studentContext.Email);
    const id = await getStudentID(studentContext.student.Email);
    // console.log(id);
    studentContext.setID(id);
  }

  //   Putting the intiale context to be the context we already have
  const studens = studentContext.student;
  //   the || is used so if no barrowed books, it will put empty array instead of undefined.
  const initialNewStudent = new Student(
    studens.FName,
    studens.LName,
    studens.Email,
    "",
    studens.borrowedBooks || [],
    studens.favBooks || []
  );

  const [newStudent, setNewStudent] = useState(initialNewStudent);

  return (
    <>
      <View style={styles.InfoContainer}>
        <Inpute
          style={
            error.feilds == "FName" &&
            error.errorComponent &&
            styles.InputeError
          }
          onChangeTextHandler={onChangeTextHanddler.bind(this, "FName")}
          inputeTextProps={{
            placeholder: "New First Name",
            placeholderTextColor: "#10426E",
            maxLength: 15,
            value: newStudent.FName,
          }}
        ></Inpute>
        <Inpute
          style={
            error.feilds == "LName" &&
            error.errorComponent &&
            styles.InputeError
          }
          onChangeTextHandler={onChangeTextHanddler.bind(this, "LName")}
          inputeTextProps={{
            placeholder: "New Last Name",
            placeholderTextColor: "#10426E",
            maxLength: 15,
            value: newStudent.LName,
          }}
        ></Inpute>
        <Inpute
          style={
            error.feilds == "oldPsw" &&
            error.errorComponent &&
            styles.InputeError
          }
          onChangeTextHandler={onChangeTextHanddler.bind(this, "oldPsw")}
          inputeTextProps={{
            maxLength: 25,
            placeholder: "Old Password",
            placeholderTextColor: "#10426E",
            autoCapitalize: "none",
            secureTextEntry: true,
            value: oldPassword,
          }}
        ></Inpute>
        <Inpute
          style={
            error.feilds == "newPsw" &&
            error.errorComponent &&
            styles.InputeError
          }
          // ---- to be edited, check password
          onChangeTextHandler={onChangeTextHanddler.bind(this, "newPsw")}
          inputeTextProps={{
            maxLength: 25,
            placeholder: "New Password",
            placeholderTextColor: "#10426E",
            autoCapitalize: "none",
            secureTextEntry: true,
            value: newStudent.psw,
          }}
        ></Inpute>
        <Inpute
          style={
            error.feilds == "rePsw" &&
            error.errorComponent &&
            styles.InputeError
          }
          // ---- to be edited, check password
          onChangeTextHandler={onChangeTextHanddler.bind(this, "rePsw")}
          inputeTextProps={{
            maxLength: 25,
            placeholder: "Re-enter Password",
            placeholderTextColor: "#10426E",
            autoCapitalize: "none",
            secureTextEntry: true,
            value: rePsw.psw,
          }}
        ></Inpute>
        {error.errorComponent}
      </View>
      <KeyboardAvoidingView enabled={false}>
        <View style={styles.ButtonContainer}>
          <PressableButton onPress={onPress}>Confirm</PressableButton>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
const styles = StyleSheet.create({
  InfoContainer: {
    flex: 1,
    padding: 15,
    marginTop: 120,
    justifyContent: "center",
  },
  ButtonContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  InputeError: {
    borderBottomColor: "red",
  },
  chechboxError: {
    color: "red",
  },
  keyView: { flex: 1, padding: 15, marginTop: 120, justifyContent: "center" },
});
export default EditProfileForm;
