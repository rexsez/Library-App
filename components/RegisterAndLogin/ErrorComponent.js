import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

function ErrorComponent({ children, errorColor }) {
  let color = "#a64452";
  if (!!errorColor) {
    color = errorColor;
  }
  return (
    <View style={styles.Container}>
      <Ionicons
        name="alert-circle"
        color={color}
        size={24}
        style={styles.icon}
      ></Ionicons>
      <Text style={[styles.Text, { color: color }]}>{children}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  Container: {
    marginVertical: 10,
    marginHorizontal: "12%",
    flexDirection: "row",
    alignItems: "center",
  },
  Text: { fontSize: 16 },
  icon: { fontSize: 30, marginRight: 6 },
});
export default ErrorComponent;
