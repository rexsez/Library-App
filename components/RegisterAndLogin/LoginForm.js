import { useState } from "react";
import { View, StyleSheet } from "react-native";
import Student from "../../models/Student";
import MyButton from "../MyButton";
import CheckBox from "./CheckBox";
import ErrorComponent from "./ErrorComponent";
import { KeyboardAvoidingView } from "react-native";
import Inpute from "./Inpute";
import PressableButton from "./PressableButton";
import { useContext } from "react";
import { StudentContext } from "../../store/StudentContext";
import { useNavigation } from "@react-navigation/native";
import validateLoginStudent from "../Utlity/InputValidation/validateLoginStudent";
import { getStudents } from "../Utlity/http";
function LoginForm() {
  // -----------------Navigation stuff------------------------
  const navigation = useNavigation();
  function onPressCreateAccHandler() {
    navigation.goBack();
  }
  const studentContext = useContext(StudentContext);
  const initialError = {
    errorMassage: "",
    isValid: true,
    feilds: "",
    errorComponent: <View></View>,
  };
  const [error, setError] = useState(initialError);
  async function onPress() {
    // if inpute is not valid, we put a new error component
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
        (student) => student.Email === loginStudent.Email
      );
      loginStudentInfomation = studens[indexOfStudent];
      // -----------------------------This needs some changes ------------------------
      studentContext.registerStudent({
        FName: loginStudentInfomation.FName,
        LName: loginStudentInfomation.LName,
        Email: loginStudentInfomation.Email,
        psw: loginStudentInfomation.psw,
      });
      navigation.navigate({ name: "Profile" });
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
        <Inpute
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
        ></Inpute>
        <Inpute
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
        ></Inpute>
        {error.errorComponent}
        <CheckBox text="Rememebr Me"></CheckBox>
      </View>
      <KeyboardAvoidingView enabled={false}>
        <View style={styles.ButtonContainer}>
          <PressableButton onPress={onPress}>Login</PressableButton>
          <MyButton
            onPress={onPressCreateAccHandler}
            Flate="flate"
            style={{ marginTop: 20 }}
          >
            Create An Account?
          </MyButton>
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
  keyView: { flex: 1, padding: 15, marginTop: 120, justifyContent: "center" },
});
export default LoginForm;
