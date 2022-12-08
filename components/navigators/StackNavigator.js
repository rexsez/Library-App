import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import TabNavigator from "./TabNavigator";
import SearchScreen from "../../screens/SearchScreen";
import RegisterScreen from "../../screens/RegisterScreen";
import TermsAndConditions from "../TermsAndConditions";
import BookInformationScreen from "../../screens/Book_Information_Screen";
import AddBookScreen from "../../screens/Add_Book_Screen";
import BarcodeScanner from "../SearchScreenComponents/BarcodeScanner";
import Contact_Us_Screen from "../../screens/Contact_Us_Screen";
import EditProfileScreen from "../../screens/EditProfileScreen";
import HomeScreen from "../../screens/HomeScreen";
import StatisticsScreen from "../../screens/Statistics_Screen";

function StackNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator /*screenOptions={{swipeEnabled: false, gestureEnabled: false}}*/>
      <Stack.Screen
        component={TabNavigator}
        name="StackTabNavigator"
        options={{ headerShown: false, title: "Search" }}
      />
      <Stack.Screen
        component={SearchScreen}
        name="StackSearch"
        options={{ headerShown: false, title: "Search" }}
      />
      <Stack.Screen
        name="StackEdit"
        component={EditProfileScreen}
        options={{
          title: "Edit Profile",
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={RegisterScreen}
        name="StackRegister"
        options={{
          title: "Create An Account",
        }}
      />
      <Stack.Screen
        component={TermsAndConditions}
        name="StackTerms"
        options={{
          title: "Terms And Conditions",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StackBook"
        component={BookInformationScreen}
        options={{
          title: "Book Information",
        }}
      />
      <Stack.Screen
        name="StackAdd"
        component={AddBookScreen}
        options={{
          title: "Add Book",
        }}
      />
      <Stack.Screen
        name="StackBarcode"
        component={BarcodeScanner}
        options={{
          title: "Barcode Scanner",
        }}
      />
      <Stack.Screen
        name="StackContact"
        component={Contact_Us_Screen}
        options={{
          title: "About Us",
        }}
      />
      <Stack.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          title: "Statistics",
        }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;

const styles = StyleSheet.create({
  container: {},
});
