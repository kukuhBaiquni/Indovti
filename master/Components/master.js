import React, {Component} from 'react'
import {StyleSheet, TextInput, TouchableOpacity, View, Text, ScrollView} from 'react-native'
import Expo from 'expo'

export default class Master extends Component{
  constructor(props){
    super(props)
    this.state = {
      kata: '',
      array: [],
      loading: true
    }
  }

  async componentWillMount() {
      await Expo.Font.loadAsync({
        'kinkeefont': require('native-base/Fonts/kinkeefont.ttf'),
      });
      this.setState({loading: false})
    }

  sentuh(){
    let content = this.state.kata
    this.state.array.unshift(content)
    this.setState({
      kata: ''
    })
  }

  render(){
    let mister = this.state.array.map(function(x,i){
      return(
        <View key={i}>
          <Text style={{fontSize: 20, fontFamily: 'kinkeefont', color: 'red'}}>
            {x}
          </Text>
        </View>
      )
    })
    if(this.state.loading){
      return <Expo.AppLoading />
    }
    return(
      <ScrollView>
        <View style={styles.container}>
        <TextInput style={{width: 300, height: 40, fontFamily: 'kinkeefont'}} value={this.state.kata} onChangeText={(text)=>this.setState({kata: text})} />
        <TouchableOpacity style={{borderWidth: 1, borderColor: 'black', borderStyle: 'solid', width: 150, height: 40, justifyContent: 'center', backgroundColor: 'yellow', alignItems: 'center', borderRadius: 20}} onPress={this.sentuh.bind(this)}>
          <Text style={{fontFamily: 'kinkeefont', fontSize: 17}}>
            Click
          </Text>
        </TouchableOpacity>
          {
            mister
          }
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100
  },
});
