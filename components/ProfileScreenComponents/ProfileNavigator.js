import { Text, View, StyleSheet } from "react-native";
import React, { useState } from "react";
import MyButton from "./MyButton";
import Ionicons from "@expo/vector-icons/Ionicons";
function ProfileNavigator() {
  // This will be used to keep track of what card should be displayed
  // borrowed books card or starred books card, initially its set to borrowed
  // books card
  const [currentCard, setCurrentCard] = useState("borrow");
  // This function will be called whenever an icon is pressed (The book icon that
  // represent borrowed books or the star icon that represents the starred books)
  function changeCard(cardName) {
    if (currentCard === cardName) {
      return;
    } else {
      setCurrentCard(cardName);
    }
  }
  // Here we decide what should be displayed based on the current card const line 9
  let content = (
    <View
      style={{
        marginTop: 20,
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ textAlign: "center" }}>{currentCard}</Text>
    </View>
  );
  // These variables will be used to change the style of the pressed icon, based on it
  // The style of the icon will be changed
  let isBorrow = false;
  let isStarred = false;
  if (currentCard === "borrow") isBorrow = true;
  else isStarred = true;

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <MyButton
          style={[styles.buttonContainer, {}]}
          onPress={changeCard.bind(this, "borrow")}
          isPressed={isBorrow}
        >
          {<Ionicons name="book" color={"blue"} size={30} />}
        </MyButton>
        <MyButton
          style={styles.buttonContainer}
          onPress={changeCard.bind(this, "starred")}
          isPressed={isStarred}
        >
          {<Ionicons name="star" color={"blue"} size={30} />}
        </MyButton>
      </View>
      {/* Here the card will be displayed  */}
      {content}
    </View>
  );
}

export default ProfileNavigator;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  buttonsContainer: {
    width: "60%",
    flexDirection: "row",
  },
});
