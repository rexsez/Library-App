import { StyleSheet, ScrollView, Platform, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect, useEffect, useContext, useState } from "react";
import { HeaderBackButton } from "react-navigation-stack";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";
// Hisham start
import { Text } from "react-native-paper";
// Hisham close

import Colors from "../components/Utility/Colors";
import BookDetails from "../components/BookInfoComponents/Book_Details";
import BookSummary from "../components/BookInfoComponents/Book_Summary";
import ItemsBar from "../components/ItemsBar";
import MyButton from "../components/MyButton";
import { AppContext } from "../store/AppContext";
import { StudentContext } from "../store/StudentContext";
import BookRatingModal from "../components/BookInfoComponents/Book_Rating";
import { LinearGradient } from "expo-linear-gradient";
import Student from "../models/Student";
import { isFined } from "../components/Utility/UtilityFunctions";
import PaymentNotification from "../components/Utility/PaymentNotification";
import {
  postBorrowRequest,
  addToFavList,
  removeFromFavList,
} from "../components/Utility/http";

function BookInformationScreen({ navigation }) {
  // to get the list of books
  const appCtx = useContext(AppContext);
  // to get student info and use it to rate a book
  const studentCtx = useContext(StudentContext);
  // Hisham start
  const route = useRoute();
  const isScanned = route.params.isScanned;
  // Hisham close

  //using the isbn to find the selected book object
  useEffect(() => {
    navigation.setOptions({
      headerLeft:
        // Hisham start
        Platform.OS === "android" && isScanned
          ? // Hisham close
            () => (
              <HeaderBackButton
                onPress={() => {
                  // This will remove The previous screen (Barcode scanner screen)
                  navigation.dispatch(StackActions.popToTop());
                }}
              />
            )
          : undefined,
    }); // if platform is IOS don't do anything
  }, []);

  /*
  Getting isbn of the book that the user
  has clicked on
  This information is sent from bookCard where each
  BookCard contains information about the book
  getting the book isbn using the passed route params
  */
  const Route = useRoute();
  const isbn = Route.params.bookId;
  const [visible, changeVisibility] = useState(false);

  const selectedBook = appCtx.books.find((book) => book.isbn === isbn);
  // Hisham start
  let defaultRating = -1;
  let remove = false;
  // Hisham close
  if (selectedBook.ratedBy.some((e) => e.key == studentCtx.ID)) {
    let obj = selectedBook.ratedBy.find((o) => o.key === studentCtx.ID);
    defaultRating = obj.rating;
  }
  // Hisahm start
  if (defaultRating == -1) {
    defaultRating = 0;
  } else {
    remove = true;
  }
  // Hisham close

  async function borrowBook() {
    if (isFined(studentCtx)) {
      setIsPress(true);
    } else {
      const isbn = selectedBook.isbn;
      const title = selectedBook.title;
      const userEmail = studentCtx.student.Email;
      const userKey = studentCtx.ID;
      await postBorrowRequest(isbn, title, userEmail, userKey);
      // Hisham start
      appCtx.changeScreenHandler("Search");
      navigation.navigate("TabSearch");
      // Hisham close
    }
  }
  const [isPress, setIsPress] = useState(false);

  // setting the title of the page to the name of book
  const Navigation = useNavigation();
  useLayoutEffect(() => {
    Navigation.setOptions({ title: selectedBook.title });
  }, [Navigation, selectedBook.title]);

  const bookImage = selectedBook.imageUrl; //dummy image to test

  function toggleModal() {
    if (!!studentCtx.student.Email) {
      changeVisibility(!visible);
    }
  }

  //helper variable to style the icons
  const iconStyles = {
    size: 32,
    color: Colors.primary500,
  };

  // Supporting function needed to change list of fav from student context
  // This method receives by defualt the values (in this case: ISBN) in the array
  const student = studentCtx.student;
  const isInFavList = (currentItemIsbn) => {
    // checks if the current element of the array has the same isbn

    // if the item has the isbn, then it return false (This item is needs to be filtered out)
    return currentItemIsbn != isbn;
  };
  // In the begging, we check if the book is faviroute already or not
  // This will be used as the intial value of isvaforite state.
  let isFavoriteIntial = !!student?.favBooks && student.favBooks.includes(isbn);
  //This state variable keeps track of wether a book has been added to faviroute or not
  const [bookIsFavorite, setBookIsFavorite] = useState(isFavoriteIntial);
  // This will be used everywhere for fav list changes
  let currentStudentContext = studentCtx.student;
  //Function to execute if the users clicks on favorite
  const onPressFav = () => {
    // First we change book from favorite to not favorite or vise-versa
    if (bookIsFavorite) {
      // If the book was in fav list:
      // 1- We change the state of the current page, from fav to not fav, so button shows empty star
      setBookIsFavorite(false);
      // 2- then we delete it from fav list in the app wide context
      removeFromFavList(studentCtx.ID, isbn);

      const newFavBooks = studentCtx.student.favBooks.filter(isInFavList);
      currentStudentContext = {
        ...studentCtx.student,
        favBooks: newFavBooks,
      };
    } else {
      // If the book was not in fav list:
      // 1- We change the state of the current page, from not fav to fav, so button shows filled star
      setBookIsFavorite(true);
      // // 2- then we add it to fav list in the app wide context
      addToFavList(studentCtx.ID, isbn);
      // If there is no fav in the context
      if (!!!currentStudentContext?.favBooks) {
        currentStudentContext = new Student(
          currentStudentContext.FName,
          currentStudentContext.LName,
          currentStudentContext.Email,
          currentStudentContext.psw,
          currentStudentContext.borrowedBooks,
          [isbn]
        );
      } else {
        currentStudentContext.favBooks.push(isbn);
      }
    }
    studentCtx.registerStudent(currentStudentContext);
  };

  //List of buttons to be added to the IconButtonBar
  const iconBarButtons = [
    //rating
    <View style={styles.barItemContainer}>
      <Text style={styles.itemsBarLabels}>Rating</Text>
      <MyButton
        style={styles.iconButton}
        textStyle={styles.rating}
        onPress={toggleModal}
      >
        {selectedBook.rating != -1 ? selectedBook.rating + " / 5" : "Unrated"}
      </MyButton>
    </View>,
  ];
  if (!!studentCtx.student.Email) {
    //add the borrow option if the book is scanned
    iconBarButtons.push(
      <View style={styles.barItemContainer}>
        <Text style={styles.itemsBarLabels}>Borrow</Text>
        <MyButton style={styles.iconButton} onPress={borrowBook}>
          {<Ionicons name="book" {...iconStyles} />}
        </MyButton>
      </View>
    );

    //favorite button
    iconBarButtons.unshift(
      <View style={styles.barItemContainer}>
        <Text style={styles.itemsBarLabels}>Favorite</Text>
        <MyButton style={styles.iconButton} onPress={onPressFav}>
          {
            <FontAwesome
              name={bookIsFavorite ? "star" : "star-o"}
              {...iconStyles}
            />
          }
        </MyButton>
      </View>
    );
  }
  let component = <View></View>;
  if (isPress) {
    component = (
      <PaymentNotification
        onPressCancel={setIsPress.bind(this, false)}
      ></PaymentNotification>
    );
  }
  return (
    <>
      {component}
      <LinearGradient
        start={{ x: 0.1, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        locations={[0, 0.5, 0.6]}
        // Background Linear Gradient
        colors={["#2596be", "whitesmoke", "#2596be"]}
        style={styles.linearGradient}
      >
        {/* Scrollview for the entire screen */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Book information</Text>
        </View>
        <View style={styles.rootContainer}>
          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <BookRatingModal
              visible={visible}
              rate={defaultRating}
              changeVisibility={changeVisibility}
              studentID={studentCtx.ID}
              bookID={selectedBook.id}
              // Hisham start
              remove={remove}
              // Hisham close
            />

            <BookDetails
              isbn={isbn}
              author={selectedBook.author}
              date={selectedBook.date}
              genre={selectedBook.genre}
              bookImage={bookImage}
            />

            {/* using the items bar to add icon buttons */}
            <ItemsBar
              style={styles.itemsBar}
              items={
                //buttons to be added to the IconsBar
                iconBarButtons
              }
            />

            <BookSummary>{selectedBook.summary}</BookSummary>
          </ScrollView>
        </View>
      </LinearGradient>
    </>
  );
}

export default BookInformationScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 0.8,
    margin: 5,
    backgroundColor: "whitesmoke",
    marginTop: 100,
    borderRadius: 15,
    marginHorizontal: 15,
  },
  scrollContainer: {
    margin: 16,
  },
  itemsBar: {
    marginTop: 8,
    paddingVertical: 4,
    // borderWidth: 1,
    // borderRadius: 4,
    alignItems: "center",
  },
  iconButton: {
    // backgroundColor: "transparent",
  },
  rating: {
    fontSize: 18,
    color: Colors.primary500,
  },
  ImageBackground: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    borderRadius: 5,
  },

  titleContainer: {
    padding: 15,
    backgroundColor: Colors.primary500,
    height: 70,
    justifyContent: "center",
  },
  titleText: {
    color: "white",
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 1.5,
    fontSize: 24,
  },
  borrowText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
  },
  barItemContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  itemsBarLabels: {
    flex: 1,
    fontSize: 12,
    fontWeight: "bold",
  },
});
