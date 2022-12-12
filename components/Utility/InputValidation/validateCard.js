// changed_
import ErrorComponent from "../../RegisterAndLogin/ErrorComponent";
import { checkPayment, pay } from "../http";

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
async function isValid(name, cardNumber, year, month, ccv) {
  let cardDB = {
    name: "",
    cardNumber: "",
    month: "",
    year: "",
    ccv: "",
  };
  await checkPayment(cardNumber)
    .then((respone) => {
      cardDB = {
        name: respone.data.name,
        cardNumber: cardNumber,
        month: respone.data.month,
        year: respone.data.year,
        ccv: respone.data.ccv,
      };
    })
    .catch((error) => {
      console.log(error);
    });

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
async function hasEnoughCredit(cardNumber, fineAmount) {
  // Defualt credit = 0, so if we don't find cardNumber in DB,
  // you won't have enough credit by defualt
  let credit = 0;
  await checkPayment(cardNumber)
    .then((respone) => {
      credit = respone.data.credit;
      console.log("credit in the db: " + credit);
    })
    .catch((error) => {
      console.log(error);
    });
  if (credit > fineAmount) {
    pay(cardNumber, fineAmount);
    return true;
  } else {
    return false;
  }
  console.log("credit in the db: " + credit);
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

export default async function validateCard(
  cardInfo,
  month,
  year,
  setError,
  fineAmount
) {
  // ---------------------------- check name -------------------------

  if (cardInfo.name.trim() == "") {
    let newRrrorComponent = (
      <ErrorComponent>Please enter card holder name!</ErrorComponent>
    );
    setError({
      errorMassage: "Please enter card holder name!",
      isValid: false,
      feilds: "name",
      errorComponent: newRrrorComponent,
    });
  } else if (cardInfo.name.length == 1) {
    let newRrrorComponent = (
      <ErrorComponent>Please enter a valid card holder name!</ErrorComponent>
    );
    setError({
      errorMassage: "Please enter a valid card holder name!",
      isValid: false,
      feilds: "name",
      errorComponent: newRrrorComponent,
    });
  }
  //   --------------------------------- check card number ------------
  else if (cardInfo.cardNumber.trim() == "") {
    let newRrrorComponent = (
      <ErrorComponent>Please enter the card number!</ErrorComponent>
    );
    setError({
      errorMassage: "Please enter the card number!",
      isValid: false,
      feilds: "cardNumber",
      errorComponent: newRrrorComponent,
    });
  } else if (cardInfo.cardNumber.length != 19) {
    let newRrrorComponent = (
      <ErrorComponent>Please enter your full card number!</ErrorComponent>
    );
    setError({
      errorMassage: "Please enter your full card number!",
      isValid: false,
      feilds: "cardNumber",
      errorComponent: newRrrorComponent,
    });
  }

  //   ------------------------ expiry date -------------------------------
  else if (!isFilledMonth(month)) {
    let newRrrorComponent = (
      <ErrorComponent>Please fill the month of expiry field!</ErrorComponent>
    );
    setError({
      errorMassage: "Please fill the month of expiry field!",
      isValid: false,
      feilds: "month",
      errorComponent: newRrrorComponent,
    });
  } else if (!isFilledYear(year)) {
    let newRrrorComponent = (
      <ErrorComponent>Please fill the year of expiry field!</ErrorComponent>
    );
    setError({
      errorMassage: "Please fill the year of expiry field!",
      isValid: false,
      feilds: "year",
      errorComponent: newRrrorComponent,
    });
  } else if (isExpired(month, year)) {
    let newRrrorComponent = (
      <ErrorComponent>Your card has expired. Please try again!</ErrorComponent>
    );
    setError({
      errorMassage: "Your card has expired. Please try again!",
      isValid: false,
      feilds: "",
      errorComponent: newRrrorComponent,
    });
  }
  // ----------------------- checking ccv ----------------------
  else if (cardInfo.ccv.length < 3) {
    let newRrrorComponent = (
      <ErrorComponent>Please enter your full CCV</ErrorComponent>
    );
    setError({
      errorMassage: "Please enter your full CCV",
      isValid: false,
      feilds: "ccv",
      errorComponent: newRrrorComponent,
    });
  }
  // ----------------------- checking if info is valid ------------
  else if (
    !(await isValid(
      cardInfo.name,
      cardInfo.cardNumber,
      year,
      month,
      cardInfo.ccv
    ))
  ) {
    let newRrrorComponent = (
      <ErrorComponent>
        Incorrect credit card information, please check the information
        provided!
      </ErrorComponent>
    );
    setError({
      errorMassage:
        "Incorrect credit card information, please check the information provided!",
      isValid: false,
      feilds: "",
      errorComponent: newRrrorComponent,
    });
    // -------------------------- check for credit ---------------------
  } else if (!(await hasEnoughCredit(cardInfo.cardNumber, fineAmount))) {
    let newRrrorComponent = (
      <ErrorComponent>
        Your card has been declined, please try again!
      </ErrorComponent>
    );
    setError({
      errorMassage: "Your card has been declined, please try again!",
      isValid: false,
      feilds: "",
      errorComponent: newRrrorComponent,
    });
  }
  // ----------------------------- everything is correct ------------------
  else {
    let newRrrorComponent = <ErrorComponent></ErrorComponent>;
    setError({
      errorMassage: "",
      isValid: true,
      feilds: "",
      errorComponent: null,
    });
  }
}
