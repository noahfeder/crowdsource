'use strict';
import React, {Component} from 'react';
import { TouchableHighlight, Image, View, Text} from 'react-native';
import style from '../public/styles/style';
import Binary from './binary';

export default class Decision extends Component {

  render() {
    return (
      <View style={style.decision} >
        <Text style={style.binaryText}>{this.props.data.name}</Text>
        <Binary style={style.binary} color={this.props.color} data={this.props.data} />
        <TouchableHighlight onPress={ () => {
          this.props.vote(this.props.data.id, 'A')}
          }>
          <Text style={style.option}>{this.props.data.choiceA}</Text>
        </TouchableHighlight>
        <Text style={[style.option, style.optionB]}>{this.props.data.choiceB}</Text>
      </View>
    )
  }
}
