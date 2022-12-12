import { useRoute } from "@react-navigation/native";
import { View, StyleSheet, ImageBackground } from "react-native";
import VerificationForm from "../components/RegisterAndLogin/verificationForm";

function Verification() {

  return (
    <ImageBackground
          style={styles.ImageBackground}
          source={require("../assets/logoNew2.png")}
          resizeMode="cover"
        >
          <View style={styles.container}>
            <VerificationForm />
          </View>
    </ImageBackground>
  );
}

export default Verification;

const styles = StyleSheet.create({
  container: {
    marginTop:200,
  },
  ImageBackground: {
    flex: 1,
  },
});
