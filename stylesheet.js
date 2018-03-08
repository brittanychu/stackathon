import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-start',
    height: 30
  },
  logo: {
    fontSize: 20,
    textAlign: 'center',
    margin: 30,
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
  }
});