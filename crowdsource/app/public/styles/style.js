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
    height: 100
  },
  header: {
    height: 50,
    backgroundColor: "red"
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24
  },
  binary: {
    flex: 1,
    flexDirection: 'row'
  },
  binaryA: {
    borderRightWidth: 1,
    borderRightColor: 'black',
    flex: 0.5
  }
})

export default style;
