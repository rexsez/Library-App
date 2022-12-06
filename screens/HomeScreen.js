import { View, StyleSheet, ImageBackground } from "react-native";
import Card from "../components/Utlity/Cards/Card";
import { useNavigation } from "@react-navigation/native";
import Announcements from "./Announcements";
import { ScrollView } from "react-native-gesture-handler";

function HomeScreen() {
  const navigation = useNavigation();
  function GoTo(stackName) {
    return navigation.navigate({ name: stackName });
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground
          style={styles.ImageBackground}
          source={require("../assets/logoNew2.png")}
          resizeMode="cover"
        >
          <View style={styles.cardContainer}>
            <Announcements />
            <View style={styles.rowContainer}>
              <Card
                text="Search"
                onPressed={GoTo.bind(this, "TabSearch")}
                path="search"
                color="rgb(130, 196, 217)"
              ></Card>
              <Card
                text="Profile"
                onPressed={GoTo.bind(this, "TabProfile")}
                path="ios-person"
                color="rgb(130, 196, 217)"
              ></Card>
            </View>
            <View style={styles.rowContainer}>
              <Card
                text="Contact Us"
                onPressed={GoTo.bind(this, "StackContact")}
                path="md-call-sharp"
                color="rgb(130, 196, 217)"
              ></Card>
              <Card
                text="Statistics"
                onPressed={GoTo.bind(this, "Statistics")}
                path="ios-stats-chart"
                color="rgb(130, 196, 217)"
              ></Card>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    paddingTop: 20,
  },
  cardContainer: {
    padding: 30,
    margin: 10,
    marginTop: 120,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  rowContainer: {
    flexDirection: "row",
    paddingVertical: 30,
    justifyContent: "space-around",
  },
  ImageBackground: {
    flex: 1,
  },
});
