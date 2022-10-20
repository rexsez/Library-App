import { StyleSheet, View, Text } from "react-native";
export default function ({ children }) {
  return (
    <View style={styles.Container}>
      <Text style={styles.Text}>{children}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  Container: {
    padding: 10,
    paddingTop: 20,
    borderBottomColor: "gray",
    borderBottomWidth: 2,
    marginBottom: 6,
    marginHorizontal: "25%",
  },
  Text: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
  },
});
