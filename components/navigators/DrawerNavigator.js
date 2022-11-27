import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";

import Contact_Us_Screen from "../../screens/Contact_Us_Screen";
import ProfileScreen from "../../screens/ProfileScreen";

import StackNavigator from "./StackNavigator";
import { DrawerContent } from "./DrawerContent";
import LoginScreen from "../../screens/LoginScreen";
import HomeScreen from "../../screens/HomeScreen";
import EditProfileScreen from "../../screens/EditProfileScreen";
import LogoutScreen from "../../screens/LogoutScreen";

function DrawerNavigator() {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        drawerStyle={{ backgroundColor: "#111" }}
        initialRouteName="StackNavigator"
        screenOptions={{
          headerShown: true,
          headerTitle: "",
          headerTransparent: false,
        }}
      >
        <Drawer.Screen
          name="DrawerHome"
          component={StackNavigator}
          options={{
            title: "Home",
          }}
        />
        <Drawer.Screen
          name="DrawerProfile"
          component={ProfileScreen}
          options={{
            title: "Favorite",
          }}
        />
        <Drawer.Screen
          name="DrawerContact"
          component={Contact_Us_Screen}
          options={{
            title: "About us",
          }}
        />
        <Drawer.Screen
          name="DrawerLogin"
          component={LoginScreen}
          options={{
            title: "Login",
          }}
        />
        <Drawer.Screen
          name="DrawerLogout"
          component={LogoutScreen}
          options={{
            title: "Logout ",
          }}
        />
        <Drawer.Screen
          name="DrawerEdit"
          component={EditProfileScreen}
          options={{
            title: "Edit Profile",
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default DrawerNavigator;
