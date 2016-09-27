'use strict';
import React, { Component } from 'react';
import { TouchableHighlight, Image, View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import style from '../public/styles/style';

export default class Decision extends Component {

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  render() {
    let hue = this.props.color;
    let a = this.props.data.votesA;
    let b = this.props.data.votesB;
    let breakPoint = a / (a + b);
    let expiredText = this.props.expired ? style.textError : style.textActive;
    return (
      <View style={ style.decision } ref={ component => this._root = component } {...this.props } >

        <Text style={ [style.binaryText, expiredText] }>{ this.props.data.name }</Text>

        <LinearGradient
            start={[0.0,0.0]} end={[1.0,0.0]}
            locations={[ 0, (breakPoint - 0.05), (breakPoint + 0.05), 1 ]}
            colors={[`hsl(${ hue },33%,50%)`,`hsl(${ hue },33%,50%)`,`hsl(${ ( hue + 120 ) % 360 },33%,50%)`,`hsl(${ ( hue + 120 ) % 360 },33%,50%)`]}
            style={ style.binary } />

        <View style={ style.options }>

          <View style={ style.option }>
            <Text style={ style.optionA }>
              { this.props.data.choiceA }
            </Text>
          </View>

          <View style={ style.option }>
            <Text style={ style.optionB }>
              { this.props.data.choiceB }
            </Text>
          </View>

        </View>
      </View>
    )
  }
}
