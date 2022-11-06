import { Text, View } from "react-native";
import Title from "../components/Title";
import { useContext } from "react";
import { StudentContext } from "../store/StudentContext";
import { useNavigation } from "@react-navigation/native";

import { useFocusEffect } from "@react-navigation/native";

function ProfileScreen() {
  const navigation = useNavigation();
  const studentContext = useContext(StudentContext);
  // Checking if you have loged in / registered already
  // If you have logged in, then u can view ur profile
  // -----------------------------------------------
  // useFocusEffect runs everytime the screen is focused,
  // This means that whenever u click on profile it will check
  // if student has logged in --> he has put his email
  // --------------------------------------------
  // "!!" turns an empty string into false,
  //  "!" the third one is just so if it is empty --> false
  //  it will become !flase --> true
  useFocusEffect(() => {
    if (!!!studentContext.student.Email) {
      navigation.navigate("RegisterScreen");
    }
  });
  if (!!studentContext.student.Email) {
    return (
      <View>
        <Title> Profile </Title>
        <View>
          <Text>{"First name: " + studentContext.student.FName}</Text>
          <Text>{"Last name: " + studentContext.student.LName}</Text>
          <Text>{"Email: " + studentContext.student.Email}</Text>
          <Text>{"Password: " + studentContext.student.psw}</Text>
        </View>
      </View>
    );
  }
  // If you are not logged in, it will redirect u
  // To register screen, u can also move to login from there
}

export default ProfileScreen;
