import { Pressable, View, Text, StyleSheet } from "react-native";

function MyButton({ children, onPress, style, Flate }) {
  const isFlate = !!Flate;
  return (
    <View style={[style]}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [pressed && styles.pressed, styles.Pressable]}
      >
        <View style={[styles.buttonContainer, isFlate && styles.Flat]}>
          <Text style={[styles.Text, isFlate && styles.TextFlat]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
export default MyButton;
const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 4,
    backgroundColor: "white",
    flex: 1,
  },
  Flat: {
    backgroundColor: "transparent",
  },
  Text: {
    fontWeight: "bold",
    color: "white",
  },
  TextFlat: {
    color: "blue",
  },
  pressed: {
    opacity: 0.75,
  },
  Pressable: {
    flex: 1,
  },
});
