import { View, Text, StyleSheet } from "react-native";
function LogoutScreen() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 50 }}>This is logout screen</Text>
    </View>
  );
}

export default LogoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
});
