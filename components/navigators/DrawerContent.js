import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Avatar, Drawer, Switch, TouchableRipple } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { StudentContext } from "../../store/StudentContext";

export function DrawerContent(props) {
  const studentContext = useContext(StudentContext);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <Drawer.Section style={styles.drawerSection}>
            <View style={styles.logo}>
              <Avatar.Image
                size={150}
                source={require("../../assets/PSUlogo.png")}
              />
            </View>
          </Drawer.Section>
          <DrawerItemList {...props} />
          <Drawer.Section style={styles.drawerSection}></Drawer.Section>
          {/* <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("TabHome");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="star" color={color} size={size} />
              )}
              label="Favorite"
              onPress={() => {
                props.navigation.navigate("DrawerProfile");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons
                  name="ios-information-circle-outline"
                  color={color}
                  size={size}
                />
              )}
              label="About us"
              onPress={() => {
                props.navigation.navigate("DrawerContact");
              }}
            />
          </Drawer.Section> */}
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
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="account-edit-outline"
                  size={size}
                  color={color}
                />
              )}
              label="Edit profile"
              onPress={() => {
                props.navigation.navigate("DrawerEdit");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        {!!!studentContext.student.Email ? (
          <View>
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="log-in-outline" color={color} size={size} />
              )}
              label="Sign in"
              onPress={() => {
                props.navigation.navigate("DrawerLogin");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons
                  name="ios-person-add-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Sign up"
              onPress={() => {
                props.navigation.navigate("DrawerRegister");
              }}
            />
          </View>
        ) : (
          <DrawerItem
            icon={({ color, size }) => (
              <Ionicons name="log-out-outline" color={color} size={size} />
            )}
            label="Sign out"
            onPress={() => {
              props.navigation.navigate("DrawerLogout");
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
