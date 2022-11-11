import { View, StyleSheet } from "react-native";
import Title from "../components/Title";

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Title>Home</Title>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
