import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { useContext, useEffect, useState } from "react";

import { StudentContext } from "../store/StudentContext";
import Card from "../components/Utility/Cards/Card";
import Announcements from "./Announcements";
import { AppContext } from "../store/AppContext";
import { fetchBooks, fetchCategories } from "../components/Utility/http";
import Colors from "../components/Utility/Colors";
import { isFined } from "../components/Utility/UtilityFunctions";
import PaymentNotification from "../components/Utility/PaymentNotification";

function HomeScreen() {
  const navigation = useNavigation();
  const appCtx = useContext(AppContext);
  const studentCtx = useContext(StudentContext);
  function GoTo(stackName) {
    if (stackName == "DrawerProfile") {
      appCtx.changeScreenHandler("Profile");
    }
    if (stackName == "TabSearch") {
      appCtx.changeScreenHandler("Search");
    }
    if (stackName == "StackAdd") {
      navigation.navigate(stackName, { bookId: "" });
    } else {
      return navigation.navigate({ name: stackName });
    }
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
  const iconBarButtons = [];
  const [isPress, setIsPress] = useState(false);
  let component = <View></View>;
  let extraCards = <></>;
  if (isPress) {
    component = (
      <PaymentNotification
        onPressCancel={setIsPress.bind(this, false)}
      ></PaymentNotification>
    );
  }
  if (!!studentCtx.student.Email) {
    extraCards = (
      <View style={[styles.rowContainer, { marginTop: -20 }]}>
        <Card
          text="Scan Book"
          onPressed={GoTo.bind(this, "StackBarcode")}
          path="barcode-outline"
          color={Colors.primary500}
          margining={22}
        ></Card>
        <Card
          text="Request Book"
          onPressed={GoTo.bind(this, "StackAdd")}
          icon="book-plus-outline"
          color={Colors.primary500}
        ></Card>
      </View>
    );
    //add fine button if their is a fine
    if (isFined(studentCtx)) {
      iconBarButtons.push(
        <>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "darkred" : "darkred",
                opacity: pressed ? 0.5 : 1,
              },
              styles.fineButton,
            ]}
            onPress={setIsPress.bind(this, true)}
          >
            <Text style={styles.textStyleFine}>Checkout Fines</Text>
          </Pressable>
        </>
      );
    }
  }

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
            {iconBarButtons}
            {component}
            <Announcements />
            <View style={styles.rowContainer}>
              <Card
                text="Search Books"
                onPressed={GoTo.bind(this, "TabSearch")}
                path="search"
                color={Colors.primary500}
              ></Card>
              <Card
                text={!!studentCtx.student.Email ? "Profile" : "Account"}
                onPressed={GoTo.bind(this, "DrawerProfile")}
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
            {extraCards}
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
  fineButton: {
    borderRadius: 15,
    padding: 15,
    elevation: 5,
    paddingHorizontal: 30,
    marginHorizontal: 60,
    borderWidth: 2,
    borderColor: "#eddfb4",
  },
  textStyleFine: {
    color: "white",
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 1.5,
  },
});
