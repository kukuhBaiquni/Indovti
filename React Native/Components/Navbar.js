import React, { Component } from 'react';
import {StyleSheet, View, Text} from 'react-native'
import { Container, Header, Body, Title } from 'native-base';

export default class Navbar extends Component {
  render() {
    return (
      <View style={{backgroundColor: '#4d2e9b', height: 80}}>
        <Text style={styles.headerTitle}>Indovti App</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 23,
    paddingTop: 40,
    paddingLeft: 10,
    color: 'white',
  }
})
