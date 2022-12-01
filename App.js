import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import { useContext } from "react";

import StudentContextProvidor, { StudentContext } from "./store/StudentContext";
import DrawerNavigator from "./components/navigators/DrawerNavigator";

export default function App() {
  const studentContext = useContext(StudentContext);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light "></StatusBar>
      <StudentContextProvidor>
        <DrawerNavigator />
      </StudentContextProvidor>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
});
