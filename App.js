import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import { LogBox } from 'react-native';

import StudentContextProvider from "./store/StudentContext";
import DrawerNavigator from "./components/navigators/DrawerNavigator";
import AppContextProvider from "./store/AppContext";

export default function App() {
  // Ignore log notification by message
  LogBox.ignoreLogs(['Warning: ...']);
  //Ignore all log notifications
  LogBox.ignoreAllLogs();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark"></StatusBar>
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
