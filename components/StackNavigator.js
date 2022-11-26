import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import SearchScreen from "../screens/SearchScreen";
import LoginScreen from "../screens/LoginScreen";
import NavigationFooter from "./navigationFooter";
import RegisterScreen from "../screens/RegisterScreen";
import TermsAndConditions from "./TermsAndConditions";
import BookInformationScreen from "../screens/Book_Information_Screen";
import AddBookScreen from "../screens/Add_Book_Screen";
import BarcodeScanner from "./SearchScreenComponents/BarcodeScanner";
import Contact_Us_Screen from "../screens/Contact_Us_Screen";

function StackNavigator() {
  const Stack = createStackNavigator();

  return (
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
  );
}

export default StackNavigator;

const styles = StyleSheet.create({
  container: {},
});
