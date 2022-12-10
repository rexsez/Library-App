import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { TextInput } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { HeaderBackButton } from "react-navigation-stack";
import { StackActions } from "@react-navigation/native";

import { StudentContext } from "../../store/StudentContext";
import Input from "../AddBookComponents/Input";
import MyButton from "../MyButton";
import { getStudentID, putVerification } from "../Utility/http";

function VerificationForm() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => {
            // This will remove The previous screen (Barcode scanner screen)
            navigation.navigate("DrawerHome");
          }}
        />
      ),
    }); // if platform is IOS don't do anything
  }, []);
  const studentContext = useContext(StudentContext);
  const route = useRoute();
  const student = route.params.student;
  // console.log(student);
  // console.log("I am here");

  const Email = student.Email;

  const fetchedToken = studentContext.Token;
  // console.log("The fetched Token is " + fetchedToken);

  const [token, changeToken] = useState("");

  async function submitHandler() {
    if (fetchedToken == token) {
      // console.log("I am here 2")
      // putting new student data in context to be used locally
      studentContext.registerStudent(student);
      // adding the new student data to the database using post

      // console.log(Email);
      const ID = await getStudentID(Email);
      studentContext.setID(ID);
      putVerification(ID, "done");
      studentContext.setToken("done");
      navigation.navigate("DrawerProfile");
    } else {
      // console.log("I am here 2");
    }
  }

  return (
    <View style={styles.container}>
      <TextInput />
      <Text>Enter Verification code</Text>
      <Input
        textInputConfig={{
          onChangeText: (enteredToken) => {
            // console.log(ddd);
            changeToken(enteredToken);
          },
        }}
      />

      <MyButton textStyle={styles.textStyle} onPress={submitHandler}>
        Submit
      </MyButton>
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
    color: "black",
  },
});
