import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React, { useContext, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Avatar, Drawer, Switch, TouchableRipple } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { updateFavList } from "../Utility/http";
import { StudentContext } from "../../store/StudentContext";
import Student from "../../models/Student";
import { AppContext } from "../../store/AppContext";
import Colors from "../Utility/Colors";

export function DrawerContent(props) {
  // used to get dark mode option from student context, I am storing it in
  // a context because later on, we will decide the coloring scheme based on it
  const studentContext = useContext(StudentContext);
  // used to track the current screen, which is then used to change drawer's active screen
  // background color
  const [currentScreen, setCurrentScreen] = useState("Home");
  // just to change screen, will be called when a drawer screen is pressed
  function changeScreenHandler(ScreenName) {
    setCurrentScreen(ScreenName);
  }

  const appCtx = useContext(AppContext);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <Drawer.Section style={styles.drawerSection}>
            <View style={styles.logo}>
              <Avatar.Image
                size={150}
                source={require("../../assets/PSUlogo2.png")}
              />
            </View>
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ size }) => (
                <Ionicons
                  name="home"
                  // here we decide the icon color based on the active screen
                  // just to have a good mixture of coloring when the background color is changed
                  color={appCtx.currentScreen === "Home" ? "white" : undefined}
                  size={size}
                />
              )}
              label="Home"
              onPress={() => {
                appCtx.changeScreenHandler("Home");
                props.navigation.toggleDrawer();
                props.navigation.navigate("TabHome");
              }}
              style={{
                backgroundColor:
                  // here we decide background color based on the active screen
                  appCtx.currentScreen === "Home"
                    ? Colors.primary500
                    : undefined,
              }}
              labelStyle={{
                // margin here is used to decide the distance between a drawer icon and its label
                // the bigger the number goes in the negative direction (-20,-50...etc), the closer
                // the label will be to the icon
                marginLeft: -15,
                // here we decide the text color based on the active screen
                // just to have a good mixture of coloring when the background color is changed
                color: appCtx.currentScreen === "Home" ? "white" : undefined,
              }}
            />
            <DrawerItem
              icon={({ size }) => (
                <Ionicons
                  name="person-outline"
                  color={
                    appCtx.currentScreen === "Profile" ? "white" : undefined
                  }
                  size={size}
                />
              )}
              label="Profile"
              onPress={() => {
                appCtx.changeScreenHandler("Profile");
                props.navigation.toggleDrawer();
                props.navigation.navigate("DrawerProfile");
              }}
              style={{
                backgroundColor:
                  appCtx.currentScreen === "Profile"
                    ? Colors.primary500
                    : undefined,
              }}
              labelStyle={{
                marginLeft: -15,
                color:
                  appCtx.currentScreen === "Profile" ? "white" : undefined,
              }}
            />
            <DrawerItem
              icon={({ size }) => (
                <Ionicons
                  name="ios-information-circle-outline"
                  color={
                    appCtx.currentScreen === "Contact" ? "white" : undefined
                  }
                  size={size}
                />
              )}
              label="About us"
              onPress={() => {
                appCtx.changeScreenHandler("Contact");
                props.navigation.toggleDrawer();
                props.navigation.navigate("DrawerContact");
              }}
              style={{
                backgroundColor:
                  appCtx.currentScreen === "Contact"
                    ? Colors.primary500
                    : undefined,
              }}
              labelStyle={{
                marginLeft: -15,
                color: appCtx.currentScreen === "Contact" ? "white" : undefined,
              }}
            />
          </Drawer.Section>

        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        {!!!studentContext.student.Email ? (
          <>
            <DrawerItem
              icon={({ size }) => (
                <Ionicons
                  name="log-in-outline"
                  color={appCtx.currentScreen === "Login" ? "white" : undefined}
                  size={size}
                />
              )}
              label="Sign in"
              onPress={() => {
                appCtx.changeScreenHandler("Login");
                props.navigation.toggleDrawer();
                props.navigation.navigate("DrawerLogin");
              }}
              style={{
                backgroundColor:
                  appCtx.currentScreen === "Login" ? Colors.primary500 : undefined,
              }}
              labelStyle={{
                marginLeft: -15,
                color: appCtx.currentScreen === "Login" ? "white" : undefined,
              }}
            />
            <DrawerItem
              icon={({ size }) => (
                <Ionicons
                  name="person-add-outline"
                  color={
                    appCtx.currentScreen === "DrawerRegister"
                      ? "white"
                      : undefined
                  }
                  size={size}
                />
              )}
              label="Sign up"
              onPress={() => {
                appCtx.changeScreenHandler("Register");
                props.navigation.toggleDrawer();
                props.navigation.navigate("DrawerRegister");
              }}
              style={{
                backgroundColor:
                  appCtx.currentScreen === "Register" ? Colors.primary500: undefined,
              }}
              labelStyle={{
                marginLeft: -15,
                color:
                  appCtx.currentScreen === "Register" ? "white" : undefined,
              }}
            />
          </>
        ) : (
          <>
            <DrawerItem
              icon={({ size }) => (
                <Ionicons
                  name="log-out-outline"
                  color={
                    appCtx.currentScreen === "Logout" ? "white" : undefined
                  }
                  size={size}
                />
              )}
              label="Sign out"
              onPress={() => {
                // First, we upload the changes made to student context to the database
                updateFavList(studentContext.ID, studentContext.student);
                // console.log(studentContext.student);
                const initialNewStudent1 = new Student("", "", "", "", [], []);
                studentContext.registerStudent(initialNewStudent1);
              }}
              style={{
                backgroundColor:
                  appCtx.currentScreen === "Logout" ? Colors.primary500 : undefined,
              }}
              labelStyle={{
                marginLeft: -15,
                color: appCtx.currentScreen === "Logout" ? "white" : undefined,
              }}
            />
            <DrawerItem
              icon={({ size }) => (
                <MaterialCommunityIcons
                  name="account-edit-outline"
                  size={size}
                  color={appCtx.currentScreen === "Edit" ? "white" : undefined}
                />
              )}
              label="Edit Profile"
              onPress={() => {
                appCtx.changeScreenHandler("Edit");
                props.navigation.toggleDrawer();
                props.navigation.navigate("DrawerEdit");
              }}
              style={{
                backgroundColor:
                  appCtx.currentScreen === "Edit" ? Colors.primary500 : undefined,
              }}
              labelStyle={{
                marginLeft: -15,
                color: appCtx.currentScreen === "Edit" ? "white" : undefined,
              }}
            />
          </>
        )}
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  logo: {
    alignItems: "center",
  },
  toggle: {
    flexDirection: "row",
    alignItems: "center",
  },
});
