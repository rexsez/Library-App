import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-ico-material-design";
var iconHeight = 26;
var iconWidth = 26;
export default class NavigationBBar extends React.Component {
  state = {
    screenText: "Press a Button",
  };
  changeText = (text) => {
    console.log(text + " has been pressed!");
    this.setState({
      screenText: text,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={{ fontSize: 30, color: "black" }}>
            {this.state.screenText}
          </Text>
          <StatusBar style="light" />
        </View>
        <View style={styles.navContainer}>
          <View style={styles.navBar}>
            <Pressable
              onPress={() => this.changeText("Home")}
              style={styles.iconBehavior}
              android_ripple={{ borderless: true, radius: 50 }}
            >
              <Icon
                name="home-button"
                height={iconHeight}
                width={iconWidth}
                color="#448aff"
              />
            </Pressable>
            <Pressable
              onPress={() => this.changeText("Search")}
              style={styles.iconBehavior}
              android_ripple={{ borderless: true, radius: 50 }}
            >
              <Icon
                name="searching-magnifying-glass"
                height={iconHeight}
                width={iconWidth}
                color="#448aff"
              />
            </Pressable>
            <Pressable
              onPress={() => this.changeText("Profile")}
              style={styles.iconBehavior}
              android_ripple={{ borderless: true, radius: 50 }}
            >
              <Icon
                name="user-outline"
                height={iconHeight}
                width={iconWidth}
                color="#448aff"
              />
            </Pressable>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "yellow",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  navContainer: {
    position: "absolute",
    alignItems: "center",
    bottom: 0,
  },
  navBar: {
    flexDirection: "row",
    backgroundColor: "#eee",
    width: "100%",
    justifyContent: "space-evenly",
    borderRadius: 0,
  },
  iconBehavior: {
    padding: 14,
  },
});
