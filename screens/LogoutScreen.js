import { useContext } from "react";
import { StudentContext } from "../store/StudentContext";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Student from "../models/Student";

function LogoutScreen() {
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

  const student = {
    FName: "",
    LName: "",
    Email: "",
    psw: "",
    borrowedBooks: [],
    favBooks: [],
  };

  if (true) navigation.navigate("DrawerRegister");
  // If you are not logged in, it will redirect u
  // To register screen, u can also move to login from there
  return;
}

export default LogoutScreen;
