'use strict';
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { toggle } from '../wrappers/app';

import style from '../public/styles/style';

export default class Header extends Component {
  render() {
    return (
      <View style={ style.header }>
        <Text style={ style.headerText }>CrowdsourceHelp</Text>
        <Icon name="bars" size={ 30 }
          style={ style.headerIcon }
          onPress={ () => this.props.toggleMenu() } />

      </View>
      )
  }
}
