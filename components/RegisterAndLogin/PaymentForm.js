import { useState, useContext, useLayoutEffect } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Text } from "react-native-paper";
import { StackActions, useNavigation } from "@react-navigation/native";
import { giveGracePeriod } from "../Utility/http";
import validateCard from "../Utility/InputValidation/validateCard";
import Inpute from "./Inpute";
import PressableButton from "./PressableButton";
import { StudentContext } from "../../store/StudentContext";
import { Image } from "react-native";
import { Alert } from "react-native";
// changed_
import {
  isOverDue,
  numDaysFromDueDate,
  toFixed,
} from "../Utility/UtilityFunctions";

import DropDownMenu from "../AddBookComponents/Drop_Down_Menu";
import Colors from "../Utility/Colors";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { updatedListOfBorrowedBooks } from "../Utility/UtilityFunctions";

function PaymentForm({ onCancel }) {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.navigate("PaymentScreen", { onCancel: onCancel });
  }, [error]);

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

          return temp;
        });
        break;
      case "cardNumber":
        setNewStudent((currentState) => {
          const temp = { ...currentState, cardNumber: entertedText };

          return temp;
        });
        break;
      case "ccv":
        setNewStudent((currentState) => {
          const temp = { ...currentState, ccv: entertedText };

          return temp;
        });
        break;
      case "zipCode":
        setNewStudent((currentState) => {
          const temp = { ...currentState, zipCode: entertedText };

          return temp;
        });
        break;
      default:
    }
  }
  // checking for error in month
  function onChangeMonth(entertedText) {
    setMonth(entertedText.value);
  }
  // checking for error in year
  function onChangeYear(entertedText) {
    setYear(entertedText.value);
  }
  const studentContext = useContext(StudentContext);
  const initialError = {
    errorMassage: "Fill the form please!",
    isValid: false,
    feilds: "",
    errorComponent: <View></View>,
  };

  const [error, setError] = useState(initialError);
  async function onPress() {
    // First we validate the input
    await validateCard(newStudent, month, year, setError, fineAmount);
    //  we check if the inpute wasnt valid,
    // if inpute not valid we put error component with
    // appropriate message
  }
  useLayoutEffect(() => {
    if (!error.isValid) {
      // else we just pass student infomation (fav list, barrowed list)
      //  to the app wide context
      //  so it can be used every where else
    } else {
      // changed_
      // if there is no error, then:
      //1- Updated DB to give grace period for the student to return the book
      giveGracePeriod(studentContext.ID);
      //2- Updated Context to give grace period for the student to return the book
      // First we give grace period on all books over due from list of borrowed books
      console.log(
        " before updating it: " +
          JSON.stringify(studentContext.student.borrowedBooks)
      );
      const updatedBorrowedBooks = updatedListOfBorrowedBooks(
        studentContext.student.borrowedBooks
      );
      console.log(
        " after updating it: " +
          JSON.stringify(studentContext.student.borrowedBooks)
      );

      const updatedStudent = {
        FName: studentContext.student.FName,
        LName: studentContext.student.LName,
        Email: studentContext.student.Email,
        psw: studentContext.student.psw,
        borrowedBooks: updatedBorrowedBooks,
        favBooks: studentContext.student.favBooks,
      };
      studentContext.registerStudent(updatedStudent);
      // 3-how payment confirmation alert
      onComplete();
    }
  }, [error]);
  function onComplete() {
    const now = new Date();
    const month = now.getMonth();
    const nowDay = now.getDate();
    const dueDay = parseInt(nowDay) + 2 + "";
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const customerMassage =
      "Please return your the book before " +
      dueDay +
      "th of " +
      months[month] +
      ", or you wil be fined agian!";
    // changed_
    const alertMassage = Alert.alert(
      "Payment was Successful!",
      `Thank you for paying the fine ($${fineAmount}).\nNow you can use our app facilities again!\n${customerMassage}`,
      // add_nav
      [{ text: "Ok", onPress: () => cancelForm() }]
    );
    return alertMassage;
  }
  // changed_
  const listOfBorrowedBooks = studentContext?.student.borrowedBooks;
  const keys = Object.keys(listOfBorrowedBooks);
  let totalFine = 0;
  let numDays = 0;
  keys.forEach((key, index) => {
    if (isOverDue(listOfBorrowedBooks[key])) {
      let temp = numDaysFromDueDate(listOfBorrowedBooks[key]);
      totalFine = Math.round(totalFine + temp * 5);
      numDays = numDays + Math.abs(temp);
    }
  });
  totalFine *= 1.15;
  totalFine = Math.abs(toFixed(totalFine, 2));
  const popAction = StackActions.pop(1);
  function cancelForm() {
    if (!!onCancel) {
      onCancel();
    }
    navigation.dispatch(popAction);
  }
  let days = numDays;
  let daysText = "";
  if (days > 1) {
    daysText = " Days";
  } else {
    daysText = " Day";
  }
  let fineAmount = totalFine;
  // end change
  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <View style={styles.InfoContainer}>
        <View style={styles.details}>
          <View style={styles.innerdetails}>
            <View style={{ marginRight: 30 }}>
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
                5.00 SR/day
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.title}>Payment amount</Text>
          <Text style={styles.amount}>{fineAmount}.00 SR</Text>
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
              maxLength: 29,
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
            <Text style={[styles.title, { marginHorizontal: 0 }]}>CCV</Text>
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
          <PressableButton style={styles.cancelButton} onPress={cancelForm}>
            Cancel
          </PressableButton>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  cnt: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "black",
  },
  InfoContainer: {
    flex: 1,
    padding: 15,
    marginTop: -25,
    marginHorizontal: 10,
    justifyContent: "flex-end",
    borderWidth: 3,
    borderRadius: 10,
  },
  ButtonContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginHorizontal: "10%",
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
    backgroundColor: "white",
    borderRadius: 5,
    color: "black",
  },
  title: {
    marginHorizontal: "12%",
    color: "black",
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
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: Colors.color5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  imagesContainer: {
    marginHorizontal: "12%",
    flexDirection: "row",
    marginBottom: 10, //5151515151
  },
  details: {
    fontSize: 16,
  },
  amount: {
    fontSize: 20,
    marginHorizontal: "12%",
    color: Colors.color5,
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
    backgroundColor: Colors.primary500,
  },
  date: {
    flexDirection: "row",
  },
  // changed_
  innerdetails: {
    flexDirection: "row",
  },
});
export default PaymentForm;