import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  backgroundImage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#e6e6e6'
  },
  homeContainer: {
    justifyContent: 'flex-start',
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
    zIndex: 1,
    marginTop: 200
  },
  body: {
    flex: 1,
    justifyContent: 'center'
  },
  instructions: {
    textAlign: 'center',
    margin: 10,
  },
  spacer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  image: {
    width: '100%',
    height: '50%'
  },
  tag: {
    fontSize: 16, 
  },
  lyric: {
    fontSize: 20,
    margin: 5,
    padding: 5
  },
  selectImage:{
    margin: 10
  }, 
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});