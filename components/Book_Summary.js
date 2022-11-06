import { View, Text, StyleSheet } from "react-native";

function BookSummary({ children }) {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

export default BookSummary;

const styles = StyleSheet.create({
  rootContainer: {
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 12,
    padding: 6,
  },
  text: {
    fontSize: 16,
  },
});
