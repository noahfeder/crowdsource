'use strict';

import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import style from '../public/styles/style';

export default class Header extends Component {
  render() {
    return (
      <View style={style.header}>
        <Text style={style.headerText}>CROWDSOURCE</Text>
      </View>
      )
  }
}
