import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";

import ListOfBooks from "../components/SearchScreenComponents/ListOfBooks";
import { fetchBooks, fetchCategories } from "../components/Utlity/http";
import { AppContext } from "../store/AppContext";

function SearchScreen() {
  // useFocusEffect(
  //   () => {
  //     console.log('HELLOOO');
  //   }
  // , []);
  // const appCtx = useContext(AppContext);

  // useFocusEffect(() => {
  //   async function getBooks() {
  //     const books = await fetchBooks();
  //     const categories = await fetchCategories();
  //     appCtx.changeBooks(books);
  //     appCtx.changeCategories(categories);
  //     setBooks(books);
  //   }
  //   getBooks();
  // }, []);


  const route = useRoute();
  if (!!route.params) {
    // Alert.alert("Your book request is recorded",[{}]);
    Alert.alert("Book request", "Your books request is added", [
 
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  }
  return (
    <View style={styles.container}>
      <ListOfBooks></ListOfBooks>
    </View>
  );
}
export default SearchScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
