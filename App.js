import { StyleSheet, SafeAreaView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";


import Contact_Us_Screen from "./screens/Contact_Us_Screen";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <SafeAreaView style={styles.container}>
      <Contact_Us_Screen> </Contact_Us_Screen>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
});
