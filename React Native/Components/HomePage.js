import React, {Component} from 'react'
import {AsyncStorage, ScrollView, Text, TouchableOpacity, View, StyleSheet, Button} from 'react-native'
import {Spinner} from 'native-base'
import ActualContent from './ActualContent'
import {SERVER_URL} from '../config'
import moment from 'moment'
import { ListItem } from 'react-native-elements'
import TimeAgo from 'react-native-timeago'
import Navbar from './Navbar'

export default class HomePage extends Component{
  constructor(props){
    super(props)
    this.state = {
      page: 'dashboard',
      data: []
    }
  }

  componentDidMount(){
    this.timer = setInterval(
      ()=> this.tick(), 1000
    )
  }

  tick(){
    AsyncStorage.getItem('data', (err, res) => {
      if (res) {
        this.setState({data: JSON.parse(res)})
      }
    })
  }

  render(){
    return(
      <ScrollView style={styles.containter}>
        <Text style={styles.title}>Dashboard</Text>
        <View style={styles.menu}>
          <TouchableOpacity onPress={()=> this.props.navigation.navigate('Add')} style={styles.customButton}>
            <Text style={styles.buttonText}>add food</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.props.navigation.navigate('Edit')} style={styles.customButton}>
            <Text style={styles.buttonText}>edit info</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.props.navigation.navigate('Search')} style={styles.customButton}>
            <Text style={styles.buttonText}>search</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>My Favorite Food</Text>
        <View style={styles.dataContainer}>
          {
            this.state.data.map((x, i)=>
            <View key={i} style={styles.listdata}>
              <Text style={styles.titledata}>{x.food}</Text>
              <Text style={styles.descdata}>{x.date}</Text>
              <Text style={styles.descdata}>{x.desc}</Text>
            </View>
          )
        }
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#e2e2e2',
    padding: 16,
    paddingTop: 32
  },
  welcome: {
    fontSize: 22,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    color: '#4d2e9b'
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#4d2e9b',
    paddingTop: 20,
  },
  customButton: {
    marginLeft: 10,
    backgroundColor: '#4d2e9b',
    height: 50,
    marginTop: 10,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'white',
  },
  buttonText: {
    alignItems: 'center',
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold'
  },
  dataContainer: {
    width: '100%',
    height: 'auto',
    marginTop: 20,
  },
  listdata: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    height: 'auto',
    width: 'auto',
  },
  titledata: {
    color: '#4d2e9b',
    fontSize: 15,
    fontWeight: 'bold',
  },
  descdata: {
    color: 'gray',
    fontSize: 11,
  },
  menu: {
    flex: 1,
    flexDirection: 'row'
  }
})
