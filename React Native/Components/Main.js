import React, {Component} from 'react';
import {View} from 'react-native';
import Login from './Login';
import {connect} from 'react-redux'

class Main extends Component {
  render(){
    return(
      <Login />
    )
  }
}

function mapStateToProps(state){
  return{
    reducer: state
  }
}

export default connect(mapStateToProps)(Main)
