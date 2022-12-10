import { useState, useContext } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Student from "../../models/Student";
import MyButton from "../MyButton";
import CheckBox from "./CheckBox";
import ErrorComponent from "./ErrorComponent";
import validateNewStudent from "../Utility/InputValidation/ValidateNewStudent";
import Inpute from "./Inpute";
import PressableButton from "./PressableButton";
import { StudentContext } from "../../store/StudentContext";
import { getStudentID, registerStudent } from "../Utility/http";
import { AppContext } from "../../store/AppContext";
import { Text } from "react-native";

function RegisterForm() {
  // ----------------- Navigation stuff --------------

  const navigation = useNavigation();
  const appCtx = useContext(AppContext);
  function forceRerender(rerender) {
    rerender();
  }
  function onPressLoginHandler() {
    navigation.navigate("StackLogin");
  }
  function onPressGoBackhandler() {
    appCtx.changeScreenHandler("Home");
    navigation.navigate("TabHome");
  }
  function onPressTermshandler() {
    appCtx.changeScreenHandler("Terms");
    navigation.navigate("StackTerms");
  }
  // ------------------------------------------------------
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: ({ size, color }) => (
  //       <AddIcon
  //         name="arrow-back-outline"
  //         size={25}
  //         color={color}
  //         onPress={onPressGoBackhandler}
  //       ></AddIcon>
  //     ),
  //   });
  // }, [navigation]);
  const studentContext = useContext(StudentContext);
  const initialError = {
    errorMassage: "Fill the form first please!",
    isValid: false,
    feilds: "",
    errorComponent: <View></View>,
  };

  const [isChecked, setIsChecked] = useState(false);
  function isCheckedhandler() {
    setIsChecked((currentState) => {
      if (currentState) {
        validateNewStudent(newStudent, setError, false);
        return false;
      } else {
        validateNewStudent(newStudent, setError, true);
        return true;
      }
    });
  }
  const [error, setError] = useState(initialError);

  async function onPress() {
    //  we check if the input wasn't valid,
    // if input not valid we put error component with
    // appropriate message
    if (!error.isValid) {
      let newRrrorComponent = (
        <ErrorComponent>{error.errorMassage}</ErrorComponent>
      );
      setError((currentState) => {
        return { ...currentState, errorComponent: newRrrorComponent };
      });
      // else we just pass student information (fav list, borrowed list)
      //  to the app wide context
      //  so it can be used every where else
    } else {
      await registerStudent(newStudent);
      setError(initialError);

      const token = newStudent["verification"];
      // studentContext.setID(ID);
      appCtx.changeScreenHandler("Profile");
      studentContext.setToken(token);
      navigation.navigate("StackVerification", {
        student: newStudent,
      });
      setNewStudent(initialNewStudent);
    }
  }

  const initialNewStudent = new Student("", "", "", "", [], []);

  const [newStudent, setNewStudent] = useState(initialNewStudent);
  function onChangeTextHanddler(feild, entertedText) {
    switch (feild) {
      case "FName":
        setNewStudent((currentState) => {
          const temp = { ...currentState, FName: entertedText };
          validateNewStudent(temp, setError, isChecked);
          return temp;
        });
        break;
      case "LName":
        setNewStudent((currentState) => {
          const temp = { ...currentState, LName: entertedText };
          validateNewStudent(temp, setError, isChecked);
          return temp;
        });
        break;
      case "Email":
        setNewStudent((currentState) => {
          const temp = { ...currentState, Email: entertedText };
          validateNewStudent(temp, setError, isChecked);
          return temp;
        });
        break;
      case "psw":
        setNewStudent((currentState) => {
          const temp = { ...currentState, psw: entertedText };
          validateNewStudent(temp, setError, isChecked);
          return temp;
        });
        break;
      default:
    }
  }
  return (
    <>
      <View style={styles.InfoContainer}>
        {/* <View style={styles}>
          <Text style={styles.label}>First Name</Text> */}
          <Inpute
            style={
              error.feilds == "FName" &&
              error.errorComponent &&
              styles.InputeError
            }
            onChangeTextHandler={onChangeTextHanddler.bind(this, "FName")}
            inputeTextProps={{
              placeholder: "First Name",
              placeholderTextColor: "#10426E",
              maxLength: 15,
              value: newStudent.FName,
            }}
          ></Inpute>
        {/* </View> */}
        {/* <View style={styles}>
          <Text style={styles.label}>Last Name</Text> */}
          <Inpute
            style={
              error.feilds == "LName" &&
              error.errorComponent &&
              styles.InputeError
            }
            onChangeTextHandler={onChangeTextHanddler.bind(this, "LName")}
            inputeTextProps={{
              placeholder: "Last Name",
              placeholderTextColor: "#10426E",
              maxLength: 15,
              value: newStudent.LName,
            }}
          ></Inpute>
        {/* </View> */}
        {/* <View style={styles}>
          <Text style={styles.label}>Email</Text> */}
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
              value: newStudent.Email,
            }}
          ></Inpute>
        {/* </View> */}
        {/* <View style={styles}>
          <Text style={styles.label}>Passwords</Text> */}
          <Inpute
            style={
              error.feilds == "psw" &&
              error.errorComponent &&
              styles.InputeError
            }
            onChangeTextHandler={onChangeTextHanddler.bind(this, "psw")}
            inputeTextProps={{
              maxLength: 25,
              placeholder: "Password",
              placeholderTextColor: "#10426E",
              autoCapitalize: "none",
              secureTextEntry: true,
              value: newStudent.psw,
            }}
          ></Inpute>
        {/* </View> */}
        {error.errorComponent}
        <CheckBox
          chechboxStyle={
            error.feilds == "Term" &&
            error.errorComponent &&
            styles.chechboxError
          }
          force={forceRerender}
          onPressCheckbox={isCheckedhandler}
          text="Agrees to"
          highlightedText="Terms and Conditions"
          onPressTerms={onPressTermshandler}
        ></CheckBox>
      </View>
      <KeyboardAvoidingView enabled={false}>
        <View style={styles.ButtonContainer}>
          <PressableButton onPress={onPress}>Sign up</PressableButton>
          <MyButton
            Flate="flate"
            style={{ marginTop: 20 }}
            onPress={onPressLoginHandler}
          >
            I'm already a member
          </MyButton>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
const styles = StyleSheet.create({
  label: {
    justifyContent: "center",
    marginHorizontal: "12%",
  },
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
export default RegisterForm;
