import { useState, useContext, useLayoutEffect } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getStudentID } from "../Utility/http";
import Student from "../../models/Student";
import ErrorComponent from "./ErrorComponent";
import validateCard from "../Utility/InputValidation/validateCard";
import Inpute from "./Inpute";
import PressableButton from "./PressableButton";
import { StudentContext } from "../../store/StudentContext";
import validateEditStudent from "../Utility/InputValidation/ValidateEditStudent";
import { updateProfile } from "../Utility/http";
import { ActivityIndicator, Text } from "react-native-paper";
import { Image } from "react-native";

import DropDownMenu from "../AddBookComponents/Drop_Down_Menu";
import Colors from "../Utility/Colors";
function PaymentForm() {
  const monthElements = [
    { label: "01", value: "01" },
    { label: "02", value: "02" },
    { label: "03", value: "03" },
    { label: "04", value: "04" },
    { label: "05", value: "05" },
    { label: "06", value: "06" },
    { label: "07", value: "07" },
    { label: "08", value: "08" },
    { label: "09", value: "09" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
  ];
  // Getting the list of years danimacally based on the current year
  // First we get part of year we want 20 - (22)
  const d = new Date();
  let currentYear = d.getFullYear().toString();
  let partYear = currentYear.substring(2, 4);
  // Then we pupolate the array with year values after the current year
  let yearElements = [];
  for (let i = 0; i < 50; i++) {
    let casted = parseInt(partYear);
    casted += i;
    casted = casted.toString();
    let temp = { label: casted, value: casted };

    yearElements.push(temp);
  }
  const [month, setMonth] = useState("MM");
  const [year, setYear] = useState("YY");
  const initialNewStudent = {
    name: "",
    cardNumber: "",
    ccv: "",
    zipCode: "",
  };

  const [newStudent, setNewStudent] = useState(initialNewStudent);

  //   Checking for errors on every input
  function onChangeTextHanddler(feild, entertedText) {
    // This function handles all text changes.
    // The function knows which text has been changed based on
    // The name of the field passed. (Switch)
    switch (feild) {
      case "name":
        // To change only the first name, we need the values from previous state,
        //  coz we keep everything as it is, but we change only the first name
        setNewStudent((currentState) => {
          const temp = { ...currentState, name: entertedText };
          validateCard(temp, month, year, setError);
          return temp;
        });
        break;
      case "cardNumber":
        setNewStudent((currentState) => {
          const temp = { ...currentState, cardNumber: entertedText };
          validateCard(temp, month, year, setError);
          return temp;
        });
        break;
      case "ccv":
        setNewStudent((currentState) => {
          const temp = { ...currentState, ccv: entertedText };
          validateCard(temp, month, year, setError);
          return temp;
        });
        break;
      case "zipCode":
        setNewStudent((currentState) => {
          const temp = { ...currentState, zipCode: entertedText };
          validateCard(temp, month, year, setError);
          return temp;
        });
        break;
      default:
    }
  }
  // checking for error in month
  function onChangeMonth(entertedText) {
    setMonth(entertedText.value);
    validateCard(newStudent, entertedText.value, year, setError);
  }
  // checking for error in year
  function onChangeYear(entertedText) {
    setYear(entertedText.value);
    validateCard(newStudent, month, entertedText.value, setError);
  }
  const studentContext = useContext(StudentContext);
  const initialError = {
    errorMassage: "Fill the form please!",
    isValid: false,
    feilds: "",
    errorComponent: <View></View>,
  };

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
      console.log("okay valid!");
    }
  }
  async function lastTouch() {
    // console.log(studentContext.Email);
    const id = await getStudentID(studentContext.student.Email);
    // console.log(id);
    studentContext.setID(id);
  }

  //   Putting the intiale context to be the context we already have
  const studens = studentContext.student;

  let days = 1;
  let daysText = "";
  if (days > 1) {
    daysText = " Days";
  } else {
    daysText = " Day";
  }
  let amount = days * 5;

  return (
    <>
    <View style={styles.titleContainer}>
      <Text style={styles.cardTitle}>Payment</Text>
    </View>
      <View style={styles.InfoContainer}>
        <View style={styles.details}>
          <View style={styles.innerDetial}>
            <Text style={[styles.title, { marginHorizontal: 0 }]}>
              Over due by
            </Text>
            <Text style={[styles.amount, { marginHorizontal: 0 }]}>
              {days + daysText}
            </Text>
          </View>
          <View>
            <Text style={[styles.title, { marginHorizontal: 0 }]}>
              Rate of charge
            </Text>
            <Text style={[styles.amount, { marginHorizontal: 0 }]}>
              {amount}.00 SR/day
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.title}>Payment amount</Text>
          <Text style={styles.amount}>{amount}.00 SR</Text>
        </View>
        <View>
          <View style={styles.imagesContainer}>
            <View style={styles.imageContainer}>
              <Image
                resizeMode="contain"
                source={require("../../assets/master.png")}
                style={styles.Image}
              ></Image>
            </View>
            <View style={styles.imageContainer}>
              <Image
                resizeMode="contain"
                source={require("../../assets/Stc_pay.png")}
                style={styles.Image}
              ></Image>
            </View>
            <View style={styles.imageContainer}>
              <Image
                resizeMode="contain"
                source={require("../../assets/visa.png")}
                style={styles.Image}
              ></Image>
            </View>
          </View>
          <Text style={styles.title}>Name on card</Text>
          <Inpute
            style={[
              styles.inpute,
              error.feilds == "name" &&
                error.errorComponent &&
                styles.InputeError,
            ]}
            onChangeTextHandler={onChangeTextHanddler.bind(this, "name")}
            inputeTextProps={{
              placeholderTextColor: "white",
              maxLength: 25,
              value: newStudent.name,
            }}
          ></Inpute>
        </View>
        <View>
          <Text style={styles.title}>Card number</Text>
          <Inpute
            style={[
              styles.inpute,
              error.feilds == "cardNumber" &&
                error.errorComponent &&
                styles.InputeError,
            ]}
            onChangeTextHandler={onChangeTextHanddler.bind(this, "cardNumber")}
            inputeTextProps={{
              placeholderTextColor: "white",
              maxLength: 19,
              value: newStudent.cardNumber,
              keyboardType: "number-pad",
            }}
          ></Inpute>
        </View>
        <View style={styles.doubleInpute}>
          <View style={[styles.inner, { marginRight: 10 }]}>
            <Text style={[styles.title, { marginHorizontal: 0 }]}>
              Expiry date
            </Text>
            <View style={[styles.date]}>
              <DropDownMenu //Category
                style={[
                  {
                    flex: 1,
                    marginHorizontal: 0,
                    marginVertical: 0,
                    marginRight: 2,
                  },
                ]}
                label={month}
                elements={monthElements}
                dropDownConfig={{
                  onChange: onChangeMonth,
                }}
              />
              <DropDownMenu //Category
                style={{ flex: 1, marginHorizontal: 0, marginVertical: 0 }}
                label={year}
                elements={yearElements}
                dropDownConfig={{
                  onChange: onChangeYear,
                }}
              />
            </View>
          </View>
          <View style={styles.inner}>
            <Text style={[styles.title, { marginHorizontal: 0 }]}>
              Security code
            </Text>
            <Inpute
              style={[
                styles.inpute,
                error.feilds == "ccv" &&
                  error.errorComponent &&
                  styles.InputeError,
              ]}
              size={styles.size}
              // ---- to be edited, check password
              onChangeTextHandler={onChangeTextHanddler.bind(this, "ccv")}
              inputeTextProps={{
                maxLength: 3,
                placeholder: "CCV",
                placeholderTextColor: "white",
                autoCapitalize: "none",
                value: newStudent.ccv,
                keyboardType: "number-pad",
              }}
            ></Inpute>
          </View>
        </View>
        <View>
          <Text style={styles.title}>ZIP/Postal code</Text>
          <Inpute
            style={[styles.inpute]}
            onChangeTextHandler={onChangeTextHanddler.bind(this, "zipCode")}
            inputeTextProps={{
              maxLength: 10,
              placeholderTextColor: "white",
              placeholder: " Optional",
              autoCapitalize: "none",
              keyboardType: "numeric",
              value: newStudent.zipCode,
            }}
          ></Inpute>
        </View>
        {error.errorComponent}
        <View style={styles.ButtonContainer}>
          <PressableButton onPress={onPress} style={styles.payButton}>
            Pay
          </PressableButton>
          <PressableButton style={styles.cancelButton} onPress={onPress}>
            Cancel
          </PressableButton>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  InfoContainer: {
    flex: 1,
    padding: 15,
    marginTop: 20,
    justifyContent: "flex-end",
  },
  titleContainer: {
    marginTop: 55,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 4,
    borderRadius: 4,
    marginHorizontal: "30%"
  },
  cardTitle: {
    textAlign: "center",
    fontSize: 36,
    color: Colors.color6
  },
  ButtonContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginHorizontal: "12%",
    marginTop: 12,
  },
  InputeError: {
    borderColor: "red",
  },
  chechboxError: {
    color: "red",
  },
  inpute: {
    borderWidth: 2,
    borderColor: "black",
    padding: 4,
    paddingLeft: 8,
    backgroundColor: "gray",
    color: "white",
  },
  title: {
    marginHorizontal: "12%",
    color: "gray",
    fontSize: 20,
    fontWeight: "bold",
  },

  doubleInpute: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "12%",
  },
  size: {
    marginHorizontal: 0,
    width: "100%",
  },
  inner: {
    flex: 1,
  },
  Image: {
    width: 70,
    height: 50,
  },
  imageContainer: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#C5C5C5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  imagesContainer: {
    marginHorizontal: "12%",
    flexDirection: "row",
    marginBottom: 5,
  },
  details: {
    fontSize: 16,
  },
  amount: {
    fontSize: 20,
    marginHorizontal: "12%",
    color: "gray",
  },
  details: {
    flexDirection: "row",
    marginHorizontal: "12%",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#C65356",
  },
  payButton: {
    backgroundColor: "#53c6c3",
  },
  date: {
    flexDirection: "row",
  },
});
export default PaymentForm;
