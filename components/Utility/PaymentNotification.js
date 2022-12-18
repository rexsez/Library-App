import { useContext } from "react";
import { StudentContext } from "../../store/StudentContext";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert } from "react-native";
import { toFixed } from "./UtilityFunctions";
function PaymentNotification({ onPressCancel }) {
  const navigation = useNavigation();
  const studentContext = useContext(StudentContext);
  // changed_
  // This variable will make sure to show the Aler massage only once

  const [seen, setSeen] = useState(false);

  if (
    studentContext?.student.Email &&
    !seen &&
    studentContext.student?.borrowedBooks
  ) {
    const listOfBorrowedBooks = studentContext?.student.borrowedBooks;
    const keys = Object.keys(listOfBorrowedBooks);
    let numOverDue = 0;
    let totalFine = 0;
    let numDays = 0;
    keys.forEach((key, index) => {
      if (isOverDue(listOfBorrowedBooks[key])) {
        numOverDue = numOverDue + 1;
        let temp = numDaysFromDueDate(listOfBorrowedBooks[key]);
        totalFine = Math.round(totalFine + temp * 5);
        numDays = numDays + Math.abs(temp);
      }
    });
    totalFine *= 1.15;
    totalFine = toFixed(totalFine, 2);
    if (totalFine != 0) {
      setSeen(true);
      paymentNotification(numOverDue, Math.abs(totalFine), numDays);
    }
  }
  // Supporting function for checking if books are overdue
  function isOverDue(dueDate) {
    const dueDateObject = new Date(dueDate);
    const now = new Date();
    if (dueDateObject - now <= 0) {
      return true;
    } else {
      return false;
    }
  }
  // Supporting function for finding number of days from due date
  function numDaysFromDueDate(dueDate) {
    if (dueDate == "pending") return 0;
    var days = new Date(dueDate).getTime() - new Date().getTime();
    days = Math.floor(days / (1000 * 60 * 60 * 24));
    days = days + 1;
    return days;
  }
  // function that shows customer alert messages when books are over due
  function paymentNotification(numOverDue, totalFine, numDays) {
    let dayText = "";
    if (numOverDue > 1) {
      dayText = "s";
    }
    const customerMassage =
      `\nYou have missed the due date for returning ${numOverDue} book${dayText}.` +
      `The total number of late days for all book${dayText} is ${numDays} day${dayText}!\n\n` +
      `Now you need to pay SR 5.00/day, your total is SR ${totalFine} including VAT`;

    const alertMassage = Alert.alert(
      "Borrowing Policy Violated",
      `${customerMassage}`,
      // add_nav
      [
        //
        { text: "Got it!", onPress: onPressCancel },
        {
          text: "Pay Online",
          onPress: () => {
            navigation.navigate("PaymentScreen", { onCancel: onPressCancel });
          },
        },
      ]
    );
    return alertMassage;
  }
  return;
}
export default PaymentNotification;
