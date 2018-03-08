import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-start',
    height: 30
  },
  logo: {
    fontFamily: 'Futura',
    fontSize: 50,
    textAlign: 'center',
    margin: 40,
    zIndex: 1
  },
  body: {
    flex: 1,
    justifyContent: 'center'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    margin: 10,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  image: {
    width: 200,
    height: 200
  },
  tags: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    textAlign: 'center',
    flexWrap: 'wrap',
    margin: 10,
    padding: 10,
    width: 300
  },
  tag: {
    alignSelf: 'center',
  },
  lyric: {
    color: '#ffffff',
    fontSize: 20
  }
});