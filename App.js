import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";

import StudentContextProvider from "./store/StudentContext";
import DrawerNavigator from "./components/navigators/DrawerNavigator";
import AppContextProvider from "./store/AppContext";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light "></StatusBar>
      <AppContextProvider>
        <StudentContextProvider>
          <DrawerNavigator />
        </StudentContextProvider>
      </AppContextProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
});
