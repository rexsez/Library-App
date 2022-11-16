import { StyleSheet, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderBackButton } from "react-navigation-stack";

import SearchScreen from "./SearchScreen";
import BarcodeScanner from "../components/SearchScreenComponents/BarcodeScanner";
import BookInformationScreen from "./Book_Information_Screen";
import AddBookScreen from "./Add_Book_Screen";

const Stack = createStackNavigator();

// The main purpose of this screen, is to allow me to navigate to different screen based on the
// phone used, so android users will be go back through the back button to the search
// screen after scanning a barcode of a book, because of a bug in the barcode scanner framework
// they cannot scan again immediately unless they go to open it again from the search screen
// So IOS is like the following:
// Search (Press Barcode scanner) -> Barcode scanning Screen -> Book Info Page (press go back) -> Barcode screen
// Android is like the following:
// Search (Press Barcode scanner) -> Barcode scanning Screen -> Book Info Page (press go back) -> Search Screen
// Note: if there is a way specify navigation option in App.js tell Hisham. this file could be deleted then
function SearchScreenStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchScreenStack"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Barcode" component={BarcodeScanner} />
      <Stack.Screen
        name="Book"
        component={BookInformationScreen}
        options={{
          // If platform is android make it go back to Search Screen instead of Barcode screen
          headerLeft:
            Platform.OS === "android"
              ? () => (
                  <HeaderBackButton
                    onPress={() => {
                      navigation.navigate("SearchScreenStack");
                    }}
                  />
                )
              : undefined, // if platform is IOS don't do anything
        }}
      />

      <Stack.Screen
        name="Add"
        component={AddBookScreen}
        options={{
          // If platform is android make it go back to Search Screen instead of Barcode screen
          headerLeft:
            Platform.OS === "android"
              ? () => (
                  <HeaderBackButton
                    onPress={() => {
                      navigation.navigate("SearchScreenStack");
                    }}
                  />
                )
              : undefined, // if platform is IOS don't do anything
        }}
      />
    </Stack.Navigator>
  );
}

export default SearchScreenStack;

const styles = StyleSheet.create({
  container: {},
});
