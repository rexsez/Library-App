import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Contact_Us_Screen from "../../screens/Contact_Us_Screen";
import ProfileScreen from "../../screens/ProfileScreen";

import StackNavigator from "./StackNavigator";
import { DrawerContent } from "./DrawerContent";
import LoginScreen from "../../screens/LoginScreen";
import LogoutScreen from "../../screens/LogoutScreen";
import RegisterScreen from "../../screens/RegisterScreen";
import EditProfileScreen from "../../screens/EditProfileScreen";

function DrawerNavigator() {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        initialRouteName="StackNavigator"
        screenOptions={{
          headerShown: true,
          headerTitle: "",
          headerTransparent: false,
        }}
      >
        {/* these screens are only needed as a reference, so I can navigation.navigate(Screen Name)*/}
        {/* options aren't currently needed because everything is handled in the Drawer Content */}
        <Drawer.Screen
          name="DrawerHome"
          component={StackNavigator}
          // options={{
          //   title: "Home",
          //   drawerIcon: ({ color, size }) => (
          //     <Ionicons name="home" color={color} size={size} />
          //   ),
          // }}
        />
        <Drawer.Screen
          name="DrawerProfile"
          component={ProfileScreen}
          // options={{
          //   title: "Favorite",
          //   drawerIcon: ({ color, size }) => (
          //     <Ionicons name="star" color={color} size={size} />
          //   ),
          // }}
        />
        <Drawer.Screen
          name="DrawerContact"
          component={Contact_Us_Screen}
          // options={{
          //   title: "About us",
          //   drawerIcon: ({ color, size }) => (
          //     <Ionicons
          //       name="ios-information-circle-outline"
          //       color={color}
          //       size={size}
          //     />
          //   ),
          // }}
        />
        <Drawer.Screen
          component={LoginScreen}
          name="DrawerLogin"
          // options={{
          //   title: "Sign in",
          //   drawerItemStyle: { height: 0 },
          // }}
        />
        <Drawer.Screen
          name="DrawerLogout"
          component={LogoutScreen}
          // options={{
          //   title: "Sign out",
          //   drawerItemStyle: { height: 0 },
          // }}
        />
        <Drawer.Screen
          name="DrawerRegister"
          component={RegisterScreen}
   
        />
        <Drawer.Screen
          name="DrawerEdit"
          component={EditProfileScreen}
          // options={{
          //   title: "Edit Profile",
          //   drawerItemStyle: { height: 0 },
          // }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default DrawerNavigator;
