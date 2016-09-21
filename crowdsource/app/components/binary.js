'use strict';
import React, {Component} from 'react';
import {Image, View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class Binary extends Component {
  render() {
    let hue = this.props.color;
    let a = this.props.data.votesA, b = this.props.data.votesB;
    let breakPoint = a / (a + b);
    return (
          <LinearGradient
            start={[0.0,0.0]} end={[1.0,0.0]}
            locations={[ 0, (breakPoint - 0.05), (breakPoint + 0.05), 1 ]}
            colors={[`hsl(${hue},75%,75%)`,`hsl(${hue},75%,75%)`,`hsl(${(hue + 60) % 360},75%,75%)`,`hsl(${(hue + 60) % 360},75%,75%)`]}
            style={this.props.style} />
      )
  }
}
