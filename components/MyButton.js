import { Pressable, View, Text, StyleSheet } from "react-native";

function MyButton({ children, onPress, style, textStyle }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.pressed, styles.Pressable]}
    >
      <View style={[style]}>
        <View>
          <Text style={[styles.Text, textStyle]}>{children}</Text>
        </View>
      </View>
    </Pressable>
  );
}
export default MyButton;
const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#FFA920",
  },
  Text: {
    fontWeight: "bold",
    color: "#FFA920",
  },
  pressed: {
    opacity: 0.75,
  },
  Pressable: {},
});
