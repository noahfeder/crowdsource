import { StyleSheet, Dimensions } from 'react-native';

let { height, width } = Dimensions.get('window');

const style = StyleSheet.create({
  defaultText: {
    fontFamily: 'Arial, sans-serif',
    fontSize: 18
  },
  redText: {
    color: 'red'
  },
  greenText: {
    color: 'green'
  },
  wrapper: {
    flex: 1,
    backgroundColor: 'white'
  },
  decision: {
    height: 150,
    marginBottom: 15
  },
  header: {
    paddingTop: 20,
    height: 56,
    backgroundColor: 'red',
    flexDirection: 'row'
  },
  headerIcon: {
    position: 'absolute',
    left: 10
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    flex: 1
  },
  binary: {
    height: 100,
    margin: 10,
    padding: 10
  },
  binaryText: {
    textAlign: 'center',
    height: 50,
    fontSize: 40
  },
  options: {
    flexDirection: 'row',
    position: 'relative',
    width: width - 30,
    top: -90,
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
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 0
  },
  backButtonText: {
    fontWeight: 'bold',
    fontSize: 24
  },
  buttonTop: {
    marginBottom: 10
  },
  greenBackground: {
    backgroundColor: 'green'
  },
  textSmall: {
    fontSize: 18
  },
  textMedium: {
    fontSize: 24
  },
  textLarge: {
    fontSize: 40
  },
  textHuge: {
    fontSize: 72
  },
  textCenter: {
    textAlign: 'center'
  },
  textError: {
    height: 20,
    color: 'red'
  },
  menu: {
    marginTop: 20,
    backgroundColor: 'rgba(100,100,100,0.6)',
  },
  menuItem: {
    paddingHorizontal: 30,
    marginBottom: 15,
    backgroundColor: 'rgba(100,100,100,0.0)',
    height: 30
  }
})

export default style;
