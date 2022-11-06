import { useState } from "react";
import { View, StyleSheet } from "react-native";
import Student from "../../models/Student";
import MyButton from "../MyButton";
import CheckBox from "./CheckBox";
import ErrorComponent from "./ErrorComponent";
import { KeyboardAvoidingView } from "react-native";
import validateNewStudent from "../Utlity/InputValidation/ValidateNewStudent";
import Inpute from "./Inpute";
import PressableButton from "./PressableButton";
import { useContext } from "react";
import { StudentContext } from "../../store/StudentContext";
import { useNavigation } from "@react-navigation/native";
import AddIcon from "../AddIcon";
import { useLayoutEffect } from "react";
import { registerStudent } from "../Utlity/http";
function RegisterForm() {
  // ----------------- Navigation stuff --------------

  const navigation = useNavigation();
  function forceRerender(rerender) {
    rerender();
  }
  function onPressLoginHandler() {
    navigation.navigate("LoginScreen");
  }
  function onPressGoBackhandler() {
    navigation.navigate("Home");
  }
  function onPressTermshandler() {
    navigation.navigate("TermsAndConditions");
  }
  // ------------------------------------------------------
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: ({ size, color }) => (
        <AddIcon
          name="arrow-back-outline"
          size={25}
          color={color}
          onPress={onPressGoBackhandler}
        ></AddIcon>
      ),
    });
  }, [navigation]);
  const studentContext = useContext(StudentContext);
  const initialError = {
    errorMassage: "",
    isValid: true,
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
      // adding the new student data to the database using post
      registerStudent(newStudent);
      navigation.navigate({ name: "Profile" });
    }
  }

  const initialNewStudent = new Student(" ", " ", " ", " ", [], []);

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
            placeholder: "Last Name",
            placeholderTextColor: "#10426E",
            maxLength: 15,
          }}
        ></Inpute>
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
