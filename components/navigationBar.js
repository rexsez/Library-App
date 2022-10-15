import * as React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState } from "react";
import Icon from 'react-native-ico-material-design';

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "../screens/homeScreen";
import ProfileScreen from "../screens/profileScreen";
import SearchScreen from "../screens/searchScreen";

export default function NavigationBar() {
  const [currentScreen, setCurrentScreen] = useState("home");

  const homeName = "Home";
  const searchName = "Search";
  const profileName = "Profile";

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let routeName = route.name;

            if (routeName === homeName) {
              iconName = focused ? "home" : "home-outline";
            } else if (routeName === searchName) {
              iconName = focused ? "search" : "search-outline";
            } else if (routeName === profileName) {
              iconName = focused ? "list" : "list-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "grey",
          labelStyle: { paddingBottom: 10, fontsize: 10 },
          style: { padding: 10, hieght: 70 },
        }}
      >
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={searchName} component={SearchScreen} />
        <Tab.Screen name={profileName} component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
