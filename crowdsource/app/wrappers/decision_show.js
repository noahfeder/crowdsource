import React, {Component} from 'react';
import { View, Text } from 'react-native';
import Router from 'react-native-simple-router';
import Header from '../components/header';
import Decision from '../components/decision';
import style from '../public/styles/style';
import { Button } from 'react-native-elements';

export default class DecisionShow extends Component {
  render() {
    return (
      <View>
        <Header />
        <Text style={{height: 50}}>{this.props.data.description}</Text>
        <Decision data={this.props.data} color={this.props.color}/>
        <Button onPress={ () => this.props.navigator.pop() }
          backgroundColor="#f20"
          small raised title='BACK' />
      </View>
    )
  }

}
