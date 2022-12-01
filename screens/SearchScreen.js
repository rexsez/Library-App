import { View, StyleSheet } from "react-native";

import ListOfBooks from "../components/SearchScreenComponents/ListOfBooks";

function SearchScreen() {
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
