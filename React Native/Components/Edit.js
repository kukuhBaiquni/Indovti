import React, {Component} from 'react'
import { Container } from 'native-base';
import { Picker, AsyncStorage, TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native';

export default class Edit extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      email: '',
      genre: 'Male',
      phone: '',
      handlePass: '',
    }
  }

  componentDidMount(){
    AsyncStorage.getItem('user', (err, res)=>{
      if (res) {
        var raw = JSON.parse(res)
        this.setState({email: raw.email, handlePass: raw.password, name: raw.name, genre: raw.genre, phone: raw.phone})
      }
    })
  }

  submit(){
    var name = this.state.name;
    var email = this.state.email;
    var genre = this.state.genre;
    var phone = this.state.phone;
    var password = this.state.handlePass;
    var user = {name, email, genre, phone, password}
    AsyncStorage.setItem('user', JSON.stringify(user))
    this.props.navigation.navigate('Home')
  }

  render(){
    return(
      <Container style={{backgroundColor: '#e2e2e2'}}>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Edit Info
          </Text>
          <TextInput style={styles.textInput}
            onChangeText={(e) => this.setState({name: e})}
            placeholder='Name'
            underlineColorAndroid='transparent'
            value={this.state.name}
            />
          <TextInput style={styles.textInput}
            onChangeText={(e) => this.setState({email: e})}
            placeholder='Email'
            underlineColorAndroid='transparent'
            value={this.state.email}
            />
          <Picker
            selectedValue={this.state.genre}
            style={{ height: 50, width: '95%', backgroundColor: '#e0e0e0', borderRadius: 3 }}
            onValueChange={(itemValue, itemIndex) => this.setState({genre: itemValue})}>
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
          <TextInput style={styles.textInput}
            onChangeText={(e) => this.setState({phone: e})}
            placeholder='Phone'
            underlineColorAndroid='transparent'
            value={this.state.phone}
            keyboardType='numeric'
            />
          <TouchableOpacity onPress={this.submit.bind(this)} style={styles.customButton}>
            <Text style={styles.buttonText}>Update</Text>
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
