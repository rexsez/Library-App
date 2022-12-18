import { ImageBackground, View, StyleSheet } from "react-native";

import LoginForm from "../components/RegisterAndLogin/LoginForm";

function LoginScreen() {
  return (
    <View style={styles.Container}>
      <ImageBackground
        style={styles.ImageBackground}
        source={require("../assets/logoNew2.png")}
        resizeMode="cover"
      >
        <View style={styles.RegistrationContainer}>
          <LoginForm></LoginForm>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  ImageBackground: {
    flex: 1,
  },
  RegistrationContainer: {
    flex: 1,
  },
});
export default LoginScreen;
