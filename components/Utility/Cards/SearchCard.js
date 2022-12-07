import { View, StyleSheet, Pressable, Image, Text } from "react-native";
function SearchCard({text,onPressed}) {
    return (
        <View>
            <Pressable onPress={onPressed}>
                
                <Image 
                    style={styles.cardImage}
                    source={{uri:"https://icons.veryicon.com/png/o/miscellaneous/black-yellow-linear-simple-icon/search-418.png "}}
                />

                <View style={styles.cardTextContainer}>
                    <Text style={styles.cardText}>{text}</Text>
                </View>

            </Pressable>
        </View>
         
      );
}

export default SearchCard;

const styles = StyleSheet.create({
    cardImage: {
      width: 120,
      height: 120,
      borderTopRightRadius : 10,
      borderTopLeftRadius : 10,
      backgroundColor: "lightblue",
    },
    cardTextContainer:{
      width: 120,
      height: 30,
      padding: 5,
      backgroundColor: "grey",
      borderBottomLeftRadius : 10,
      borderBottomRightRadius: 10,
    },
    cardText: {
       textAlign:"center",
       fontWeight: "bold",
       color:"white",
    }
  });