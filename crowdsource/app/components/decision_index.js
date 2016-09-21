'use strict';
import React, {Component} from 'react';
import {Image, View, Text} from 'react-native';
import style from '../public/styles/style';

export default class Decision extends Component {
  render() {
    let colorful = this.props.ord % 2 ? style.greenText : style.redText;
    return (
      <View className="decision" style={this.props.style}>
        <Text style={colorful}>{this.props.text}</Text>
      </View>
      )
  }
}
