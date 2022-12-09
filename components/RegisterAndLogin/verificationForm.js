import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { TextInput } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { StudentContext } from "../../store/StudentContext";
import Input from "../AddBookComponents/Input";
import MyButton from "../MyButton";
import {
  getStudentID,
  getVerification,
  putVerification,
} from "../Utility/http";

function VerificationForm() {
  const route = useRoute();
  const navigation = useNavigation();
  const studentContext = useContext(StudentContext);

  const student = route.params.student;
  const Email = student.Email;

  const fetchedToken = route.params.token;
  console.log("The fetched Token is " + fetchedToken);

  const [token, setToken] = useState("");

  async function submitHandler() {
    if (fetchedToken == token) {
      // putting new student data in context to be used locally
      studentContext.registerStudent(student);
      // adding the new student data to the database using post

      // console.log(Email);
      const ID = await getStudentID(Email);
      studentContext.setID(ID);
      putVerification(ID, "done");
      navigation.navigate("DrawerProfile");
    } else {
      // console.log("They are different");
    }
  }
  return (
    <View style={styles.container}>
      <TextInput />
      <Text>Enter Verification code</Text>
      <Input
        textInputConfig={{
          onChangeText: (ddd) => {
            // console.log(ddd);
            setToken(ddd);
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
