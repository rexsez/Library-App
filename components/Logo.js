import { View, Image, Pressable, StyleSheet } from "react-native";
export default function Logo({ uri }) {
  return (
    <View style={styles.Container}>
      <Pressable style={styles.innerContainer}>
        <Image
          source={require("../assets/logoNew.png")}
          style={styles.Image}
        ></Image>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  Container: {
    marginTop: 30,
    padding: 10,
    marginBottom: 10,
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  Image: {
    width: 784,
    height: 200,
  },
});
