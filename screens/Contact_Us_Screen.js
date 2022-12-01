import React from "react";
import { ImageBackground, View, StyleSheet, SafeAreaView, ScrollView, Text, Image, Linking } from "react-native";
import Announcements from "./Announcements";

import My_Table from "./My_Table_Contact_Us";


function Contact_Us_Screen() {
    return (


        <SafeAreaView style={styles.Container}>
            <View style={styles.Container}>

                <ImageBackground
                    style={styles.ImageBackground}
                    source={require("../assets/logoNew2.png")}
                    resizeMode="cover"
                >
                    <View style={styles.scrollViewContactUs}>
                        <ScrollView>
                            <Announcements></Announcements>
                            <View style={{ borderBottomWidth: 2, borderColor: 'gray' }}>
                                <Text style={[styles.bannerText, { textAlign: 'center' }]}>
                                    Men Campus
                                </Text>
                                <Image
                                    style={{
                                        resizeMode: 'contain',
                                        height: 250,
                                        width: 350,
                                        marginLeft: 5,
                                        borderRadius: 10,
                                    }}
                                    source={require("../assets/Library_Contact_Us.png")}
                                />
                                <Text style={styles.text}>
                                    <Text style={styles.headText}>
                                        - Send us email at:
                                    </Text>
                                    <Text
                                        style={styles.hyperlinkStyle}
                                        onPress={() => {
                                            Linking.openURL('https://mail.google.com/');
                                        }}>
                                        library@psu.edu.sa
                                    </Text>
                                </Text>
                                <Text style={styles.text}>
                                    <Text style={styles.headText}>
                                        - Visit us in person:
                                    </Text>
                                    1st Floor PSU Men's College Main Building (beside the Mosque)
                                </Text>
                                <Text style={styles.headText}>
                                    - Address:
                                </Text>
                                <Text style={styles.text}>
                                    Prince Sultan University, P.O.Box No. 66833, Rafha Street, Riyadh 11586. Saudi Arabia.
                                    Tel : +966-1-494-8120| Fax: +966-1-454-8317
                                </Text>
                                <Text style={[styles.text, { marginBottom: 10 }]}>
                                    Email:
                                    <Text
                                        style={styles.hyperlinkStyle}
                                        onPress={() => {
                                            Linking.openURL('https://mail.google.com/');
                                        }}>
                                        omohamed@psu.edu.sa
                                    </Text>
                                </Text>
                            </View>

                            {/* <View style={styles.devidor}></View>DEVIDOR : LINE Between text (<hr> in html) */}

                            <View style={{ borderBottomWidth: 2, borderColor: 'gray' }}>
                                <Text style={[styles.bannerText, { marginTop: 20, textAlign: 'center' }]}>
                                    Women Campus
                                </Text>
                                <Image
                                    style={{
                                        resizeMode: 'contain',
                                        height: 250,
                                        width: 350,
                                        marginLeft: 5,
                                        marginTop: 20,
                                        borderRadius: 10,

                                    }}
                                    source={require("../assets/Library_Contact_Us_2.png")}
                                />
                                <Text style={styles.text}>
                                    <Text style={styles.headText}>
                                        - Visit us in person:
                                    </Text>
                                    1st Floor PSU Women's Campus Building #1
                                </Text>
                                <Text style={styles.headText}>
                                    - Address:
                                </Text>
                                <Text style={styles.text}>
                                    Prince Sultan University, P.O.Box No. 66833, Rafha Street, Riyadh 11586. Saudi Arabia.

                                </Text>
                                <Text style={[styles.text, { marginBottom: 10 }]}>
                                    Email:
                                    <Text
                                        style={styles.hyperlinkStyle}
                                        onPress={() => {
                                            Linking.openURL('https://mail.google.com/');
                                        }}>
                                        library_CW@psu.edu.sa
                                    </Text>
                                </Text>
                            </View>

                            {/* <View style={styles.devidor}></View>DEVIDOR : LINE Between text (<hr> in html) */}

                            <Text style={[styles.bannerText, { marginTop: 20, textAlign: 'center' }]}>
                                Staff Directory
                            </Text>

                            <My_Table>

                            </My_Table>

                        </ScrollView>
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    )
}




const styles = StyleSheet.create({

    Container: {
        flex: 1,

    },
    ImageBackground: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,


    },
    scrollViewContactUs: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        width: '90%',
        borderColor: '#105EEA',
        borderWidth: 1,
        marginVertical: 20,
        padding: 5,

    },
    bannerText: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#366EA0',
    },
    headText: {
        fontSize: 13,
        fontWeight: "bold",
        color: '#105EEA',
    },
    text: {
        fontSize: 12,
        fontWeight: "bold",
    },
    devidor: {
        borderWidth: 0.5,
        borderColor: 'black',
        margin: 10,
    },
    hyperlinkStyle: {
        color: 'blue',
    },





});
export default Contact_Us_Screen;


