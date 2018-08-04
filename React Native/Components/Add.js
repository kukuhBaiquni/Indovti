import React, {Component} from 'react'
import { Container } from 'native-base';
import { AsyncStorage, TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native';
import moment from 'moment'
import {addfood} from '../actions/sagas'

export default class Add extends Component {
  constructor(props){
    super(props)
    this.state = {
      foodname: '',
      description: '',
      data: []
    }
  }

  componentDidMount(){
    AsyncStorage.getItem('data', (err, res)=>{
      if (res) {
        this.setState({data: JSON.parse(res)})
      }
    })
  }

  submit(){
    var f = this.state.foodname;
    var d = this.state.description;
    var date = moment(Date.now()).format('DD MMM \'YY')
    var part = {food: f, desc: d, date: date}
    var data = this.state.data
    data.push(part)
    this.props.dispatch(addfood(data))
    AsyncStorage.setItem('data', JSON.stringify(data))
    this.props.navigation.navigate('Home')
  }

  render(){
    return(
      <Container style={{backgroundColor: '#e2e2e2'}}>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Add Your Favorite Food
          </Text>
          <TextInput style={styles.textInput}
            onChangeText={(e) => this.setState({foodname: e})}
            placeholder='Food Name'
            underlineColorAndroid='transparent'
            value={this.state.foodname}
            />
          <TextInput style={styles.textInput}
            onChangeText={(e) => this.setState({description: e})}
            placeholder='Description'
            underlineColorAndroid='transparent'
            value={this.state.description}
            />
          <TouchableOpacity onPress={this.submit.bind(this)} style={styles.customButton}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Container>
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
  textInput: {
    height: 50,
    backgroundColor: 'white',
    marginTop: 8,
    width: '95%',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 3,
    padding: 8,
    fontSize: 17,
  },
  customButton: {
    backgroundColor: '#4d2e9b',
    height: 50,
    marginTop: 10,
    width: '95%',
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
  }
});
