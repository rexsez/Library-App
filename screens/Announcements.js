import { useState, useContext, useEffect } from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import Colors from "../components/Utility/Colors";
import { fetchAnnouncements } from "../components/Utility/http";
import { StudentContext } from "../store/StudentContext";

function Announcements() {
  const Context = useContext(StudentContext);
  const [modalAnnouncement, setModalAnnouncement] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [fetchedAnnouncement, setFetchedAnnouncement] = useState();

  useEffect(() => {
    async function getAnnouncements() {
      const Announcement = await fetchAnnouncements();
      setFetchedAnnouncement(Announcement);
    }
    getAnnouncements();
  }, []);

  function onPressAnnouncement() {
    setModalVisible(true);
    if (!!!Context.student.Email) {
      // if Email doesn't exist
      setModalAnnouncement(fetchedAnnouncement.everyone);
    } else if (
      !!Context.student.Email &&
      Context.student.Email.search(/\d/g) != -1
    ) {
      // Regular Expression - Regex
      setModalAnnouncement(fetchedAnnouncement.students);
    } else {
      setModalAnnouncement(fetchedAnnouncement.staff);
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
            <Text>{modalAnnouncement}</Text>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#8aabdd" : Colors.primary500,
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
    margin: 25,
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "700",
  },
  announcementMainText: {
    // fontFamily: "monospace",
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary500,
    paddingBottom: 30,
  },
});

export default Announcements;
