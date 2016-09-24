'use strict';
import React, { Component } from 'react';
import Header from '../components/header';
import { View, Text, AsyncStorage } from 'react-native';
import style from '../public/styles/style';

export default class Welcome extends Component {
  componentWillMount() {
    console.log('let us store shit now')
    AsyncStorage.getItem('user_id').then( (id) => {
      console.log('wut is a promise')
      debugger;
      if (!id) {
        setTimeout( () => this.props.navigator.push({ name: 'login' }), 1500)
      } else {
        this.props.loginAsync(id)
        this.props.navigator.push({ name: 'index' })
      }
    })
  }
  render() {
    return (
      <View style={style.wrapper}>
        <Header />
        <View style={[style.wrapper, style.greenBackground]}>
          <Text style={style.textHuge}> WELCOME! </Text>
        </View>
      </View>
    )
  }
}
