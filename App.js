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
  Button,
  Image
} from 'react-native';
import styles from './stylesheet';
import ImagePicker from 'react-native-image-picker';
import Clarifai from 'clarifai';
import {clarifaiApiKey, musixmatchApiKey} from './secrets';
import Musixmatch from 'musixmatch-node'

const app = new Clarifai.App({
  apiKey: clarifaiApiKey
});
process.nextTick = setImmediate;

const mxm = new Musixmatch(musixmatchApiKey);
console.log('mxm', mxm)

const options = {
  title: 'Select an Image',
  storageOptions: {
    skipBackup: true,
  },
  maxWidth: 480
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super();
    this.state = { 
      imageSource: 'https://community.clarifai.com/uploads/default/_emoji/clarifai.png',
      tagText: [],
      selectedTag: '',
      lyricText: ''
    };
    this.selectImage = this.selectImage.bind(this);
    this.lyricSearch = this.lyricSearch.bind(this);
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
            let tags = [];
            // for (let i = 0; i < res.outputs[0].data.concepts.length; i++) {
            //   tags += res.outputs[0].data.concepts[i].name + ' ';
            // }
            for (let i = 0; i < res.outputs[0].data.concepts.length; i++) {
              tags.push(res.outputs[0].data.concepts[i].name)
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

  lyricSearch(tag, evt){
    mxm.searchTrack({q: tag})
      .then(res => {
        const index = getRandomInt(res.message.body.track_list.length)
        const trackId = res.message.body.track_list[index].track.track_id
        
      })
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
          <Button 
            onPress={this.selectImage} 
            title="Select an image"
          />
          <Text>{this.state.tagText.map((tag, i) => {
            return (
              <Button
              onPress={()=> this.lyricSearch(tag)}
              key={i} 
              title={tag}
              />
            )
          })}</Text>
          <Text>{this.state.lyricText}</Text>
        </View>
        <View style={styles.footer}></View>
      </View>
    );
  }
}
