import React, { Component } from 'react';
import { Container } from 'native-base';
import { AsyncStorage, TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native';
import validatejs from 'validate.js'
import {validator} from '../config/validator'
import {init} from '../actions/sagas'
import HomePage from './HomePage';
import {connect} from 'react-redux'
import {MainPage} from '../config/router'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailE: false,
      passwordE: false,
      login: false
    };
  }

  submit(){
    var validation = {
      from: {
        email: true
      },
      pass: {
        length: {
          minimum: 5,
        }
      }
    }
    var emailCheck = validator(validatejs({from: this.state.email}, validation))
    var passwordCheck = validator(validatejs({pass: this.state.password}, validation))
    if (!emailCheck) {
      this.setState({emailE: true})
    }else{
      this.setState({emailE: false})
    }
    if (!passwordCheck) {
      this.setState({passwordE: true})
    }else{
      this.setState({passwordE: false})
    }

    if (emailCheck && passwordCheck) {
      AsyncStorage.removeItem('user')
      AsyncStorage.removeItem('data')
      var email = this.state.email;
      var password = this.state.password;
      e = email;
      p = password;
      var user = {email: e, password: p}
      this.props.dispatch(init(email, password))
      AsyncStorage.setItem('user', JSON.stringify(user))
      this.timer = setInterval(
        ()=> this.tick(), 1000
      )
      this.setState({
        email: '',
        password: '',
        emailE: false,
        passwordE: false
      })
    }
  }

  tick(){
    if (this.props.status.userLogin) {
      this.setState({login: true})
      clearInterval(this.timer)
    }
  }

  render() {
    if (this.state.login) {
      return(<MainPage />)
    }else{
      return(
        <Container style={{backgroundColor: '#e2e2e2'}}>
          <View style={styles.container}>
            <Text style={styles.welcome}>
              Login
            </Text>
            <TextInput style={styles.textInput}
              onChangeText={(e) => this.setState({email: e})}
              placeholder='Email'
              underlineColorAndroid='transparent'
              textContentType='emailAddress' keyboardType='email-address'
              value={this.state.email}
              />
            {this.state.emailE ? <Text style={{color: 'red'}}>Email Invalid</Text> : null}
            <TextInput style={styles.textInput}
              onChangeText={(e) => this.setState({password: e})}
              placeholder='Password'
              underlineColorAndroid='transparent'
              secureTextEntry={true}
              maxLength={12}
              value={this.state.password}
              />
            {this.state.passwordE ? <Text style={{color: 'red'}}>Minimum 5 characters</Text> : null}
            <TouchableOpacity onPress={this.submit.bind(this)} style={styles.customButton}>
              <Text style={styles.buttonText}>Masuk</Text>
            </TouchableOpacity>
          </View>
        </Container>
      )
    }
  }
}

function mapDispatchToProps(dispatch){
  return dispatch
}

export default connect(
  mapDispatchToProps
)(Login)

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
