import { useRoute } from "@react-navigation/native";
import { View, StyleSheet, ImageBackground } from "react-native";
import VerificationForm from "../components/RegisterAndLogin/verificationForm";

function Verification() {

  return (
    <View style={styles.Container}>
      <VerificationForm />
    </View>
  );
}

export default Verification;

const styles = StyleSheet.create({
  container: {},
});
