'use strict';
import React, {Component} from 'react';
import {Image, View, Text} from 'react-native';
import style from '../public/styles/style';
import Binary from './binary';

export default class Decision extends Component {

  render() {
    return (
      <View style={style.decision} >
        <Text style={style.binaryText}>{this.props.data.name}</Text>
        <Binary style={style.binary} color={this.props.color} data={this.props.data} />
        <Text style={style.optionA}>OPTION A</Text>
        <Text style={style.optionB}>OPTION B</Text>
      </View>
      )
  }
}
