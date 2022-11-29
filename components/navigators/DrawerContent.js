import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React, { useContext, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Avatar, Drawer, Switch, TouchableRipple } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { StudentContext } from "../../store/StudentContext";

export function DrawerContent(props) {
  const studentContext = useContext(StudentContext);
  const [currentScreen, setCurrentScreen] = useState("TabHome");

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
                  currentScreen === "TabHome" ? "#1b7ce4" : undefined,
              }}
              labelStyle={{
                marginLeft: -15,
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
                    <View pointerEvents="none">
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
              props.navigation.navigate("DrawerLogout");
              changeScreenHandler("DrawerLogout");
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
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
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
