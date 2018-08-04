import React, {Component} from 'react'
import {SERVER_URL} from '../config'
import moment from 'moment'
import { Card, Button } from 'react-native-elements'
import {View, StyleSheet, Text} from 'react-native'

export default class ActualContent extends Component{

  render(){
    let data = this.props.data
    return(
      <View>
        {
          data.map((x, i)=>{
            return(
              <Card
                key={i}
                title={x.namaresep}
                titleStyle={{color: '#4d2e9b', fontSize: 18, fontFamily: 'kinkeefont'}}>
                <Text style={{marginBottom: 10}}>
                  The idea with React Native Elements is more about component structure than actual design.
                </Text>
                <Button
                  backgroundColor='#4d2e9b'
                  buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                  title='Lihat Detail'
                  onPress={() => this.props.navigation.navigate('ResepDetails', x)}
                  />
              </Card>
            )
          })
        }
      </View>
    )
  }
}
