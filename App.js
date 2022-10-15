import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import NavigationBBar from "./components/navigationBBar";
import { useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import ProfileScreen from "./screens/profileScreen";

function App() {
  const [currentScreen, setCurrentScreen] = useState();
  function changeScreenHandler(screen) {
    if (!currentScreen) {
      currentScreen = <HomeScreen />;
    } else if (screen === "home") {
      currentScreen = <HomeScreen />;
    } else if (screen === "search") {
      currentScreen = <SearchScreen />;
    } else if (screen === "profile") {
      currentScreen = <ProfileScreen />;
    }
  }
  return (
    <View style={styles.container}>
      <NavigationBBar onPress={changeScreenHandler}></NavigationBBar>
      <StatusBar style="auto" />
    </View>
  );
}
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
