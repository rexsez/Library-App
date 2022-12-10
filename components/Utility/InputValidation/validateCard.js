// import { sha256 } from "react-native-sha256";

const cardDB = {
  name: "abdullah",
  cardNumber: "1111111111111111111",
  month: "01",
  year: "42",
  ccv: "123",
};
function isExpired(month, year) {
  const numericYear = parseInt("20" + year);

  const numericMonth = parseInt(month);

  const lastDay = new Date(numericYear, numericMonth + 1, 0);

  const now = new Date();

  if (now - lastDay <= 0) {
    return false;
  } else {
    return true;
  }
}
function isValid(name, cardNumber, year, month, ccv) {
  if (
    name == cardDB.name &&
    cardNumber == cardDB.cardNumber &&
    cardDB.year == year &&
    month == cardDB.month &&
    ccv == cardDB.ccv
  ) {
    // let hash1 = "";
    // sha256("a").then((hash) => {
    //   console.log(hash);
    // });
    return true;
  } else {
    // let hash1 = "";
    // sha256("a").then((hash) => {
    //   console.log(hash);
    // });
    return false;
  }
}
function isFilledYear(year) {
  if (year == "YY") {
    return false;
  }
  return true;
}
function isFilledMonth(month) {
  if (month == "MM") {
    return false;
  }
  return true;
}

export default function validateCard(cardInfo, month, year, setError) {
  // ---------------------------- check name -------------------------

  if (cardInfo.name.trim() == "") {
    setError({
      errorMassage: "Please enter card holder name!",
      isValid: false,
      feilds: "FName",
    });
  } else if (cardInfo.name.length == 1) {
    setError({
      errorMassage: "Please enter a valid card holder name!",
      isValid: false,
      feilds: "FName",
    });
  }
  //   --------------------------------- check card number ------------
  else if (cardInfo.cardNumber.trim() == "") {
    setError({
      errorMassage: "Please enter the card number!",
      isValid: false,
      feilds: "cardNumber",
    });
  } else if (cardInfo.cardNumber.length != 19) {
    setError({
      errorMassage: "Please enter your full card number!",
      isValid: false,
      feilds: "cardNumber",
    });
  }

  //   ------------------------ expiry date -------------------------------
  else if (!isFilledMonth(month)) {
    setError({
      errorMassage: "Please fill the month of expiry field!",
      isValid: false,
      feilds: "month",
    });
  } else if (!isFilledYear(year)) {
    setError({
      errorMassage: "Please fill the year of expiry field!",
      isValid: false,
      feilds: "year",
    });
  } else if (isExpired(month, year)) {
    setError({
      errorMassage: "Your card has expired. Please try again!",
      isValid: false,
      feilds: "",
    });
  }
  // ----------------------- checking ccv ----------------------
  else if (cardInfo.ccv.length < 3) {
    setError({
      errorMassage: "Please enter your full CCV",
      isValid: false,
      feilds: "",
    });
  }
  // ----------------------- checking if info is valid ------------
  else if (
    !isValid(cardInfo.name, cardInfo.cardNumber, year, month, cardInfo.ccv)
  ) {
    setError({
      errorMassage: "Your card has been declined, please try again!",
      isValid: false,
      feilds: "",
    });
  }
  // ----------------------------- everything is correct ------------------
  else {
    setError({
      errorMassage: "",
      isValid: true,
      feilds: "",
    });
  }
}
