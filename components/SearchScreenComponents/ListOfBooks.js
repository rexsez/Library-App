import { View, StyleSheet, TextInput, FlatList, Platform } from "react-native";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import BookCard from "./BookCard";
import MyButton from "../MyButton";
import FilterModal from "./FilterModal";
import { fetchBooks, fetchCategories } from "../Utlity/http";
import { AppContext } from "../../store/AppContext";

function ListOfBooks() {
  const appCtx = useContext(AppContext);
  const navigation = useNavigation();
  //   This state will be used to keep track of the search item
  const [currentSearch, setSearch] = useState("");
  const [currentBooks, setBooks] = useState([]);
  const iconSize = 24;
  // This will be used to filter search results, in specific to show the modal which contains the options
  // available to be used as a filter
  const [isModalVisible, setModalVisible] = useState(false);
  const [chosenFilter, setChosenFilter] = useState(1);
  const [chosenOrder, setChosenOrder] = useState(1);

  useEffect(() => {
    async function getBooks() {
      const books = await fetchBooks();
      const categories = await fetchCategories();
      appCtx.changeBooks(books);
      appCtx.changeCategories(categories);
      setBooks(books);
    }
    getBooks();
  }, []);

  function toggleModal() {
    setModalVisible(!isModalVisible);
  }

  function renderItem(book) {
    return <BookCard bookData={book.item}></BookCard>;
  }
  function keyExtractor(book) {
    return book.isbn;
  }

  // This is the function used to search for a book
  // with a title or an author by default
  function SearchFilter(enteredSearch) {
    // if something is entered (not empty), it will enter the condition
    if (enteredSearch) {
      // converting it to lower case to avoid case sensitive issues
      const temp = enteredSearch.toLowerCase();
      // Storing the list of books that matches the enteredSearch
      // in the list, which will be used as a source of data to display books
      const filteredBooks = appCtx.books.filter(
        (book) =>
          book.title.toLowerCase().includes(temp) || // filtering based on the title
          book.author.toLowerCase().includes(temp) // filtering based on the author
      );
      // To update the value that is displayed in the search bar
      setSearch(enteredSearch);
      // Setting the new list of books to the filtered one
      setBooks(filteredBooks);
    } else {
      // To update the value that is displayed in the search bar
      setSearch(enteredSearch);
      // If nothing is entered make the list of books as the default one which is BOOKS
      setBooks(appCtx.books);
    }
  }

  // This section is to display button according to what's entered in the search
  // if nothing is entered both barcode button and filter button will be displayed
  // once one letter is entered in the search bar, barcode button will disappear leaving
  // filter button alone
  let loadedButton = null;
  if (currentSearch) {
    loadedButton = (
      <>
        <MyButton style={styles.barcodeScanner} Flate={"Flate"}>
          <Ionicons
            name="options-sharp"
            size={iconSize}
            color="white"
            style={styles.icon}
            onPress={toggleModal}
          />
        </MyButton>
      </>
    );
  } else {
    loadedButton = (
      <>
        <MyButton style={styles.barcodeScanner} Flate={"Flate"}>
          <Ionicons
            name="barcode-outline"
            size={iconSize}
            color="white"
            style={styles.icon}
            onPress={() => navigation.navigate("StackBarcode")}
          />
        </MyButton>
        <MyButton style={styles.barcodeScanner} Flate={"Flate"}>
          <Ionicons
            name="options-sharp"
            size={iconSize}
            color="white"
            style={styles.icon}
            onPress={toggleModal}
          />
        </MyButton>
      </>
    );
  }

  return (
    <View style={styles.Container}>
      {/* Here is the Search Bar Container */}
      <View style={styles.seacrhContainer}>
        {/* Search Bar Icon */}
        <Ionicons
          name="search"
          size={iconSize}
          color="white"
          style={styles.icon}
        />
        <TextInput
          placeholder="Search"
          placeholderTextColor="white"
          style={styles.search}
          //   This is to keep the displayed text updated
          value={currentSearch}
          //   Basically updating the searched item
          onChangeText={(enteredSearch) => {
            SearchFilter(enteredSearch);
          }}
        />
        {loadedButton}
      </View>
      <FilterModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        setBooks={setBooks}
        currentBooks={currentBooks}
        toggleModal={toggleModal}
        SearchFilter={SearchFilter}
        currentSearch={currentSearch}
        chosenFilter={chosenFilter}
        setChosenFilter={setChosenFilter}
        chosenOrder={chosenOrder}
        setChosenOrder={setChosenOrder}
      />
      <FlatList
        data={currentBooks}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={styles.Container}
      ></FlatList>
    </View>
  );
}

export default ListOfBooks;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "white",
  },
  seacrhContainer: {
    backgroundColor: "#1b7ce4",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },

  icon: {
    alignSelf: "center",
    marginHorizontal: 8,
  },

  search: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 0,
    margin: 0,
    color: "white",
  },
  barcodeScanner: {
    alignSelf: "center",
    marginHorizontal: 8,
  },
});
