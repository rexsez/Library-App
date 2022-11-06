import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Pressable, View, StyleSheet, Text } from "react-native";
import MyButton from "../MyButton";
function CheckBox({
  text,
  highlightedText,
  onPressTerms,
  onPressCheckbox,
  chechboxStyle,
}) {
  const pressedJSX = (
    <Ionicons
      name="checkmark-circle-outline"
      size={1}
      color="black"
      style={[styles.icon]}
    ></Ionicons>
  );
  const pressed = {
    pressed: true,
    display: pressedJSX,
  };
  const notPressedJSX = (
    <Ionicons
      name="ellipse-outline"
      color="#10426E"
      size={10}
      style={styles.icon}
    ></Ionicons>
  );
  const notPressed = {
    pressed: false,
    display: notPressedJSX,
  };
  const intialPressedStatus = {
    pressed: false,
    display: notPressedJSX,
  };
  const [pressedStatus, setDispay] = useState(intialPressedStatus);
  function onPress() {
    if (!!onPressCheckbox) onPressCheckbox();
    setDispay((oldPressedStatus) => {
      if (oldPressedStatus.pressed) {
        return notPressed;
      } else {
        return pressed;
      }
    });
  }
  return (
    <View style={styles.COntainer}>
      <View style={styles.IconConainer}>
        <Pressable
          onPress={onPress}
          style={({ pressed }) => {
            if (pressed && styles.pressed) {
              return styles.pressed;
            }
          }}
        >
          {pressedStatus.display}
        </Pressable>
      </View>
      <Text style={styles.Text}>{text + " "}</Text>
      <MyButton
        textStyle={styles.TextHighlighted}
        Flate="flate"
        onPress={onPressTerms}
      >
        {highlightedText}
      </MyButton>
    </View>
  );
}
const styles = StyleSheet.create({
  IconConainer: {
    marginRight: 8,
  },
  COntainer: {
    marginHorizontal: "12%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  pressed: {
    opacity: 0.75,
  },
  icon: {
    fontSize: 30,
  },
  Text: {
    color: "#10426E",
    fontSize: 15,
    fontWeight: "bold",
  },
  TextHighlighted: {
    color: "#FFA920",
    fontSize: 15,
    fontWeight: "bold",
  },

  textstuff: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default CheckBox;
