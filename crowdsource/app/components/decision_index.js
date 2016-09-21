'use strict';
import React, {Component} from 'react';
import {Image, View, Text} from 'react-native';
import style from '../public/styles/style';
import Binary from './binary';
export default class Decision extends Component {

  render() {
    return (
      <View className="decision" style={style.decision}>
        <Binary color={this.props.color} />
      </View>
      )
  }
}
