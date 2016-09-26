import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { nav } from '../wrappers/app';

export default class BackButton extends Component {
  render() {
  return (
    <Button onPress={ () => nav.pop() }
      backgroundColor="#f20"
      small raised title="BACK"/>
    )
  }
}
