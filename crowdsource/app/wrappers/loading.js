'use strict';
import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default class Loading extends Component {
  render() {
    return <ActivityIndicator color={'#333'} size={'large'} />
  }
}
