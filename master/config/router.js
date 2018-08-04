import React, {Component} from "react";
import { createMaterialTopTabNavigator, createStackNavigator } from "react-navigation";
import {Icon} from 'react-native-elements'
import HomePage from '../Components/HomePage';
import Login from '../Components/Login'
import ResepDetailPage from '../Components/ResepDetailPage'
import Add from '../Components/Add'
import Edit from '../Components/Edit'

export const MainPage = createStackNavigator({
  Home: {
    screen: HomePage,
    navigationOptions: {
      title: 'IndoVTI App',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#4d2e9b',
      }
    }
  },
  Add: {
    screen: Add,
    navigationOptions: ({navigation}) => ({
      title: `Add Food`,
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#4d2e9b',
      }
    })
  },
  Edit: {
    screen: Edit,
    navigationOptions: ({navigation}) => ({
      title: `Edit Info`,
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#4d2e9b',
      }
    })
  },
  Search: {
    screen: ResepDetailPage,
    navigationOptions: ({navigation}) => ({
      title: `Search`,
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#4d2e9b',
      }
    })
  }
})
