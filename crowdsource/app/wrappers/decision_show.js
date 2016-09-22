import React, {Component} from 'react';
import { View, Text } from 'react-native';
import Router from 'react-native-simple-router';
import Header from '../components/header';
import Decision from '../components/decision';
export default class DecisionShow extends Component {
  render() {
    return (
      <View>
        <Header />
        <Text style={{height: 50}}>{this.props.data.description}</Text>
        <Decision data={this.props.data} color={this.props.color}/>
      </View>
    )
  }

}
