import { Text, View } from "react-native";
import { useContext } from "react";
import { StudentContext } from "../store/StudentContext";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import Title from "../components/Title";

function ProfileScreen() {
  const navigation = useNavigation();
  const studentContext = useContext(StudentContext);
  // Checking if you have logged in / registered already
  // If you have logged in, then u can view ur profile
  // -----------------------------------------------
  // useFocusEffect runs every time the screen is focused,
  // This means that whenever u click on profile it will check
  // if student has logged in --> he has put his email
  // --------------------------------------------
  // "!!" turns an empty string into false,
  //  "!" the third one is just so if it is empty --> false
  //  it will become !false --> true
  useFocusEffect(() => {
    if (!!!studentContext.student.Email) {
      navigation.navigate("DrawerRegister");
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
          <Text>
            {"Borrowed Books: " +
              JSON.stringify(studentContext.student.borrowedBooks)}
          </Text>
          <Text>
            {"Favorite Books: " +
              JSON.stringify(studentContext.student.favBooks)}
          </Text>
        </View>
      </View>
    );
  }
  // If you are not logged in, it will redirect u
  // To register screen, u can also move to login from there
}

export default ProfileScreen;
