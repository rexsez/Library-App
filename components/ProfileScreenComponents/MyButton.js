import { Text, View, StyleSheet, Pressable } from "react-native";
function MyButton({ children, onPress, isPressed }) {
  return (
    <Pressable
      //                                 To change the style of the
      //                                 pressed button
      style={[styles.buttonContainer, { borderBottomWidth: isPressed ? 4 : 1 }]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.textContainer}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default MyButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 16,
    textAlign: "center",
    flex: 1,
  },
  textContainer: {
    textAlign: "center",
  },
});
