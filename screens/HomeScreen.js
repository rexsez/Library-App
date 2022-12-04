import { View, StyleSheet } from "react-native";
import Title from "../components/Title";
import SearchCard from "../components/Utlity/Cards/SearchCard";
import ProfileCard from "../components/Utlity/Cards/ProfileCard";
import ContactUsCard from "../components/Utlity/Cards/ContactUsCard";
import StatisticsCard from "../components/Utlity/Cards/StatisticsCard";
import { useNavigation } from "@react-navigation/native";
import Announcements from "./Announcements";
function HomeScreen() {
  const navigation = useNavigation();
  function GoToSearch() {
    return navigation.navigate({ name: "TabSearch" });
  }
  function GoToProfile() {
    return navigation.navigate({ name: "TabProfile" });
  }
  function GoToContactUs() {
    return navigation.navigate({ name: "StackContact" });
  }
  return (
    <View style={styles.container}>
      <Title>Home</Title>
      <Announcements />
      <View style={styles.cardContainer}>
        <View style={styles.rowContainer}>
          <SearchCard text="Search" onPressed={GoToSearch}></SearchCard>
          <ProfileCard text="Profile" onPressed={GoToProfile}></ProfileCard>
        </View>
        <View style={styles.rowContainer}>
          <ContactUsCard
            text="Contact Us"
            onPressed={GoToContactUs}
          ></ContactUsCard>
          <StatisticsCard text="Statistics"></StatisticsCard>
        </View>
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  cardContainer: {
    padding: 30,
    paddingTop: 100,
  },
  rowContainer: {
    flexDirection: "row",
    paddingVertical: 30,
    justifyContent: "space-around",
  },
});
