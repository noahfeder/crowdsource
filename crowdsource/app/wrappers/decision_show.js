import React, {Component} from 'react';
import Router from 'react-native-simple-router';
import Header from '../components/header';

export default class DecisionShow extends Component {
  render() {
    return (
      <View>
        <Header />
        <Text style={{height: 50}}>{this.props.data.description}</Text>
        <Decision data={this.props.data} color={this.props.hue}/>
      </View>
    )
  }

}
