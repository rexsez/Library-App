import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import Contact_Us_Screen from "../../screens/Contact_Us_Screen";
import ProfileScreen from "../../screens/ProfileScreen";

import StackNavigator from "./StackNavigator";
import { DrawerContent } from "./DrawerContent";

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
          drawerActiveBackgroundColor: "#1b7ce4",
          drawerActiveTintColor: "white",
        }}
      >
        <Drawer.Screen
          name="DrawerHome"
          component={StackNavigator}
          options={{
            title: "Home",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="DrawerProfile"
          component={ProfileScreen}
          options={{
            title: "Favorite",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="star" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="DrawerContact"
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
  );
}

export default DrawerNavigator;
