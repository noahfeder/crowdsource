'use strict';
import React, { Component } from 'react';
import { TouchableHighlight, Text } from 'react-native';
import style from '../public/styles/style';

export default class MenuItem extends Component {
  render() {
    return (
      <TouchableHighlight
        onPress={ () => this.props.onPress() }
        style={style.menuItem}
        activeOpacity={0.1}
        underlayColor={'rgba(0,0,0,0)'}
      >
        <Text style={style.textMedium} >
          {this.props.content}
        </Text>
      </TouchableHighlight>

    )
  }
}
