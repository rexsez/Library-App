import {
  StyleSheet,
  ScrollView,
  Platform,
  ImageBackground,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect, useEffect, useContext, useState } from "react";
import { HeaderBackButton } from "react-navigation-stack";
import { FontAwesome } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";

import BookDetails from "../components/BookInfoComponents/Book_Details";
import BookSummary from "../components/BookInfoComponents/Book_Summary";
import ItemsBar from "../components/ItemsBar";
import MyButton from "../components/MyButton";
import { AppContext } from "../store/AppContext";
import { StudentContext } from "../store/StudentContext";
import BookRatingModal from "../components/BookInfoComponents/Book_Rating";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../components/Utility/Colors";

function BookInformationScreen({ navigation }) {
  // to get the list of books
  const appCtx = useContext(AppContext);
  // to get student info and use it to rate a book
  const studentCtx = useContext(StudentContext);
  useEffect(() => {
    navigation.setOptions({
      headerLeft:
        Platform.OS === "android"
          ? () => (
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
  const isScanned = Route.params.isScanned;
  const [visible, changeVisibility] = useState(false);

  // console.log(JSON.stringify(appCtx.books));

  //using the isbn to find the selected book object
  const selectedBook = appCtx.books.find((book) => book.isbn === isbn);
  let defaultRating = 0;
  if (selectedBook.ratedBy.some((e) => e.key == studentCtx.ID)) {
    let obj = selectedBook.ratedBy.find((o) => o.key === studentCtx.ID);
    defaultRating = obj.rating;
  }
  // setting the tilte of the page to the name of book
  const Navigation = useNavigation();
  useLayoutEffect(() => {
    Navigation.setOptions({ title: selectedBook.title });
  }, [Navigation, selectedBook.title]);

  const bookImage = selectedBook.imageUrl; //dummy image to test
  // console.log(bookImage);
  /*
  // This commented section might be used later to implement the favorite books feature
  // Note: Some variable / function namings might be changed
  // This assumes we use the Context API for App-wide State management

  const favoriteBookCtx = useContext(FavoritesContext);
  const bookIsFavorite = favoriteBookCtx.isbnList.includes(isbn);

  //function for adding / removing the book to / from favorites
  function changeFavoriteStatus() {
    if (bookIsFavorite) {
      favoriteBookCtx.removeFavorite(isbn);
    } else {
      favoriteBookCtx.addFavorite(isbn);
    }
  }
 */

  function toggleModal() {
    if (!!studentCtx.student.Email) {
      changeVisibility(!visible);
    }
  }

  //helper variable to style the icons
  const iconStyles = {
    size: 32,
    color: "black",
  };

  const bookIsFavorite = true; // ### test  ###

  //List of buttons to be added to the IconButtonBar
  const iconBarButtons = [
    //favorite button
    <MyButton style={styles.iconButton} Flate={true}>
      {
        <FontAwesome
          name={bookIsFavorite ? "star" : "star-o"}
          {...iconStyles}
        />
      }
    </MyButton>,

    //rating
    <MyButton
      style={styles.iconButton}
      Flate={true}
      textStyle={styles.rating}
      onPress={toggleModal}
    >
      {selectedBook.rating != -1 ? selectedBook.rating + " / 5" : "N/A"}
    </MyButton>,
  ];

  if (isScanned) {
    //add the borrow option if the book is scanned
    iconBarButtons.push(
      <MyButton style={styles.iconButton} Flate={true}>
        {<FontAwesome name="hand-grab-o" {...iconStyles} />}
      </MyButton>
    );
  }

  return (
    <LinearGradient
      start={{ x: 0.1, y: 0.25 }}
      end={{ x: 0.5, y: 1.0 }}
      locations={[0, 0.5, 0.6]}
      // Background Linear Gradient
      colors={["#2596be", "whitesmoke", "#2596be"]}
      style={styles.linearGradient}
    >
      {/* Scrollview for the entire screen */}
      <View style={styles.rootContainer}>
        <ScrollView
          style={styles.rootContainer}
          showsVerticalScrollIndicator={false}
        >
          <BookRatingModal
            visible={visible}
            rate={defaultRating}
            changeVisibility={changeVisibility}
            studentID={studentCtx.ID}
            bookID={selectedBook.id}
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
  );
}

export default BookInformationScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    margin: 16,
    backgroundColor: "whitesmoke",
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
    color: "black",
  },
  ImageBackground: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
});
