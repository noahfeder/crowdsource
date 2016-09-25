'use strict';
import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import Header from '../components/header';
import { MenuGuts } from '../components/side_menu';
import { SideMenu } from 'react-native-elements';

export default class Loading extends Component {
  render() {
    return <ActivityIndicator color={'#333'} size={'large'} />
  }
}
