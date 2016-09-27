'use strict';
import { StyleSheet, Dimensions } from 'react-native';

let { height, width } = Dimensions.get('window');
const bgcolor = '#AA5585';

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
    backgroundColor: '#ddd'
  },
  decision: {
    marginTop: 10,
    height: 130
  },
  header: {
    height: 32,
    backgroundColor: bgcolor,
    flexDirection: 'row'
  },
  headerIcon: {
    position: 'absolute',
    left: 10
  },
  headerText: {
    color: '#333',
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
    height: 24,
    fontSize: 20
  },
  countdownText: {
    flex: 0,
    color: '#f20',
    marginVertical: 15,
    fontSize: 24
  },
  options: {
    flexDirection: 'row',
    position: 'relative',
    width: width - 30,
    top: -90,
    height: 50,
    backgroundColor: 'transparent',
    marginHorizontal: 15,
    marginTop: 15
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
  welcome: {
    backgroundColor: bgcolor,
    justifyContent: 'center'
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
  textRight: {
    textAlign: 'right'
  },
  textError: {
    fontSize: 18,
    color: '#C63131'
  },
  textActive: {
    fontSize: 18,
    color: '#333'
  },
  textPadded: {
    marginHorizontal: 15
  },
  textPaddedMore: {
    marginHorizontal: 30
  },
  alignTop: {
    justifyContent: 'flex-start',
    flex: 1,
    flexDirection: 'column'
  },
  menu: {
    backgroundColor: 'rgba(100,100,100,0.6)'
  },
  menuItem: {
    paddingHorizontal: 30,
    marginBottom: 15,
    backgroundColor: 'rgba(100,100,100,0.0)',
    height: 30
  }
})

export default style;
