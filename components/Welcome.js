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
import styles from '../stylesheet';

export default class Welcome extends Component {
  static navigationOptions = { 
    headerStyle: { 
      position: 'absolute', 
      backgroundColor: 'transparent', 
      zIndex: 100, 
      top: 0, 
      left: 0, 
      right: 0 
    } 
  };

  render () {
    const { navigate } = this.props.navigation
    return (
      <ImageBackground source={require('../images/PhotoApr172C74524PM.jpg')} style={styles.backgroundImage}>
      <View style={styles.homeContainer}>
        <Text style={styles.logo}>
          Subtitle
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Get Started"
            onPress={()=> navigate('Image')}
            color="#ffffff"
          />
        </View>
        </View>
      </ImageBackground>
    )
  }
}