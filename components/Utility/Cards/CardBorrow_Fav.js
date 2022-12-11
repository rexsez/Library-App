import { View, StyleSheet, Pressable, Image, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
function CardBorrow_Fav({ text, onPressed, path, color }) {
  return (
    <View style={styles.wew}>
      <Pressable style={({ pressed }) => [
        // backgroundColor : pressed ? 'white' : 'white',
        // opacity: pressed ? 0.5 : 1,
        pressed ? {...styles.pressedDesign} : {...styles.unPressedDesign},
        styles.cardImage,
      ]} onPress={onPressed}>
        {/* <Image
          style={styles.cardImage}
          source={require("../../../assets/PSU4.png")}
        /> */}
        <Ionicons
          name={path}
          style={[styles.cardIcon]}
          size={60}
          color={'#0593bb'}
        />
        {/* <View style={styles.cardTextContainer}>
          <Text style={styles.cardText}>{text}</Text>
        </View> */}
      </Pressable>
    </View>
  );
}

export default CardBorrow_Fav;

const styles = StyleSheet.create({
  cardImage: {
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginLeft: 7,
    borderBottomWidth: 5,
    borderColor: '#0593bb',
    // elevation: 10,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 1,
    // shadowRadius: 5,
  },
  cardIcon: {
    width: '100%',
    
    // alignContent: 'center',
    // justifyContent: 'center',
    // alignItems:'center',
    // alignSelf:'center',

  },
  // cardTextContainer: {
  //   width: 120,
  //   height: 30,
  //   borderRadius: 50,

  // },
  // cardText: {
  //   textAlign: "center",
  //   fontWeight: "bold",
  //   color: 'white',
  //   marginLeft: 10,

  // },
  unPressedDesign:{
    backgroundColor: 'white',
  },
  pressedDesign:{
    backgroundColor: 'white',
    opacity: 0.5,
  },
});
