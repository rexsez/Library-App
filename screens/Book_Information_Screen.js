import { StyleSheet, ScrollView } from "react-native";

import { BOOKS } from "../data/dummy-data";
import BookDetails from "../components/Book_Details";
import BookSummary from "../components/Book_Summary";

function BookInformationScreen({ route, navigation }) {
  //getting the book isbn using the passed route params
  //const isbn = route.params.isbn;
  const isbn = 3456456; //DUMMY ISBN FOR TESTING (using the dummy data)

  //using the isbn to find the selected book object
  const selectedBook = BOOKS.find((book) => book.isbn === isbn);

  //const formatedDate = selectedBook.date.formatDate();
  const bookImage = require("../assets/icon.png"); //dummy image to test

  /*
    This commented section might be used later to implement the favorite books feature
    Note: Some variable / function namings might be changed
    This assumes we use the Context API for App-wide State management

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

  return (
    //Scrollview for the entire screen
    <ScrollView style={styles.rootContainer}>
      <BookDetails
        isbn={isbn}
        author={selectedBook.author}
        date={selectedBook.date}
        genre={selectedBook.genre}
        bookImage={bookImage}
      />
      <BookSummary>{selectedBook.summary}</BookSummary>
    </ScrollView>
  );
}

export default BookInformationScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 16,
    margin: 16,
  },
});
