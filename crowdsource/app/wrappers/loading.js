'use strict';
import React, { Component } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';

import Header from '../components/header';
import style from '../public/styles/style';

export default class Loading extends Component {
  render() {
    return (
      <View style={ style.fullScreen }>
        <View style={ style.header }>
          <Text style={ style.headerText }>CrowdsourceHelp</Text>
        </View>
        <ActivityIndicator color={'#AA5585'} size={'large'} style={ style.working }/>
      </View>
    )
  }
}
