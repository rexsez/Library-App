import { View, StyleSheet, Pressable, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../Colors";
function Card({ text, onPressed, path, margining, icon }) {
  let iconTag;
  if (!!icon) {
    iconTag = (
      <MaterialCommunityIcons
        name={icon}
        style={[
          styles.cardIcon,
          {
            marginLeft: margining ? margining : 17,
            marginTop: 10,
            marginBottom: -40,
          },
        ]}
        size={90}
        color={"#eddfb4"}
      />
    );
  } else {
    iconTag = (
      <Ionicons
        name={path}
        style={[
          styles.cardIcon,
          {
            marginLeft: margining ? margining : 17,
            marginTop: 10,
            marginBottom: -40,
          },
        ]}
        size={90}
        color={"#eddfb4"}
      />
    );
  }
  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? Colors.primary500 : Colors.primary500,
            opacity: pressed ? 0.5 : 1,
          },
          styles.cardImage,
        ]}
        onPress={onPressed}
      >
        {/* <Image
          style={styles.cardImage}
          source={require("../../../assets/PSU4.png")}
        /> */}
        {iconTag}
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardText}>{text}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Card;

const styles = StyleSheet.create({
  cardImage: {
    width: 130,
    height: 130,
    borderRadius: 20,
    marginLeft: 7,
    borderWidth: 2,
    borderColor: "#eddfb4",
    elevation: 10,
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  cardIcon: {
    width: 130,
    height: 130,
    borderRadius: 20,
    marginLeft: 7,
  },
  cardTextContainer: {
    width: 120,
    height: 30,
    borderRadius: 50,
  },
  cardText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
});
