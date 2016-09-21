'use strict';
import React, {Component} from 'react';
import {Image, View, Text} from 'react-native';
import style from '../public/styles/style';

export default class Binary extends Component {
  render() {
    let hue = this.props.color;
    return (
        <View style={style.binary}>
          <View style={[style.binaryA, {backgroundImage: `linear-gradient(90deg, hsl(${hue},75%,75%) 90%, hsl(${(hue + 90) % 360},75%,75%)`}]}>
            <Text style={style.redText}>A</Text>
          </View>
          <View style={{flex: Math.random(), backgroundColor: `hsl(${(hue + 90) % 360},75%,75%)`}}>
            <Text style={style.greenText}>B</Text>
          </View>
        </View>
      )
  }
}
