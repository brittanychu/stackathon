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
      imageSource: 'https://is3-ssl.mzstatic.com/image/thumb/Purple122/v4/c2/91/3c/c2913ccb-1918-e4a3-de78-ca6d2383b468/source/256x256bb.jpg',
      tagText: [],
      lyricText: '',
      artist: '',
      selectedSongId: null,
      songs: []
    };
    this.selectImage = this.selectImage.bind(this);
    // this.lyricSearch = this.lyricSearch.bind(this);
    this.chooseSong = this.chooseSong.bind(this);
    this.checkSongLyrics = this.checkSongLyrics.bind(this);
    this.setTrackIds = this.setTrackIds.bind(this)
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

  setTrackIds(tag, evt){
    mxm.searchTrack({ q_lyrics: tag, f_lyrics_language: 'en' })
      .then(res => {
        let ids = [];
        res.message.body.track_list.forEach(song => {
          ids.push(song.track.track_id);
        })
        this.setState({songs: ids})
        .then(_ => this.chooseSong(tag))
      })
  }

  chooseSong(tag) {
      const index = getRandomInt(this.state.songs.length);
      let id = this.state.songs[index];
      this.setState({selectedSongId: id})
      .then(_ => {
        return this.checkSongLyrics(this.state.selectedSongId, tag)
      })
    }

  checkSongLyrics(id, tag){
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
          if (found && line.length > 2) {
            results.push(lyric)
          }
        })
        if(!results.length){
          return this.chooseSong(tag)
        } else {
          this.setState({ lyricText: results[getRandomInt(results.length)] })
        }
      })
  }
      // .then(id => {
      //   let results = [];
      //   mxm.getTrackLyrics(id)
      //     .then(res => {
      //       return res.message.body.lyrics.lyrics_body.split(/\r?\n/)
      //     })
      //     .then(lyricArray => {
      //       lyricArray.forEach(lyric => {
      //         let line = lyric.split(' ');
      //         let found = line.find(word => {
      //           if (word[word.length - 1] === ',') {
      //             word = word.slice(-1);
      //           }
      //           return tag === word.toLowerCase()
      //         });
      //         if (found && line.length > 2) {
      //           results.push(lyric)
      //         }
      //       })
  //           if (!results.length) {
  //             let index = getRandomInt(lyricArray.length - 4)
  //             if (lyricArray[index] && lyricArray[index].split(' ').length > 2) {
  //               results.push(lyricArray[index]);
  //             } else {
  //               results.push('Oops! Try Again!')
  //             }
  //           }
  //           this.setState({ lyricText: results[getRandomInt(results.length)] })
  //         })
  //     })
  // }
  
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
                onPress={() => this.setTrackIds(tag)}
                key={i}
                title={`#${tag}`}
                style={styles.tag}
              />
            )
          })}
        </Carousel>
        { this.state.lyricText 
          ? <View>
          <Text style={styles.instructions}>Suggested Caption:</Text>
          <Button
            style={styles.lyric}
            title={`"${this.state.lyricText}"`}
            onPress={this.writeToCliipboard}
          />
          <Text style={styles.instructions}>- {this.state.artist}</Text>
          </View>
          : null
        } 
        <View style={styles.spacer}></View>
        <View style={styles.spacer}></View>
      </View>
    );
  }
}