'use strict';

import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import style from '../public/styles/style';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Header extends Component {
  render() {
    return (
      <View style={style.header}>
        <Icon name="bars" size={30} onPress={() => {
          this.props.toggleMenu();
          console.log('togglin')
        }}/>
        <Text style={style.headerText}>CROWDSOURCE</Text>
      </View>
      )
  }
}
