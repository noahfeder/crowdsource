'use strict';
import React, {Component} from 'react';
import { TouchableHighlight, Image, View, Text} from 'react-native';
import style from '../public/styles/style';
import Binary from './binary';
import LinearGradient from 'react-native-linear-gradient';

export default class Decision extends Component {

  render() {
    let hue = this.props.color;
    let a = this.props.data.votesA;
    let b = this.props.data.votesB;
    let breakPoint = a / (a + b);

    return (
      <View style={style.decision} >

        <Text style={style.binaryText}>{this.props.data.name}</Text>

        <LinearGradient
            start={[0.0,0.0]} end={[1.0,0.0]}
            locations={[ 0, (breakPoint - 0.05), (breakPoint + 0.05), 1 ]}
            colors={[`hsl(${hue},75%,75%)`,`hsl(${hue},75%,75%)`,`hsl(${(hue + 60) % 360},75%,75%)`,`hsl(${(hue + 60) % 360},75%,75%)`]}
            style={style.binary} />

        <View style={style.options}>

          <TouchableHighlight style={style.option}>
            <Text style={style.optionA}>
              {this.props.data.choiceA}
            </Text>
          </TouchableHighlight>

          <TouchableHighlight  style={style.option}>
            <Text style={style.optionB}>
              {this.props.data.choiceB}
            </Text>
          </TouchableHighlight>

        </View>
      </View>
    )
  }
}
let storage= "<Binary style={style.binary} color={this.props.color} data={this.props.data} />"
