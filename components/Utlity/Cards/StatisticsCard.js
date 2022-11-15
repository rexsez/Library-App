import { View, StyleSheet, Pressable, Image, Text } from "react-native";
function StatisticsCard({text,onPressed}) {
    return (
        <View>
            <Pressable onPress={onPressed}>
                
                <Image 
                    style={styles.cardImage}
                    source={{uri:"https://cdn-icons-png.flaticon.com/128/7567/7567319.png "}}
                />

                <View style={styles.cardTextContainer}>
                    <Text style={styles.cardText}>{text}</Text>
                </View>

            </Pressable>
        </View>
         
      );
}

export default StatisticsCard;

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