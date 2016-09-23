import React, { Component } from 'react';
import { Button } from 'react-native-elements';

export default class BackButton extends Component {
  render() {
  return (
    <Button onPress={ () => this.props.navigator.pop() }
      backgroundColor="#f20"
      small raised title="BACK"/>
    )
  }
}
