'use strict';
import React, {Component} from 'react';
import {Image, View, Text} from 'react-native';
import style from '../public/styles/style';
import LinearGradient from 'react-native-linear-gradient';

export default class Binary extends Component {
  render() {
    let hue = this.props.color;
    let breakPoint = Math.random();
    return (
          <LinearGradient
            start={[0.0,0.0]} end={[1.0,0.0]}
            locations={[0,breakPoint,(breakPoint + 0.1),1]}
            colors={[`hsl(${hue},75%,75%)`,`hsl(${hue},75%,75%)`,`hsl(${(hue + 60) % 360},75%,75%)`,`hsl(${(hue + 60) % 360},75%,75%)`]}
            style={style.binary} />
      )
  }
}
