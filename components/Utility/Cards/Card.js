import { View, StyleSheet, Pressable, Image, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
function Card({ text, onPressed, path, color }) {
  return (
    <View>
      <Pressable onPress={onPressed}>
        {/* <Image 
                    style={styles.cardImage}
                    source={{uri:path}}
                /> */}
        <Ionicons
          name={path}
          style={styles.cardImage}
          size={120}
          color={color}
        />
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
    width: 120,
    height: 120,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: "white",
  },
  cardTextContainer: {
    width: 120,
    height: 30,
    padding: 5,
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  cardText: {
    textAlign: "center",
    fontWeight: "bold",
  },
});
