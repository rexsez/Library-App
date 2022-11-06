import { ImageBackground, View, StyleSheet, Text } from "react-native";
import RegisterForm from "../components/RegisterAndLogin/RegisterForm";

function RegisterScreen() {
  return (
    <View style={styles.Container}>
      <ImageBackground
        style={styles.ImageBackground}
        source={require("../assets/logoNew2.png")}
        resizeMode="cover"
      >
        <View style={styles.RegistrationCOntainer}>
          <RegisterForm></RegisterForm>
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
  RegistrationCOntainer: {
    flex: 1,
  },
});
export default RegisterScreen;
