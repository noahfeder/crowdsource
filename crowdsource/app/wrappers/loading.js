'use strict';
import React, { Component } from 'react';
import Header from '../components/header';
import { View, ActivityIndicator } from 'react-native';

export default class Loading extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Header />
        <ActivityIndicator color={'#333'} size={'large'} />
      </View>
    )
  }
}
