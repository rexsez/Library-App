import { View, StyleSheet, TextInput, FlatList } from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import BookCard from "./BookCard";
import { BOOKS } from "../../data/dummy-data";
function ListOfBooks() {
  //   This state will be used to keep track of the search item
  const [currentSearch, setSearch] = useState("");
  const [currentBooks, setBooks] = useState(BOOKS);

  function renderItem(BOOKS) {
    return <BookCard bookData={BOOKS.item}></BookCard>;
  }
  function keyExtractor(book) {
    return book.isbn;
  }

  function SearchFilter(enteredSearch) {
    if (enteredSearch) {
      const temp = enteredSearch.toLowerCase();
      const filteredBooks = BOOKS.filter((book) =>
        book.title.toLowerCase().includes(temp)
      );
      setSearch(enteredSearch);
      setBooks(filteredBooks);
    } else {
      setSearch(enteredSearch);
      setBooks(BOOKS);
    }
  }
  return (
    <View style={styles.Container}>
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
          // This is used to be able to close the keyboard when the user
          // touch any position on the screen, error could be caused by this??
          // if you think it could cause an error please tell Hisham as I will
          // probably forget about it
          onEndEditing={this.clearFocus}
        />
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
});
