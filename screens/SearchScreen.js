import { View, StyleSheet, Text } from "react-native";
import ListOfBooks from "../components/SearchScreenComponets/ListOfBooks";
import Title from "../components/Title";
function SearchScreen() {
  return (
    <View style={styles.container}>
      <Title>Search</Title>

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
