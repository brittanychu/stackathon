import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  TouchableHighlight,
  Button,
  Image,
  ImageBackground,
  Clipboard
} from 'react-native';
import styles from '../stylesheet';
import ImagePicker from 'react-native-image-picker';
import Clarifai from 'clarifai';
import { clarifaiApiKey, musixmatchApiKey } from '../secrets';
import Musixmatch from 'musixmatch-node';
import Carousel from 'react-native-carousel';


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

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      imageSource: ' ',
      tagText: [],
      lyricText: '',
    };
    this.selectImage = this.selectImage.bind(this);
    this.lyricSearch = this.lyricSearch.bind(this);
  }

  selectImage() {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        this.setState({ imageSource: response.uri.replace('file://', ''), tagText: [], lyricText: '' })
        app.models.predict(Clarifai.GENERAL_MODEL, { base64: response.data }).then(
          (res) => {
            let tags = [];
            for (let i = 0; i < res.outputs[0].data.concepts.length; i++) {
              tags.push(res.outputs[0].data.concepts[i].name)
            }
            this.setState({ tagText: tags });
          },
          (error) => {
            console.log(error);
          });
      }
    });
  }

  lyricSearch(tag, evt) {
    mxm.searchTrack({ q_lyrics: tag, f_lyrics_language: 'en' })
      .then(res => {
        const index = getRandomInt(res.message.body.track_list.length)
        const trackId = res.message.body.track_list[index].track.track_id
        return trackId;
      })
      .then(id => {
        let results = [];
        mxm.getTrackLyrics(id)
          .then(res => {
            return res.message.body.lyrics.lyrics_body.split(/\r?\n/)
          })
          .then(lyricArray => {
            lyricArray.forEach(lyric => {
              let line = lyric.split(' ');
              let found = line.find(word => {
                if (word[word.length - 1] === ',') {
                  word = word.slice(-1);
                }
                return tag === word.toLowerCase()
              });
              if (found) {
                results.push(lyric)
              }
            })
            if (!results.length) {
              let index = getRandomInt(lyricArray.length - 4)
              if (lyricArray[index]) {
                results.push(lyricArray[index]);
              } else {
                results.push('Oops! Try Again!')
              }
            }
            this.setState({ lyricText: results[getRandomInt(results.length)] })
          })
      })
  }
  
  writeToCliipboard = async () => {
    await Clipboard.setString(this.state.lyricText)
    alert('Copied to your clipboard! Just tap paste.')
  }
  
  static navigationOptions = {
    title: 'Subtitle'
  }

  render() {
    
    return (
      <View style={styles.container}>
          <Image
            source={{ uri: this.state.imageSource }}
            style={styles.image}
          />

        <Button
          onPress={this.selectImage}
          title="Select an image"
          style={styles.selectImage}
        />
        <Carousel 
          width={400} 
          height={40} 
          hideIndicators={true}
          >
          {this.state.tagText.map((tag, i) => {
            return (
              <Button
                onPress={() => this.lyricSearch(tag)}
                key={i}
                title={`#${tag}`}
                style={styles.tag}
              />
            )
          })}
        </Carousel>
        { this.state.lyricText 
          ? <View>
          <Text>Suggested Caption:</Text>
          <Button
            style={styles.lyric}
            title={`"${this.state.lyricText}"`}
            onPress={this.writeToCliipboard}
          />
          </View>
          : null
        } 
        <View style={styles.spacer}></View>
        <View style={styles.spacer}></View>
      </View>
    );
  }
}