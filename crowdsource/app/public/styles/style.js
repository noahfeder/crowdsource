import { StyleSheet, Dimensions } from 'react-native';

let { height, width } = Dimensions.get('window');

const style = StyleSheet.create({
  wrapper: {
    height: height,
    width: width
  },
  defaultText: {
    fontFamily: 'Arial, sans-serif',
    fontSize: 20
  },
  redText: {
    color: 'red'
  },
  greenText: {
    color: 'green'
  },
  wrapper: {
    flex: 1
  },
  decision: {
    height: 150,
    marginBottom: 15
  },
  header: {
    height: 50,
    backgroundColor: 'red'
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24
  },
  binary: {
    height: 100,
    margin: 10
  },
  binaryText: {
    textAlign: 'center',
    height: 50,
    fontSize: 40
  },
  option: {
    fontSize: 18,
    position: 'absolute',
    top: 100,
    marginLeft: 15,
    width: width,
    backgroundColor: 'transparent'
  },
  optionB: {
    textAlign: 'right',
    marginLeft: -15
  },
  backButton: {
    width: 80,
    height: 20,
    marginTop: 20,
    backgroundColor: 'red'
  },
  backButtonText: {
    fontWeight: 'bold',
    fontSize: 24
  }
})

export default style;
