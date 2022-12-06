import { useRoute } from "@react-navigation/native";
import { View, StyleSheet, Alert } from "react-native";

import ListOfBooks from "../components/SearchScreenComponents/ListOfBooks";

function SearchScreen() {
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
