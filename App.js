import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SearchScreen from "./screens/SearchScreen";
import BookInformationScreen from "./screens/Book_Information_Screen";
import NavigationFooter from "./components/navigationFooter";
import StudentContextProvidor from "./store/StudentContext";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import TermsAndConditions from "./components/TermsAndConditions";

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
            ></Stack.Screen>
            <Stack.Screen
              component={SearchScreen}
              name="SearchScreen"
            ></Stack.Screen>
            <Stack.Screen
              component={BookInformationScreen}
              name={"BookInformationScreen"}
            ></Stack.Screen>
            <Stack.Screen
              component={LoginScreen}
              name={"LoginScreen"}
              options={{
                title: "Login",
              }}
            ></Stack.Screen>
            <Stack.Screen
              component={RegisterScreen}
              name={"RegisterScreen"}
              options={{
                title: "Create An Account",
              }}
            ></Stack.Screen>
            <Stack.Screen
              component={TermsAndConditions}
              name={"TermsAndConditions"}
              options={{
                title: "Terms And Conditions",
                headerShown: false,
              }}
            ></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </StudentContextProvidor>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 15,
  },
});
