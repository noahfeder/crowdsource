'use strict';
import React, { Component } from 'react';
import Header from '../components/header';
import { View, Text, AsyncStorage } from 'react-native';
import style from '../public/styles/style';

export default class Welcome extends Component {
  componentWillMount() {
    AsyncStorage.getItem('user_id', (res) => {
      if (!res) {
        setTimeout( () => {
          this.props.navigator.push({
            name: 'login'
          })
        }, 1500)

      }
    })
  }
  render() {
    return (
      <View style={style.wrapper}>
        <Header />
        <View style={[style.wrapper, style.greenBackground]}>
          <Text style={style.text.huge}> WELCOME! </Text>
        </View>
      </View>
    )
  }
}
