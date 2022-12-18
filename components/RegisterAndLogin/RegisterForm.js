import { useState, useContext } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
// This is size-matters library imports, used to resize everything in specific scale.
// https://www.npmjs.com/package/react-native-size-matters <-- for more information
import { ScaledSheet } from "react-native-size-matters";
import { s, vs, ms, mvs } from "react-native-size-matters";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

import Student from "../../models/Student";
import MyButton from "../MyButton";
import CheckBox from "./CheckBox";
import ErrorComponent from "./ErrorComponent";
import validateNewStudent from "../Utility/InputValidation/ValidateNewStudent";
import InputeForm from "./InputeForm";
import PressableButton from "./PressableButton";
import { StudentContext } from "../../store/StudentContext";
import { registerStudent } from "../Utility/http";
import { AppContext } from "../../store/AppContext";
function RegisterForm() {
  // ----------------- Navigation stuff --------------

  const navigation = useNavigation();
  const appCtx = useContext(AppContext);
  function forceRerender(rerender) {
    rerender();
  }
  function onPressLoginHandler() {
    navigation.navigate("DrawerLogin");
  }
  function onPressGoBackhandler() {
    navigation.navigate("TabHome");
  }
  function onPressTermshandler() {
    navigation.navigate("StackTerms");
  }

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
        <View style={styles.containerWelcomeMessage}>
          <Text style={styles.welcomeMessage}>Register</Text>
        </View>
        <InputeForm
          style={
            error.feilds == "FName" &&
            error.errorComponent &&
            styles.InputeError
          }
          onChangeTextHandler={onChangeTextHanddler.bind(this, "FName")}
          inputeTextProps={{
            placeholder: "First Name",
            placeholderTextColor: "#063663",
            maxLength: 15,
          }}
        ></InputeForm>
        <InputeForm
          style={
            error.feilds == "LName" &&
            error.errorComponent &&
            styles.InputeError
          }
          onChangeTextHandler={onChangeTextHanddler.bind(this, "LName")}
          inputeTextProps={{
            placeholder: "Last Name",
            placeholderTextColor: "#063663",
            maxLength: 15,
          }}
        ></InputeForm>
        <InputeForm
          style={
            error.feilds == "Email" &&
            error.errorComponent &&
            styles.InputeError
          }
          onChangeTextHandler={onChangeTextHanddler.bind(this, "Email")}
          inputeTextProps={{
            placeholder: "Example@psu.edu.sa",
            placeholderTextColor: "#063663",
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
            placeholderTextColor: "#063663",
            autoCapitalize: "none",
            secureTextEntry: true,
          }}
        ></InputeForm>
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
      </View>
    </>
  );
}

const styles = ScaledSheet.create({
  InfoContainer: {
    flex: 1,
    padding: "10@mvs",
    paddingBottom: "0@mvs",
    margin: "20@mvs",
    marginTop: "175@mvs0.3",
    justifyContent: "center",
    borderWidth: 3,
    borderRadius: 15,
    backgroundColor: "white",
  },
  ButtonContainer: {
    alignItems: "center",
    marginBottom: "10@mvs",
  },
  InputeError: {
    borderBottomColor: "red",
  },
  chechboxError: {
    color: "red",
  },
  welcomeMessage: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#144c84",
    opacity: 1,
  },
  containerWelcomeMessage: {
    alignItems: "center",
  },
});
export default RegisterForm;
