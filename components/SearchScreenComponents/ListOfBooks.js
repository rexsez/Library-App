import { View, StyleSheet, TextInput, FlatList } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import BookCard from "./BookCard";
import { BOOKS } from "../../data/dummy-data";
import MyButton from "../MyButton";

function ListOfBooks() {
  const navigation = useNavigation();
  //   This state will be used to keep track of the search item
  const [currentSearch, setSearch] = useState("");
  const [currentBooks, setBooks] = useState(BOOKS);

  function renderItem(BOOKS) {
    return <BookCard bookData={BOOKS.item}></BookCard>;
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
      const filteredBooks = BOOKS.filter(
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
      setBooks(BOOKS);
    }
  }
  return (
    <View style={styles.Container} behavior="padding">
      {/* Here is the Search Bar Container */}
      <View style={styles.seacrhContainer}>
        {/* Search Bar Icon */}
        <Ionicons name="search" size={18} color="white" style={styles.icon} />
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
        <MyButton style={styles.barcodeScanner} Flate={"Flate"}>
          <Ionicons
            name="barcode-outline"
            size={18}
            color="white"
            style={styles.icon}
            onPress={() => navigation.navigate("Barcode")}
          />
        </MyButton>
      </View>
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
  },
  seacrhContainer: {
    backgroundColor: "#1b7ce4",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },

  icon: {
    marginTop: 12,
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
    marginTop: 12,
    marginHorizontal: 8,
  },
});
