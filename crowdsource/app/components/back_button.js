import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { nav } from '../wrappers/app';

export default class BackButton extends Component {

  goBack() {
    let routes = nav.getCurrentRoutes();
    if (routes.length > 1) {
      nav.pop();
      return true;
    }
    if (routes.length === 1 && routes[0].name !== 'index') {
      nav.push({ name: 'index' });
      return true;
    }
  }

  render() {
    return (
      <Button onPress={ () => this.goBack() }
        backgroundColor="#f20"
        small raised title="BACK"/>
      )
  }
}
