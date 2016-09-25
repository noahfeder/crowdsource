'use strict';
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import style from '../public/styles/style';

export default class Welcome extends Component {

  componentWillMount() {
    AsyncStorage.getItem('user_id').then( (id) => {
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
        <View style={[style.wrapper, style.greenBackground]}>
          <Text style={style.textHuge}> WELCOME! </Text>
        </View>
      </View>
    )
  }
}
