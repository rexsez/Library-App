import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";

import StudentContextProvidor, { StudentContext } from "./store/StudentContext";
import StackNavigator from "./components/StackNavigator";
import ProfileScreen from "./screens/ProfileScreen";
import LogoutScreen from "./screens/LogoutScreen";
import Contact_Us_Screen from "./screens/Contact_Us_Screen";
import LoginScreen from "./screens/LoginScreen";
import { color } from "react-native-reanimated";

export default function App() {
  const Drawer = createDrawerNavigator();
  const studentContext = useContext(StudentContext);
  let screen = null;
  if (!!!studentContext.student.Email) {
    screen = (
      <Drawer.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "Log in",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="log-in-outline" color={color} size={size} />
          ),
        }}
      />
    );
  } else {
    screen = (
      <Drawer.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          title: "Log out",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" color={color} size={size} />
          ),
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light "></StatusBar>
      <StudentContextProvidor>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="StackNavigator"
            screenOptions={{
              headerShown: true,
              headerTitle: "",
            }}
          >
            <Drawer.Screen
              name="HomeScreen"
              component={StackNavigator}
              options={{
                title: "Home",
                drawerIcon: ({ color, size }) => (
                  <Ionicons name="home" color={color} size={size} />
                ),
              }}
            />
            {screen}
            <Drawer.Screen
              name="Starred"
              component={ProfileScreen}
              options={{
                drawerIcon: ({ color, size }) => (
                  <Ionicons name="star" color={color} size={size} />
                ),
              }}
            />
            <Drawer.Screen
              name="ContactUsScreen"
              component={Contact_Us_Screen}
              options={{
                title: "About us",
                drawerIcon: ({ color, size }) => (
                  <Ionicons
                    name="ios-information-circle-outline"
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
          </Drawer.Navigator>
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
