import {
  View,
  StyleSheet,
  FlatList,
  Pressable,
  ImageBackground,
  StatusBar,
} from "react-native";
import { useContext, useState } from "react";
import { StudentContext } from "../store/StudentContext";
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";
import BookCard from "../components/SearchScreenComponents/BookCard";
import BorrowedBookCard from "../components/ProfileScreenComponents/BorrowedBookCard";
import CardBorrow_Fav from "../components/Utility/Cards/CardBorrow_Fav";
import { dueDateSort,fixedBorrowedBooksList } from "../components/Utility/UtilityFunctions";
import { getStudentID, putVerification } from "../components/Utility/http";
import { AppContext } from "../store/AppContext";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Alert } from "react-native";
import { round } from "react-native-reanimated";
import PaymentNotification from "../components/Utility/PaymentNotification";

function ProfileScreen({ defaultScreen }) {
  const appCtx = useContext(AppContext);
  const route = useRoute();
  function renderItem(book) {
    if (currentList == "fav") {
      const favoriteBook = appCtx.books.find(
        (bookss) => bookss.isbn === book.item
      );

      return <BookCard bookData={favoriteBook}></BookCard>;
    } else {
      const borrowedBook = appCtx.books.find(
        (bookss) => bookss.isbn === book.item
      );
      // changed_

      return (
        <BorrowedBookCard
          bookData={borrowedBook}
          dueDate={studentContext.student.borrowedBooks[book.item]}
        ></BorrowedBookCard>
      );
    }
  }
  function keyExtractor(book) {
    return book.item;
  }
  // changed_abdullah
  const [description, setDescription] = useState("Your favorite List");
  // end changed
  function whichList() {
    if (currentList === "fav") {
      
      return studentContext.student.favBooks;
    } else {
      
      if (!!!studentContext.student.borrowedBooks) {
        return [];
      }
      // changed_abdullah
      // setDescription("Your list of borrowed books");
      if (!!Object.keys(studentContext.student.borrowedBooks)) {
        var currentKey = Object.keys(studentContext.student.borrowedBooks);
        var currentDictionary = [];
        for (var i = 0; i < currentKey.length; i++) {
          currentDictionary.push([
            currentKey[i],
            studentContext.student.borrowedBooks[currentKey[i]],
          ]);
        }
        currentDictionary.sort(dueDateSort);
        for (var i = 0; i < currentDictionary.length; i++) {
          currentKey[i] = currentDictionary[i][0];
        }
        return currentKey;
      }
      return [];
      // end changed
    }
  }

  const [currentList, setList] = useState("fav");
  const navigation = useNavigation();
  const studentContext = useContext(StudentContext);
  // changed_
  // This variable will make sure to show the Aler massage only once
  // const [seen, setSeen] = useState(false);

  // if (
  //   studentContext?.student.Email &&
  //   !seen &&
  //   studentContext.student?.borrowedBooks
  // ) {
  //   const listOfBorrowedBooks = studentContext?.student.borrowedBooks;
  //   const keys = Object.keys(listOfBorrowedBooks);
  //   let numOverDue = 0;
  //   let totalFine = 0;
  //   let numDays = 0;
  //   keys.forEach((key, index) => {
  //     if (isOverDue(listOfBorrowedBooks[key])) {
  //       numOverDue = numOverDue + 1;
  //       let temp = numDaysFromDueDate(listOfBorrowedBooks[key]);
  //       totalFine = Math.round((totalFine + temp * 5) * 1.15);
  //       numDays = numDays + Math.abs(temp);
  //     }
  //   });
  //   setSeen(true);
  //   paymentNotification(numOverDue, Math.abs(totalFine), numDays);
  // }
  // // Supporting function for checking if books are overdue
  // function isOverDue(dueDate) {
  //   const dueDateObject = new Date(dueDate);
  //   const now = new Date();
  //   if (dueDateObject - now <= 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  // // Supporting function for finding number of days from due date
  // function numDaysFromDueDate(dueDate) {
  //   if (dueDate == "pending") return 0;
  //   var days = new Date(dueDate).getTime() - new Date().getTime();
  //   days = Math.floor(days / (1000 * 60 * 60 * 24));
  //   days = days + 1;
  //   return days;
  // }
  // // function that shows customer alert messages when books are over due
  // function paymentNotification(numOverDue, totalFine, numDays) {
  //   let dayText = "";
  //   if (numOverDue > 1) {
  //     dayText = "s";
  //   }
  //   const customerMassage =
  //     `\nYou have missed the due date for returning ${numOverDue} book${dayText}.\n\n` +
  //     `You are supposed to return the book${dayText} ${numDays} ago!\n\n` +
  //     `Now you need to pay SR 5.00/day, your total is SR ${totalFine}.00 including VAT`;

  //   const alertMassage = Alert.alert(
  //     "Borrowing Policy Violated",
  //     `${customerMassage}`,
  //     // add_nav
  //     [
  //       { text: "Got it!", onPress: () => console.log("Got it!") },
  //       { text: "Pay Online", onPress: () => console.log("Pay Online") },
  //     ]
  //   );
  //   return alertMassage;
  // }

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
      alert("You have to sign in first");
      appCtx.changeScreenHandler("Login");
      navigation.navigate("DrawerLogin");
    }
  });
  const onPressIcon = (type) => {
    if (type == "fav") {
      if (!!studentContext.student?.favBooks) {
        setDescription("Your Favorite List of Books");
      } else {
        setDescription("Your Favorite List is Empty!");
      }
      setList("fav");
    } else {
      if (!!studentContext.student?.borrowedBooks) {
        setDescription("Books You Have Borrowed");
      } else {
        setDescription("You Haven't Borrowed Any Books Yet!");
      }

      setList("bor");
    }
  };

  if (!!studentContext.student.Email) {
    return (
      <>
        <PaymentNotification></PaymentNotification>
        <View style={styles.container}>
          <ImageBackground
            style={styles.ImageBackground}
            source={require("../assets/logoNew2.png")}
            resizeMode="cover"
          >
            <StatusBar
              animated={false}
              backgroundColor="whitesmoke"
            ></StatusBar>
            <View style={styles.outerListContainer}>
              <View style={styles.greetingsContainer}>
                <Text style={styles.greetings}>Profile</Text>
              </View>
              <Text style={styles.name}>
                {studentContext.student.FName +
                  " " +
                  studentContext.student.LName}
              </Text>

              <View style={styles.iconContainer}>
                <Pressable style={[currentList == "fav" && styles.pressed]}>
                  <CardBorrow_Fav
                    onPressed={onPressIcon.bind(this, "fav")}
                    path="star"
                    // color="rgb(130, 196, 217)"
                  ></CardBorrow_Fav>
                </Pressable>
                {/* changed_abdullah */}
                <Pressable style={[currentList == "bor" && styles.pressed]}>
                  {/* end changed */}
                  <CardBorrow_Fav
                    onPressed={onPressIcon.bind(this, "bor")}
                    path="book"
                    // color="rgb(130, 196, 217)"
                  ></CardBorrow_Fav>
                </Pressable>
              </View>
              <View>
                <Text style={styles.description}>{description}</Text>
              </View>
              <View style={styles.flatListContainer}>
                <View style={styles.badgeContainer}>
                  <View style={{ flexDirection: "row", flex: 1 }}>
                    <MaterialCommunityIcons
                      style={[
                        styles.badgeStyle,
                        {
                          marginLeft: 25,
                          paddingTop: 0,
                          backgroundColor: "yellow",
                          borderColor: "grey",
                        },
                      ]}
                      name={"fire"}
                      size={15}
                      color={"red"}
                    />
                    <Text
                      style={{
                        fontSize: 10,
                        color: "grey",
                        textAlign: "center",
                        paddingTop: 3,
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      Highly Rated
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", flex: 1 }}>
                    <MaterialCommunityIcons
                      style={[
                        styles.badgeStyle,
                        {
                          paddingTop: 0,
                          backgroundColor: "lightblue",
                          borderColor: "grey",
                        },
                      ]}
                      name={"podium-gold"}
                      size={15}
                      color={"purple"}
                    />
                    <Text
                      style={{
                        fontSize: 10,
                        color: "grey",
                        textAlign: "center",
                        paddingTop: 3,
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      Highly Borrowed
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", flex: 1 }}>
                    <MaterialCommunityIcons
                      style={[
                        styles.badgeStyle,
                        {
                          paddingTop: 3,
                          backgroundColor: "#1c1c1c",
                          borderColor: "lightgrey",
                        },
                      ]}
                      name={"new-box"}
                      size={15}
                      color={"lightgreen"}
                    />
                    <Text
                      style={{
                        fontSize: 10,
                        color: "grey",
                        textAlign: "center",
                        paddingTop: 3,
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      Newly Added
                    </Text>
                  </View>
                </View>
                <FlatList
                  data={whichList()}
                  renderItem={renderItem}
                  keyExtractor={keyExtractor}
                  style={styles.ImageBackground}
                ></FlatList>
              </View>
            </View>
          </ImageBackground>
        </View>
      </>
    );
  }
  // If you are not logged in, it will redirect u
  // To register screen, u can also move to login from there
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  outerListContainer: {
    backgroundColor: "white",
    flex: 1,
  },
  iconContainer: {
    margin: 20,
    marginHorizontal: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  flatListContainer: {
    flex: 1,
    margin: '1%',
    borderRadius: 15,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
  },
  ImageBackground: {
    flex: 1,
  },
  pressed: {
    opacity: 0.5,
  },
  greetingsContainer: {
    alignItems: "center",
    backgroundColor: "#0593bb",
    width: "100%",
    height: 45,
  },
  greetings: {
    marginTop: 5,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  name: {
    color: "#144c84",
    fontSize: 24,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: 30,
    fontWeight: "bold",
  },
  description: {
    fontSize: 22,
    textAlign: "center",
    color: "#144c84",
    fontWeight: "300",
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
  },
  badgeStyle: {
    marginHorizontal: 3,
    borderRadius: 30,
    borderWidth: 1.5,
    paddingLeft: 3,
  },
});
export default ProfileScreen;
