import { Pressable, View, Text, StyleSheet } from "react-native";

function PressableButton({ children, onPress, style, Flate }) {
  const isFlate = !!Flate;
  return (
    <View style={styles.Contianer}>
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
export default PressableButton;
const styles = StyleSheet.create({
  Contianer: {
    alignItems: "center",
  },
  buttonContainer: {
    borderRadius: 15,
    backgroundColor: "#FFA920",
    padding: 12,
    width: 130,
  },
  Flat: {
    backgroundColor: "transparent",
  },
  Text: {
    fontWeight: "bold",
    color: "#FAFAFA",
    textAlign: "center",
  },
  TextFlat: {
    color: "blue",
  },
  pressed: {
    opacity: 0.75,
  },
  Pressable: {},
});
