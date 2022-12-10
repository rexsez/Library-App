import { ImageBackground, View, StyleSheet, SafeAreaView } from "react-native";
import { Text } from "react-native-paper";

import PaymentForm from "../components/RegisterAndLogin/PaymentForm";

function PaymentScreen() {
  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.Container}>
        <View style={styles.RegistrationCOntainer}>
          <PaymentForm></PaymentForm>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    marginBottom: 26
  },
  ImageBackground: {
    flex: 1,
  },
  RegistrationCOntainer: {
    flex: 1,
  },
});
export default PaymentScreen;
