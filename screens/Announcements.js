import { useState, useContext, useEffect } from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { fetchAnnouncements } from "../components/Utility/http";
import { StudentContext } from "../store/StudentContext";
import  Colors  from "../components/Utility/Colors";
function Announcements() {
  const Context = useContext(StudentContext);
  const [modalAnnouncement, setModalAnnouncement] = useState("");
  const [modalWorkingHours, setModalWorkingHours] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [fetchedAnnouncement, setFetchedAnnouncement] = useState();

  useEffect(() => {
    async function getAnnouncements() {
      const Announcement = await fetchAnnouncements();
      setFetchedAnnouncement(Announcement);
      setModalWorkingHours(Announcement);
    }
    getAnnouncements();
  }, []);

  function onPressAnnouncement() {
    
    setModalVisible(true);
    if (!!!Context.student.Email) {
      // if Email doesn't exist
      setModalWorkingHours(fetchedAnnouncement.workingHours);
      setModalAnnouncement(fetchedAnnouncement.everyone);
    } else if (
      !!Context.student.Email &&
      Context.student.Email.search(/\d/g) != -1
    ) {
      // Regular Expression - Regex
      setModalWorkingHours(fetchedAnnouncement.workingHours);
      setModalAnnouncement(fetchedAnnouncement.students + "\n" + fetchedAnnouncement.everyone);
    } else {
     setModalWorkingHours(fetchedAnnouncement.workingHours);
      setModalAnnouncement(fetchedAnnouncement.staff + "\n" + fetchedAnnouncement.everyone);
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
            <Text style={styles.modalWorkingHoursText}>{modalWorkingHours}</Text>
            <View style={styles.devidor}></View> 
            <Text style={styles.modalAnnouncementText}>{modalAnnouncement}</Text>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#8aabdd" : Colors.primary500 ,
                },
                styles.button,
              ]}
              onPress={() => {
                setModalVisible(!modalVisible);
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
              backgroundColor: pressed ?  "#8aabdd" : Colors.primary500 ,
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
    marginVertical:10,
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
    borderColor: '#eddfb4',
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
    borderColor: 'black',
    margin: 10,
},
});

export default Announcements;