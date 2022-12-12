import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { TextInput } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { HeaderBackButton } from "react-navigation-stack";
import { Alert } from "react-native";

import PressableButton from "./PressableButton";
import { StudentContext } from "../../store/StudentContext";
import Input from "../AddBookComponents/Input";
import { getStudentID, putVerification } from "../Utility/http";
import Colors from "../Utility/Colors";
import { AppContext } from "../../store/AppContext";

function VerificationForm() {
  const navigation = useNavigation();
  const appCtx = useContext(AppContext);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => {
            // This will remove The previous screen (Barcode scanner screen)
            appCtx.changeScreenHandler("Home");
            navigation.navigate("DrawerHome");
          }}
        />
      ),
    }); // if platform is IOS don't do anything
  }, []);
  const studentContext = useContext(StudentContext);

  const route = useRoute();
  const student = route.params.student;
  const Email = student.Email;
  const fetchedToken = studentContext.Token;

  const [token, changeToken] = useState("");

  async function submitHandler() {
    if (fetchedToken == token) {
      // putting new student data in context to be used locally
      studentContext.registerStudent(student);
      // adding the new student data to the database using post
      const ID = await getStudentID(Email);
      studentContext.setID(ID);
      putVerification(ID, "done");
      studentContext.setToken("done");
      navigation.navigate("DrawerProfile");
    } else {
      Alert.alert(
        " Verification Response",
        "The verification code is invalid",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
    }
  }

  return (
    <View style={styles.container}>
      <TextInput />
      <Text style = {styles.textStyle}>Enter Verification code</Text>
      <Input style = {styles.inputStyle}
        textInputConfig={{
          onChangeText: (enteredToken) => {
            changeToken(enteredToken);
          },
        }}
      />

      <PressableButton  onPress={submitHandler}>
        Submit
      </PressableButton>
    </View>
  );
}

export default VerificationForm;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",

    justifyContent: "center",
    alignContent: "center",
  },
  textStyle: {
    color: Colors.color5,
  },
  inputStyle: {
    width: 200,
    borderRadius:100,
  },
});
