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
      backgroundColor: '#000000',
    },
    headerTitleStyle: {
      fontFamily: 'Futura'
    }
  }
  render () {
    const { navigate } = this.props.navigation
    return (
      <ImageBackground source={require('../images/PhotoApr172C74524PM.jpg')} style={styles.backgroundImage}>
      <View style={styles.homeContainer}>
        <Text style={styles.logo}>
          Subtitle
        </Text>
        <Button
          title="Get Started"
          onPress={()=> navigate('Image')}
        />
        </View>
      </ImageBackground>
    )
  }
}