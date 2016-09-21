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
  decision: {
    flex: 1
  },
  header: {
    height: 50,
    backgroundColor: "red"
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24
  }
})

export default style;
