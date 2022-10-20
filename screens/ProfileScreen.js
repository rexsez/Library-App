import { View, StyleSheet } from "react-native";
import ProfileNavigator from "../components/ProfileScreenComponents/ProfileNavigator";
import Title from "../components/Title";

function ProfileScreen() {
  return (
    <View style={styles.outerContainer}>
      <View>
        <Title>Profile</Title>
      </View>
      <ProfileNavigator></ProfileNavigator>
    </View>
  );
}

export default ProfileScreen;
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
});
