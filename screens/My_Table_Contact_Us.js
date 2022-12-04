import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

export default class My_Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Name', 'Position', 'Phone Ext.'],
      tableData: [
        ['Dr. Osama Mohamed', 'Director, Central Library - Men Campus', '8120'],
        ['Ms. Ohoud Al-Robayain', 'Director, Central Library - Campus for Women', '8393'],
        ['Mr. Abid Iqbal Abid', 'Foreign Information Resources Management & Development Librarian', '8583'],
        ['Mr. Saleh Albridi', 'E-Books Organizer', '8132'],
        ['Mr. Sam M. Ibrahim', 'Arabic Information Resources Organizer, Management Development', '8584'],
        ['Mr. Shakil Ahmad', 'Research Services & Web Librarian', '8505'],
        ['Mr. Mohammed Mana Almani', 'Librarian', '8743'],
        ['Mr. Abdulrahman Aldakhil', 'Librarian', '8513'],
        ['Ms. Lanie Klinkner', 'Assistant Director- Foreign Information Resources Management & Development Librarian & Research Services', '8794'],
        ['Ms. Arwa M. Jobran', 'Digital Media Specialist', '8741'],
        ['Ms. Hala Talal Al-Sadoun', 'Arabic Information Resources Organizer, Management Development & Book Club Coordinator', '8439'],
        ['Ms. Nouf Al-Mousa', 'IT Administrative, Social Media Administrator', '8735'],
        ['Ms. Nouf AlJuraywi', 'Translation Specialist, Web Content Coordinator', '8734'],
        ['Ms. Lamyaa A. Gooda', 'Library Assistant', '8736'],
        ['Ms. Abeer Bin Oiadah', 'Library Assistant', '8736'],

      ]
    }
  }



  render() {
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>button</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <Table borderStyle={{borderColor: 'transparent'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.headerText}/>
          {
            state.tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { paddingTop: 15, backgroundColor: '#f5f5f5' },
  head: { height: 40, backgroundColor: '#808B97' },
  headerText:{ fontWeight: 'bold', fontSize: 15 },
  text: { margin: 6 ,   },
  row: { flexDirection: 'row', backgroundColor: '#f5f5f5' },
});