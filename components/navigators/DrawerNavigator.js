import { createDrawerNavigator } from "@react-navigation/drawer";
import Contact_Us_Screen from "../../screens/Contact_Us_Screen";
import ProfileScreen from "../../screens/ProfileScreen";

import { DrawerContent } from "./DrawerContent";
import LoginScreen from "../../screens/LoginScreen";
import LogoutScreen from "../../screens/LogoutScreen";
import RegisterScreen from "../../screens/RegisterScreen";
import EditProfileScreen from "../../screens/EditProfileScreen";
import TabNavigator from "./TabNavigator";

function DrawerNavigator() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerTransparent: false,
        gestureEnabled: false,
      }}
    >
      {/* these screens are only needed as a reference, so I can navigation.navigate(Screen Name)*/}
      {/* options aren't currently needed because everything is handled in the Drawer Content */}
      <Drawer.Screen
        name="DrawerHome"
        component={TabNavigator}
        options={{
          headerShown: true,
          title: "",
        }}
      />
      <Drawer.Screen
        name="DrawerProfile"
        component={ProfileScreen}
        options={{
          title: "Profile",
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
        component={LoginScreen}
        name="DrawerLogin"
        options={{
          title: "Sign in",
        }}
      />
      <Drawer.Screen
        name="DrawerLogout"
        component={LogoutScreen}
        options={{
          title: "Sign out",
        }}
      />
      <Drawer.Screen
        name="DrawerRegister"
        component={RegisterScreen}
        options={{
          title: "Sign up",
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
  );
}

export default DrawerNavigator;
