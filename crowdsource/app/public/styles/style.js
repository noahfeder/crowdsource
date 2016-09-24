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
  options: {
    flexDirection: 'row',
    position: 'absolute',
    width: width - 30,
    top: 50,
    height: 100,
    backgroundColor: 'transparent',
    margin: 15
  },
  option: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  optionA: {
    fontSize: 18,
    backgroundColor: 'transparent'
  },
  optionB: {
    backgroundColor: 'transparent',
    fontSize: 18,
    textAlign: 'right'
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
  },
  greenBackground: {
    backgroundColor: 'green'
  },
  text: {
    small: {
      fontSize: 18
    },
    medium: {
      fontSize: 24
    },
    large: {
      fontSize: 40
    },
    huge: {
      fontSize: 72
    }
  }
})

export default style;
