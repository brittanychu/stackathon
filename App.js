/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';
import styles from './stylesheet';
import ImagePicker from 'react-native-image-picker';
import Clarifai from 'clarifai';
import apiKey from './secrets'

const app = new Clarifai.App({
  apiKey: apiKey
});
process.nextTick = setImmediate;

const options = {
  title: 'Select an Image',
  storageOptions: {
    skipBackup: true,
  },
  maxWidth: 480
};

type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super();
    this.state = { 
      imageSource: 'https://community.clarifai.com/uploads/default/_emoji/clarifai.png',
      tagText: ''
    };

  }

  selectImage() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        this.setState({ imageSource: response.uri.replace('file://', '') })
        app.models.predict(Clarifai.GENERAL_MODEL, { base64: response.data }).then(
          (res) => {
            console.log('Clarifai response = ', res);
            let tags = '';
            for (let i = 0; i < res.outputs[0].data.concepts.length; i++) {
              tags += res.outputs[0].data.concepts[i].name + ' ';
            }
            console.log('tags', tags)
            this.setState({ tagText: tags });
          },
          (error) => {
            console.log(error);
          });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>
            Insta-caption
          </Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.instructions}>
            Need a caption?
          </Text>
          <Text style={styles.instructions}>
            Upload your photo to get started! 
          </Text>
        </View>
        <View style={styles.container}>
          <Image
          source={{ uri: this.state.imageSource }}
          style={styles.image}
          />
          <TouchableHighlight onPress={this.selectImage.bind(this)}>
            <Text>Select an image</Text>
          </TouchableHighlight>
          <Text>{this.state.tagText}</Text>
        </View>
        <View style={styles.footer}></View>
      </View>
    );
  }
}
