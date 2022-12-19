import { View, StyleSheet, TextInput, FlatList, Text } from "react-native";
import React, { useContext, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import BookCard from "./BookCard";
import MyButton from "../MyButton";
import FilterModal from "./FilterModal";
import { fetchBooks, fetchCategories } from "../Utility/http";
import { AppContext } from "../../store/AppContext";
import Colors from "../Utility/Colors";

function ListOfBooks() {
  const appCtx = useContext(AppContext);
  const navigation = useNavigation();
  //   This state will be used to keep track of the search item
  const [currentSearch, setSearch] = useState("");
  const [currentBooks, setBooks] = useState(appCtx.books);
  const iconSize = 24;
  // This will be used to filter search results, in specific to show the modal which contains the options
  // available to be used as a filter
  const [isModalVisible, setModalVisible] = useState(false);
  const [chosenFilter, setChosenFilter] = useState(1);
  const [chosenOrder, setChosenOrder] = useState(1);
  // Hisham start
  const [chosenMinimumRating, setMinimumRating] = useState(0);
  const [chosenCategory, setNewCategory] = useState();
  // Hisham close
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused.
      async function getBooks() {
        const books = await fetchBooks();
        const categories = await fetchCategories();
        appCtx.changeBooks(books);
        appCtx.changeCategories(categories);
        setBooks(books);
      }
      getBooks();
      return () => {};
    }, [])
  );

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
    // Hisahm start
    let filteredBooks;
    // Hisham close
    // if something is entered (not empty), it will enter the condition
    if (enteredSearch) {
      // converting it to lower case to avoid case sensitive issues
      const temp = enteredSearch.toLowerCase();
      // Storing the list of books that matches the enteredSearch
      // in the list, which will be used as a source of data to display books
      // Hisham start (I removed one line)
      if (!chosenCategory) {
        filteredBooks = appCtx.books.filter(
          (book) =>
            (book.title.toLowerCase().includes(temp) || // filtering based on the title
              book.author.toLowerCase().includes(temp)) && // filtering based on the author
            (book.rating >= chosenMinimumRating || book.rating == -1)
        );
      } else {
        filteredBooks = appCtx.books.filter(
          (book) =>
            (book.title.toLowerCase().includes(temp) || // filtering based on the title
              book.author.toLowerCase().includes(temp)) && // filtering based on the author
            (book.rating >= chosenMinimumRating || book.rating == -1) &&
            book.genre.toLowerCase() == chosenCategory
        );
      }
      // Hisham close
      // To update the value that is displayed in the search bar
      setSearch(enteredSearch);
      // Setting the new list of books to the filtered one
      setBooks(filteredBooks);
    } else {
      // To update the value that is displayed in the search bar
      setSearch(enteredSearch);
      // Hisham start
      if (chosenCategory) {
        filteredBooks = appCtx.books.filter(
          (book) =>
            (book.rating >= chosenMinimumRating || book.rating == -1) &&
            book.genre.toLowerCase() == chosenCategory
        );
      } else {
        filteredBooks = appCtx.books.filter(
          (book) => book.rating >= chosenMinimumRating || book.rating == -1
        );
      }
      // If nothing is entered make the list of books as the default one which is BOOKS
      setBooks(filteredBooks);
      // Hisham close
    }
  }

  // This section is to display button according to what's entered in the search
  // if nothing is entered both barcode button and filter button will be displayed
  // once one letter is entered in the search bar, barcode button will disappear leaving
  // filter button alone
  let loadedButton = null;
  if (currentSearch) {
    loadedButton = (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <MyButton style={[styles.searchContainer, { marginHorizontal: 4 }]}>
          <Ionicons
            name="options-sharp"
            size={iconSize}
            color="white"
            style={styles.icon}
            onPress={toggleModal}
          />
        </MyButton>
      </View>
    );
  } else {
    loadedButton = (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <MyButton style={[styles.searchContainer, { marginHorizontal: 4 }]}>
          <Ionicons
            name="barcode-outline"
            size={iconSize}
            color="white"
            style={styles.icon}
            onPress={() => {
              appCtx.changeScreenHandler("Barcode");
              navigation.navigate("StackBarcode");
            }}
          />
        </MyButton>
        <MyButton style={[styles.searchContainer, { marginHorizontal: 4 }]}>
          <Ionicons
            name="options-sharp"
            size={iconSize}
            color="white"
            style={[styles.icon]}
            onPress={toggleModal}
          />
        </MyButton>
      </View>
    );
  }

  return (
    <View style={styles.Container}>
      {/* Here is the Search Bar Container */}
      <View style={styles.searchContainer}>
        {/* Search Bar Icon */}
        <Ionicons
          name="search"
          size={iconSize}
          color="white"
          style={styles.icon}
        />
        <TextInput
          placeholder=" Title or Author"
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
      <FilterModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        setBooks={setBooks}
        currentBooks={currentBooks}
        toggleModal={toggleModal}
        currentSearch={currentSearch}
        chosenFilter={chosenFilter}
        setChosenFilter={setChosenFilter}
        chosenOrder={chosenOrder}
        setChosenOrder={setChosenOrder}
        // Hisham start
        setMinimumRating={setMinimumRating}
        setNewCategory={setNewCategory}
        // Hisham close
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
  searchContainer: {
    paddingTop: 4,
    backgroundColor: Colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  icon: {
    alignSelf: "center",
    marginHorizontal: 8,
  },

  search: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 0,
    margin: 0,
    color: "white",
  },
  barcodeScanner: {
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
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
