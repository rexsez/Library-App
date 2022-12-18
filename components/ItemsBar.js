import { View, StyleSheet } from "react-native";

//takes items to display them in a horizontal bar
function ItemsBar({ style, items }) {
  return <View style={[styles.rootContainer, style]}>{items}</View>;
}

export default ItemsBar;

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
