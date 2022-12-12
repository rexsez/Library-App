import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Button } from "react-native";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import StudentContextProvider from "./store/StudentContext";
import DrawerNavigator from "./components/navigators/DrawerNavigator";
import AppContextProvider from "./store/AppContext";
import StackNavigator from "./components/navigators/StackNavigator";
// import axios from "axios";
// import { sendMail } from "./Server/mailUtility";

export default function App() {
  // Ignore log notification by message
  LogBox.ignoreLogs(["Warning: ..."]);
  //Ignore all log notifications
  LogBox.ignoreAllLogs();
  return (
    <SafeAreaView style={styles.container}>
      {/* <Button
        title="Send Email"
        onPress={sendMail.bind(
          this,
          "218110087@psu.edu.sa",
          "Testing",
          "Farouq Ameen",
          "",
          "179548"
        )}
      /> */}
      <StatusBar style="dark"></StatusBar>
      <AppContextProvider>
        <StudentContextProvider>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
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
