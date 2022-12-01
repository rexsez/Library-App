import React, { useState , useContext} from "react";
import {  Modal, StyleSheet, Text, Pressable, View, ImageBackground, Image } from "react-native";
import { StudentContext } from "../store/StudentContext";


import axios from "axios";
import Announcement from "../models/Announcement";
const database =
  "https://psu-library-app-default-rtdb.europe-west1.firebasedatabase.app/";
// this method can be used to add new student object to students object
// each new student object has a unique key generated by default by firebase




export async function getAnnouncements() {
    // basically await waits for the promise to happen. ---> returns a promise ....
    const response = await axios.get(database + "announcements.json");
    //.get returns the students object, which we will turn into an array.
    // this object has key generated by firebase as the key, and individual students objects
    // as values associated with the key.
    let announcements;
    for (const key in response.data) {
      const announcementsData = response.data[key];
      const announcement = new Announcement(
        announcementsData.everyone,
        announcementsData.staff,
        announcementsData.students,
      );
      announcements = announcement;
    }
    return announcements;
  }

function Announcements() {    
    const Context = useContext(StudentContext);

    async function onPressAnnoucement(){
        setModalVisible(true);
        const Annoucne = await getAnnouncements();

        if (!!!Context.student.Email ) { // if Email doesn't exist 
            setModalAnnouncement(Annoucne.everyone);
        } 
        else if (!!Context.student.Email && Context.student.Email.search(/\d/g)!=-1 ) { // Regular Expression - Regex
            setModalAnnouncement(Annoucne.students);
        } 
        else {
            setModalAnnouncement(Annoucne.staff);
        }
    }

    const [modalAnnouncement, setModalAnnouncement] = useState("")
    const [modalVisible, setModalVisible] = useState(false);


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
                        <Text>
                        {modalAnnouncement}
                        </Text>
                        <Pressable
                            style={({ pressed }) => [
                                {
                                    backgroundColor: pressed
                                        ? '#8aabdd'
                                        : '#366EA0'
                                },
                                styles.button
                            ]}
                            onPress={() => {
                                setModalVisible(!modalVisible)
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
                            backgroundColor: pressed
                                ? '#8aabdd'
                                : '#366EA0'
                        },
                        styles.button
                    ]}
                    onPress={
                        onPressAnnoucement
                    }
                >

                    {/* <ImageBackground
                        style={styles.ImageBackground}
                        source={require("../assets/logoNew2.png")}
                        resizeMode="cover"
                    > */}
                    <Text style={[styles.textStyleAnnouncements]}>
                        Announcements
                    </Text>
                </Pressable>

            </View>
        </View>

    );

};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        marginTop: 20
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
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
        borderStyle: 'solid',
        borderWidth: 3,
        borderColor: 'black'
    },
    button: {
        borderRadius: 15,
        padding: 15,
        elevation: 5,
        paddingHorizontal: 31,
    },
    textStyleAnnouncements: {
        color: "white",
        fontWeight: '900',
        textAlign: "center",
        letterSpacing: 1.5,

    },
    textStyleClose: {
        color: "white",
        fontWeight: '900',
        textAlign: "center",
        letterSpacing: 0.5,

    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: '700',
    },
    announcementMainText: {
        fontFamily: 'monospace',
        fontSize: 24,
        fontWeight: "bold",
        color: '#366EA0',
        paddingBottom: 30,
    },

    // 0191ba <-- this is a color from the background picture it
    // ImageBackground: {
    // flex: 1,   },
    // opacityText: {
    //     opacity: 0.5,

    // },
});

export default Announcements;



// function readAnnouncements() {

//     getDoc(doc(db, "announcements", '-NI7PLO1X4feyQdFPBEh')).then(docData => { 
//     // Data saved successfully!
    
//     if (docData.exists()) {
//       // console.log(docData.data());
//       setModalAnnouncement(docData.data().modalAnnouncement);

//     } else {
//        console.log('No such a data!');
//     }

//   }).catch((error) => {
//         // The write failed...
//         console.log(error);
//   })
//   }