import { useState, useContext } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../../store/AppContext";

import { getStudentID, getStudents, getVerification } from "../Utility/http";
import Student from "../../models/Student";
import MyButton from "../MyButton";
import CheckBox from "./CheckBox";
import ErrorComponent from "./ErrorComponent";
import InputeForm from "./InputeForm";
import PressableButton from "./PressableButton";
import { StudentContext } from "../../store/StudentContext";
import validateLoginStudent from "../Utility/InputValidation/validateLoginStudent";

function LoginForm() {
  // -----------------Navigation stuff------------------------
  const navigation = useNavigation();
  const appCtx = useContext(AppContext);
  
  function onPressCreateAccHandler() {
    navigation.navigate("StackRegister");
  }
  const studentContext = useContext(StudentContext);
  const initialError = {
    errorMassage: "Fill the form first please!",
    isValid: false,
    feilds: "",
    errorComponent: <View></View>,
  };
  const [error, setError] = useState(initialError);
  async function onPress() {
    // if input is not valid, we put a new error component
    if (!error.isValid) {
      let newRrrorComponent = (
        <ErrorComponent>{error.errorMassage}</ErrorComponent>
      );
      setError((currentState) => {
        return { ...currentState, errorComponent: newRrrorComponent };
      });
    } else {
      const studens = await getStudents();
      indexOfStudent = studens.findIndex(
        (student) =>
        // I think here is them error, there was no check for the password
          student.Email == loginStudent.Email && student.psw == loginStudent.psw
      );
      loginStudentInfomation = studens[indexOfStudent];
      const studentID = await getStudentID(loginStudentInfomation.Email);
      const verification = await getVerification(studentID);
      studentContext.setToken(verification);
      if (verification !== "done") {
        appCtx.changeScreenHandler("");
        navigation.navigate("StackVerification", {
          student: {
            FName: loginStudentInfomation.FName,
            LName: loginStudentInfomation.LName,
            Email: loginStudentInfomation.Email,
            psw: loginStudentInfomation.psw,
            borrowedBooks: loginStudentInfomation.borrowedBooks,
            favBooks: loginStudentInfomation.favBooks,
          },
        });
      } else {
        studentContext.setID(studentID);
        // -----------------------------This needs some changes ------------------------
        studentContext.registerStudent({
          FName: loginStudentInfomation.FName,
          LName: loginStudentInfomation.LName,
          Email: loginStudentInfomation.Email,
          psw: loginStudentInfomation.psw,
          borrowedBooks: loginStudentInfomation.borrowedBooks,
          favBooks: loginStudentInfomation.favBooks,
        });

        appCtx.changeScreenHandler("Profile");
        navigation.navigate({ name: "DrawerProfile" });
      }
    }
  }

  const initialLoginStudent = new Student(" ", " ", " ", " ", null, null);

  const [loginStudent, setLoginStudent] = useState(initialLoginStudent);
  function onChangeTextHanddler(feild, entertedText) {
    switch (feild) {
      case "Email":
        setLoginStudent((currentState) => {
          const temp = { ...currentState, Email: entertedText };
          // ---------------------------------- To be Changed
          validateLoginStudent(temp, setError);
          return temp;
        });
        break;
      case "psw":
        setLoginStudent((currentState) => {
          const temp = { ...currentState, psw: entertedText };
          // ---------------------------------- To be Changed
          validateLoginStudent(temp, setError);
          return temp;
        });
        break;
      default:
    }
  }
  return (
    <>
      <View style={styles.InfoContainer}>
        <View style={styles.containerWelcomeMessage}>
          <Text style={styles.welcomeMessage}>Login</Text>
        </View>
        <InputeForm
          style={
            error.feilds == "Email" &&
            error.errorComponent &&
            styles.InputeError
          }
          onChangeTextHandler={onChangeTextHanddler.bind(this, "Email")}
          inputeTextProps={{
            placeholder: "Example@psu.edu.sa",
            placeholderTextColor: "#10426E",
            maxLength: 20,
            autoCapitalize: "none",
            keyboardType: "email-address",
          }}
        ></InputeForm>
        <InputeForm
          style={
            error.feilds == "psw" && error.errorComponent && styles.InputeError
          }
          onChangeTextHandler={onChangeTextHanddler.bind(this, "psw")}
          inputeTextProps={{
            maxLength: 25,
            placeholder: "Password",
            placeholderTextColor: "#10426E",
            autoCapitalize: "none",
            secureTextEntry: true,
          }}
        ></InputeForm>
        <CheckBox text="Remember Me"></CheckBox>
        {error.errorComponent}
        <KeyboardAvoidingView enabled={false}>
          <View style={styles.ButtonContainer}>
            <PressableButton onPress={onPress}>Sign in</PressableButton>
            <MyButton
              onPress={onPressCreateAccHandler}
              Flate="flate"
              style={{ marginTop: 5 }}
            >
              Create An Account?
            </MyButton>
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  InfoContainer: {
    flex: 0.8,
    padding: 10,
    paddingBottom: 0,
    margin: 20,
    marginTop: 200,
    justifyContent: "center",
    borderWidth: 3,
    borderRadius: 15,
    backgroundColor: "white",
  },
  ButtonContainer: {
    alignItems: "center",
  },
  InputeError: {
    borderBottomColor: "red",
  },
  keyView: { flex: 1, padding: 15, marginTop: 120, justifyContent: "center" },
  welcomeMessage: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 5,
    color: "#144c84",
    opacity: 1,
    marginTop: -40,
  },
  containerWelcomeMessage: {
    alignItems: "center",
  },
});
export default LoginForm;
