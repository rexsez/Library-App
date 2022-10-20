import { FlatList, View } from "react-native";
import { StyleSheet } from "react-native";
import BookCard from "./BookCard";
import { BOOKS } from "../../data/dummy-data";
function ListOfBooks() {
  function renderItem(BOOKS) {
    return <BookCard bookData={BOOKS.item}></BookCard>;
  }
  function keyExtractor(book) {
    return book.isbn;
  }
  return (
    <View style={styles.Container}>
      <FlatList
        data={BOOKS}
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
});
