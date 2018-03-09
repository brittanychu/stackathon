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
    flexWrap: 'wrap',
    margin: 5,
    padding: 5,
    flexDirection: 'row'
  },
  tag: {
    fontSize: 16
  },
  lyric: {
    // color: '#ffffff',
    fontSize: 20,
    margin: 5,
    padding: 5
  }
});