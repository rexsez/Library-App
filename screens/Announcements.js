// Hisham start
import { useState, useContext, useEffect, useReducer } from "react";
// Hisham close
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { fetchAnnouncements } from "../components/Utility/http";
import { StudentContext } from "../store/StudentContext";
// Hisham start
import Colors from "../components/Utility/Colors";
// Hisham close
function Announcements() {
  const Context = useContext(StudentContext);
  const [modalAnnouncement, setModalAnnouncement] = useState("");
  const [modalWorkingHours, setModalWorkingHours] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [fetchedAnnouncement, setFetchedAnnouncement] = useState();
  // Hisham start
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  // Hisham close

  useEffect(() => {
    async function getAnnouncements() {
      const Announcement = await fetchAnnouncements();
      setFetchedAnnouncement(Announcement);
      setModalWorkingHours(Announcement);
    }
    getAnnouncements();
    // Hisham start
  }, [ignored]);
  // Hisham close

  function onPressAnnouncement() {
    setModalVisible(true);
    if (!!!Context.student.Email) {
      // if Email doesn't exist
      setModalWorkingHours(fetchedAnnouncement.workingHours);
      // Hisham start
      setModalAnnouncement(
        fetchedAnnouncement.everyone
          ? fetchedAnnouncement.everyone
          : "There is no announcements for everyone"
      );
      // If the email is for students
      // Hisham close
    } else if (
      !!Context.student.Email &&
      Context.student.Email.search(/\d/g) != -1
    ) {
      // Hisham start
      var announce = fetchedAnnouncement.students
        ? fetchedAnnouncement.students
        : "There is no announcement for students";
      announce =
        fetchedAnnouncement.everyone != undefined
          ? announce + "\n" + fetchedAnnouncement.everyone
          : announce + "\n" + "There is no announcement for everyone";
      // Hisahm start
      setModalWorkingHours(fetchedAnnouncement.workingHours);
      // Hisahm start
      setModalAnnouncement(announce);
      // If the email is for staff
      // Hisham close
    } else {
      // Hisham start
      var announce = fetchedAnnouncement.staff
        ? fetchedAnnouncement.staff
        : "There is no announcement for staff";
      announce =
        fetchedAnnouncement.everyone != undefined
          ? announce + "\n" + fetchedAnnouncement.everyone
          : announce + "\n" + "There is no announcement for everyone";
      // Hisham close
      setModalWorkingHours(fetchedAnnouncement.workingHours);
      // Hisham start
      setModalAnnouncement(announce);
      // Hisahm close
    }
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.announcementMainText}> Announcements </Text>
            <Text style={styles.modalWorkingHoursText}>Working Hours</Text>
            <Text style={styles.modalWorkingHoursText}>
              {modalWorkingHours}
            </Text>
            <View style={styles.devidor}></View>
            <Text style={styles.modalAnnouncementText}>
              {modalAnnouncement}
            </Text>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#8aabdd" : Colors.primary500,
                },
                styles.button,
              ]}
              onPress={() => {
                setModalVisible(!modalVisible);
                // Hisham start
                forceUpdate();
                // Hisham close
              }}
            >
              <Text style={styles.textStyleClose}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#8aabdd" : Colors.primary500,
            },
            styles.button,
          ]}
          onPress={onPressAnnouncement}
        >
          <Text style={styles.textStyleAnnouncements}>Announcements</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    marginHorizontal: 25,
    marginVertical: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "whitesmoke",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: "black",
  },
  button: {
    borderRadius: 15,
    padding: 15,
    elevation: 5,
    paddingHorizontal: 31,
    borderWidth: 2,
    borderColor: "#eddfb4",
  },
  textStyleAnnouncements: {
    color: "white",
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 1.5,
  },
  textStyleClose: {
    color: "white",
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  modalWorkingHoursText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "700",
    color: "#ec9c2d",
  },
  modalAnnouncementText: {
    fontSize: 16,
    marginBottom: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  announcementMainText: {
    // fontFamily: "monospace",
    fontSize: 24,
    fontWeight: "bold",
    color: "#366EA0",
    paddingBottom: 30,
  },
  devidor: {
    borderWidth: 0.5,
    borderColor: "black",
    margin: 10,
  },
});

export default Announcements;
