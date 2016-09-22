import React, {Component} from 'react';
import { View, Text } from 'react-native';
import Router from 'react-native-simple-router';
import Header from '../components/header';
import Decision from '../components/decision';
import style from '../public/styles/style';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

class DecisionShow extends Component {
  render() {
    let currentData = this.props.items[this.props.id];
    return (
      <View style={style.wrapper}>
        <Header />
        <Text style={{height: 50}}>{currentData.description}</Text>
        <Decision vote={this.props.vote.bind(this)} data={currentData} color={this.props.color}/>
        <Button onPress={ () => this.props.navigator.pop() }
          backgroundColor="#f20"
          small raised title='BACK' />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    items: state.binaries.items
  };
}

export default connect(mapStateToProps)(DecisionShow);
