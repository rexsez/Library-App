import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/HomeScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import SearchScreen from "../../screens/SearchScreen";
import StackNavigator from "./StackNavigator";
import Colors from "../Utility/Colors";
// import SearchScreenStack from "../screens/SearchScreenStack";

function TabNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        style={styles.container}
        screenOptions={{
          headerShown: false /*swipeEnabled: false, gestureEnabled: false*/,
        }}
        tabBarOptions={{
          activeTintColor: "white",
          inactiveTintColor: "lightgray",
          activeBackgroundColor: Colors.primary500,
          inactiveBackgroundColor: Colors.primary500,
          style: {
            backgroundColor: "black",
            paddingBottom: 3,
          },
        }}
      >
        <Tab.Screen
          name="TabHome"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="TabSearch"
          component={SearchScreen}
          options={{
            tabBarLabel: "Search",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" color={color} size={size} />
            ),
          }}
        />
        {/* <Tab.Screen
          name="TabProfile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        /> */}
      </Tab.Navigator>
    </SafeAreaView>
  );
}
export default TabNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
