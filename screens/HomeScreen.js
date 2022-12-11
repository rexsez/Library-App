import { View, StyleSheet, ImageBackground, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { useContext, useEffect } from "react";

import Card from "../components/Utility/Cards/Card";
import Announcements from "./Announcements";
import { AppContext } from "../store/AppContext";
import { fetchBooks, fetchCategories } from "../components/Utility/http";
import Colors from "../components/Utility/Colors";

function HomeScreen() {
  const navigation = useNavigation();
  const appCtx = useContext(AppContext);

  function GoTo(stackName) {
    return navigation.navigate({ name: stackName });
  }
  useEffect(() => {
    async function getBooks() {
      const books = await fetchBooks();
      const categories = await fetchCategories();
      appCtx.changeBooks(books);
      appCtx.changeCategories(categories);
    }
    getBooks();
  }, []);

  return (
    <View style={styles.container}>
      {/* <LinearGradient
      colors={['#2596be', '#76b5c5', '#154c79']}> */}
      <ImageBackground
        style={styles.ImageBackground}
        source={require("../assets/logoNew2.png")}
        resizeMode="cover"
      >
        <ScrollView>
          <View style={styles.cardContainer}>
            <View style={styles.containerWelcomeMessage}>
              <Text style={styles.welcomeMessage}>
                Welcome to PSU Library Application
              </Text>
            </View>
            <Announcements />
            <View style={styles.rowContainer}>
              <Card
                text="Search Books"
                onPressed={GoTo.bind(this, "StackSearch")}
                path="search"
                color={Colors.primary500}
              ></Card>
              <Card
                text="lol: has bug"
                onPressed={GoTo.bind(this, "StackLogin")}
                path="ios-person"
                color={Colors.primary500}
              ></Card>
            </View>
            <View style={[styles.rowContainer, { marginTop: -20 }]}>
              <Card
                text="Contact Us"
                onPressed={GoTo.bind(this, "StackContact")}
                path="md-call-sharp"
                color={Colors.primary500}
              ></Card>
              <Card
                text="Book Statistics"
                onPressed={GoTo.bind(this, "StackStatistics")}
                path="ios-stats-chart"
                color={Colors.primary500}
              ></Card>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
      {/* </LinearGradient> */}
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
    // paddingTop: 150,
    margin: 10,
    marginTop: 135,
    borderWidth: 3,
    borderColor: "black",
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
  welcomeMessage: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#144c84",
  },
  containerWelcomeMessage: {
    alignItems: "center",
  },
});
