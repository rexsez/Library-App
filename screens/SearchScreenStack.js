import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import SearchScreen from "./SearchScreen";
import BarcodeScanner from "../components/SearchScreenComponents/BarcodeScanner";
import BookInformationScreen from "./Book_Information_Screen";

const Stack = createStackNavigator();

function SearchScreenStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Barcode" component={BarcodeScanner} />
      <Stack.Screen name="Book" component={BookInformationScreen} />
    </Stack.Navigator>
  );
}

export default SearchScreenStack;

const styles = StyleSheet.create({
  container: {},
});
