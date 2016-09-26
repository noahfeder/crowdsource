'use strict';
import React, { Component } from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import style from '../public/styles/style';


export default class ShowHeader extends Component {

  render() {
    return (
      <View>
        <Text style={ [style.binaryText, this.props.expiredText] }>
          { this.props.binary.name }
        </Text>

        <TouchableHighlight activeOpacity={ 0.2 }
          underlayColor={ '#eee' }
          onPress={ () => this.props.onPress() } >
          <Text style={ [style.binaryText, style.textSmall, style.textCenter] } >
            by { this.props.binary.username }
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}
