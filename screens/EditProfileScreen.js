import { ImageBackground, View, StyleSheet, SafeAreaView } from "react-native";

import EditProfileForm from "../components/RegisterAndLogin/EditProfileForm";
function RegisterScreen() {
  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.Container}>
        <ImageBackground
          style={styles.ImageBackground}
          source={require("../assets/logoNew2.png")}
          resizeMode="cover"
        >
          <View style={styles.RegistrationCOntainer}>
            <EditProfileForm></EditProfileForm>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  ImageBackground: {
    flex: 1,
  },
  RegistrationCOntainer: {
    flex: 1,
  },
});
export default RegisterScreen;
