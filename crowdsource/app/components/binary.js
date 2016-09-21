'use strict';
import React, {Component} from 'react';
import {Image, View, Text} from 'react-native';
import style from '../public/styles/style';

export default class Binary extends Component {
  render() {
    let hue = this.props.color;
    return (
        <View style={style.binary}>
          <View style={[style.binaryA, {backgroundColor: `hsl(${hue},75%,65%)`}]}>
            <Text style={style.redText}>A</Text>
          </View>
          <View style={{flex: Math.random(), backgroundColor: `hsl(${(hue + 60) % 360},75%,65%)`}}>
            <Text style={style.greenText}>B</Text>
          </View>
        </View>
      )
  }
}
