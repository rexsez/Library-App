import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";

import StudentContextProvider from "./store/StudentContext";
import DrawerNavigator from "./components/navigators/DrawerNavigator";
import AppContextProvider from "./store/AppContext";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDZIiD-Oj8IcfNTH9sU464VJypjbIbssmc",
  authDomain: "psu-library-app.firebaseapp.com",
  databaseURL:
    "https://psu-library-app-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "psu-library-app",
  storageBucket: "psu-library-app.appspot.com",
  messagingSenderId: "322635220748",
  appId: "1:322635220748:web:79c1f25bb93f5b1a5b2b29",
  measurementId: "G-VPBQEJVJ91",
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

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
