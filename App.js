import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  TouchableHighlight,
  Button,
  Image,
  ImageBackground
} from 'react-native';
import styles from './stylesheet';
import {
  StackNavigator,
} from 'react-navigation';
import WelcomeScreen from './components/Welcome'
import ImageScreen from './components/Image'

export default App = StackNavigator({
  Welcome: { screen: WelcomeScreen },
  Image: { screen: ImageScreen }
}, {
  initialRouteName: 'Welcome'
})
