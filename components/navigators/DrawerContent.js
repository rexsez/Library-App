import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React, { useContext, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Avatar, Drawer, Switch, TouchableRipple } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Student from "../../models/Student";

import { StudentContext } from "../../store/StudentContext";

export function DrawerContent(props) {
  // used to get dark mode option from student context, I am storing it in
  // a context because later on, we will decide the coloring scheme based on it
  const studentContext = useContext(StudentContext);
  // used to track the current screen, which is then used to change drawer's active screen
  // background color
  const [currentScreen, setCurrentScreen] = useState("TabHome");
  // just to change screen, will be called when a drawer screen is pressed
  function changeScreenHandler(ScreenName) {
    setCurrentScreen(ScreenName);
  }
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
                  color={currentScreen === "TabHome" ? "white" : undefined}
                  size={size}
                />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("TabHome");
                changeScreenHandler("TabHome");
              }}
              style={{
                backgroundColor:
                  // here we decide background color based on the active screen
                  currentScreen === "TabHome" ? "#1b7ce4" : undefined,
              }}
              labelStyle={{
                // margin here is used to decide the distance between a drawer icon and its label
                // the bigger the number goes in the negative direction (-20,-50...etc), the closer
                // the label will be to the icon
                marginLeft: -15,
                // here we decide the text color based on the active screen
                // just to have a good mixture of coloring when the background color is changed
                color: currentScreen === "TabHome" ? "white" : undefined,
              }}
            />
            <DrawerItem
              icon={({ size }) => (
                <Ionicons
                  name="star"
                  color={
                    currentScreen === "DrawerProfile" ? "white" : undefined
                  }
                  size={size}
                />
              )}
              label="Favorite"
              onPress={() => {
                props.navigation.navigate("DrawerProfile");
                changeScreenHandler("DrawerProfile");
              }}
              style={{
                backgroundColor:
                  currentScreen === "DrawerProfile" ? "#1b7ce4" : undefined,
              }}
              labelStyle={{
                marginLeft: -15,
                color: currentScreen === "DrawerProfile" ? "white" : undefined,
              }}
            />
            <DrawerItem
              icon={({ size }) => (
                <Ionicons
                  name="ios-information-circle-outline"
                  color={
                    currentScreen === "DrawerContact" ? "white" : undefined
                  }
                  size={size}
                />
              )}
              label="About us"
              onPress={() => {
                props.navigation.navigate("DrawerContact");
                changeScreenHandler("DrawerContact");
              }}
              style={{
                backgroundColor:
                  currentScreen === "DrawerContact" ? "#1b7ce4" : undefined,
              }}
              labelStyle={{
                marginLeft: -15,
                color: currentScreen === "DrawerContact" ? "white" : undefined,
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Settings">
            <TouchableRipple
              onPress={() => {
                studentContext.toggleTheme();
              }}
            >
              <View style={styles.preference}>
                <View style={styles.toggle}>
                  <View style={{ marginRight: 20 }}>
                    <Text>Dark Theme</Text>
                  </View>
                  <View>
                    {/* This is needed for the switch button to work properly, didn't understand why tbh */}
                    <View pointerEvents="none">
                      {/* Get switch value (pressed or no) from student context */}
                      <Switch value={studentContext.isDarkTheme} />
                    </View>
                  </View>
                </View>
              </View>
            </TouchableRipple>
            <DrawerItem
              icon={({ size }) => (
                <MaterialCommunityIcons
                  name="account-edit-outline"
                  size={size}
                  color={currentScreen === "DrawerEdit" ? "white" : undefined}
                />
              )}
              label="Edit Profile"
              onPress={() => {
                props.navigation.navigate("DrawerEdit");
                changeScreenHandler("DrawerEdit");
              }}
              style={{
                backgroundColor:
                  currentScreen === "DrawerEdit" ? "#1b7ce4" : undefined,
              }}
              labelStyle={{
                marginLeft: -15,
                color: currentScreen === "DrawerEdit" ? "white" : undefined,
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
                  color={currentScreen === "DrawerLogin" ? "white" : undefined}
                  size={size}
                />
              )}
              label="Sign in"
              onPress={() => {
                props.navigation.navigate("DrawerLogin");
                changeScreenHandler("DrawerLogin");
              }}
              style={{
                backgroundColor:
                  currentScreen === "DrawerLogin" ? "#1b7ce4" : undefined,
              }}
              labelStyle={{
                marginLeft: -15,
                color: currentScreen === "DrawerLogin" ? "white" : undefined,
              }}
            />
            <DrawerItem
              icon={({ size }) => (
                <Ionicons
                  name="person-add-outline"
                  color={
                    currentScreen === "DrawerRegister" ? "white" : undefined
                  }
                  size={size}
                />
              )}
              label="Sign up"
              onPress={() => {
                props.navigation.navigate("DrawerRegister");
                changeScreenHandler("DrawerRegister");
              }}
              style={{
                backgroundColor:
                  currentScreen === "DrawerRegister" ? "#1b7ce4" : undefined,
              }}
              labelStyle={{
                marginLeft: -15,
                color: currentScreen === "DrawerRegister" ? "white" : undefined,
              }}
            />
          </>
        ) : (
          <DrawerItem
            icon={({ size }) => (
              <Ionicons
                name="log-out-outline"
                color={currentScreen === "DrawerLogout" ? "white" : undefined}
                size={size}
              />
            )}
            label="Sign out"
            onPress={() => {
              
                
                  const initialNewStudent1 = new Student(
                    "",
                    "",
                    "",
                    "",
                  );
                  console.log("clicked");
                  studentContext.registerStudent(initialNewStudent1);
                
              
            }}
            style={{
              backgroundColor:
                currentScreen === "DrawerLogout" ? "#1b7ce4" : undefined,
            }}
            labelStyle={{
              marginLeft: -15,
              color: currentScreen === "DrawerLogout" ? "white" : undefined,
            }}
          />
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
