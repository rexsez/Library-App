import { View, Text, StyleSheet } from "react-native";
function EditProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 50 }}>This is edit profile screen</Text>
    </View>
  );
}

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
});
