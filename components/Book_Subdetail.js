import { View, Text, StyleSheet } from "react-native";

function BookSubdetail({ icon, text }) {
  return (
    <View style={styles.detailContainer}>
      {icon}
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

export default BookSubdetail;

const styles = StyleSheet.create({
  detailContainer: {
    flexDirection: "row",
    width: 160,
    backgroundColor: "white",
    // borderRadius: 8,
    // borderWidth: 1,
    padding: 4,
    margin: 2,
  },
  text: {
    textAlign: "center",
    paddingLeft: 8,
    fontSize: 16,
  },
});
