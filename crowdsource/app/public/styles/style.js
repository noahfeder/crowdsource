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
  decisionWrapper: {
    flex: 1
  },
  decision: {
    height: 150
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
    height: 100
  },
  binaryText: {
    textAlign: 'center',
    height: 50,
    fontSize: 40
  },
  optionA: {
    fontSize: 18,
    position: 'absolute',
    top: 60,
    textAlign: 'left',
    width: width,
    backgroundColor: 'transparent'
  },
  optionB: {
    fontSize: 18,
    position: 'absolute',
    top: 60,
    textAlign: 'right',
    width: width,
    backgroundColor: 'transparent'
  }
})

export default style;
