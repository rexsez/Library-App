import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Contact_Us_Screen from "./screens/Contact_Us_Screen";
import SearchScreen from "./screens/SearchScreen";
import BookInformationScreen from "./screens/Book_Information_Screen";
import NavigationFooter from "./components/navigationFooter";
import StudentContextProvidor from "./store/StudentContext";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import TermsAndConditions from "./components/TermsAndConditions";
import AddBookScreen from "./screens/Add_Book_Screen";
import BarcodeScanner from "./components/SearchScreenComponents/BarcodeScanner";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light "></StatusBar>
      <StudentContextProvidor>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              component={NavigationFooter}
              name="Navigation-Footer"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              component={SearchScreen}
              name="SearchScreenStack"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              component={LoginScreen}
              name={"LoginScreen"}
              options={{
                title: "Login",
              }}
            />
            <Stack.Screen
              component={RegisterScreen}
              name={"RegisterScreen"}
              options={{
                title: "Create An Account",
              }}
            />
            <Stack.Screen
              component={TermsAndConditions}
              name={"TermsAndConditions"}
              options={{
                title: "Terms And Conditions",
                headerShown: false,
              }}
            />
            <Stack.Screen name="Book" component={BookInformationScreen} />

            <Stack.Screen name="Add" component={AddBookScreen} />
            <Stack.Screen name="Barcode" component={BarcodeScanner} />
            <Stack.Screen name="ContactUs" component={Contact_Us_Screen} />
          </Stack.Navigator>
        </NavigationContainer>
      </StudentContextProvidor>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
});
