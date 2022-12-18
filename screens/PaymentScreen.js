import { View, StyleSheet, SafeAreaView } from "react-native";
import { Text } from "react-native-paper";
import PaymentForm from "../components/RegisterAndLogin/PaymentForm";
import { useRoute } from "@react-navigation/native";
import Colors from "../components/Utility/Colors";
function PaymentScreen() {
  const route = useRoute();
  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Payment</Text>
      </View>
      <View style={styles.Container}>
        <PaymentForm onCancel={route.params.onCancel}></PaymentForm>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 0.96,
    marginVertical: 3,
  },
  ImageBackground: {
    flex: 1,
  },
  titleContainer: {
    backgroundColor: Colors.primary500,
    height: 90,
    justifyContent: "center",
  },
  titleText: {
    padding: 10,
    color: "white",
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 1.5,
    fontSize: 24,
  },
});
export default PaymentScreen;
