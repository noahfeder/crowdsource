'use strict';
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';

import style from '../public/styles/style';

export default class Welcome extends Component {

  componentWillMount() {
    AsyncStorage.getItem('user_id_csh').then( (id) => {
      AsyncStorage.getItem('user_name_csh').then( (name) => {
        if (!id || !name) {
          setTimeout( () => this.props.navigator.resetTo({ name: 'login' }), 2000 )
        } else {
          setTimeout( () => {
            this.props.logInLocal(id, name);
            this.props.navigator.resetTo({ name: 'index' });
          }, 2000)
        }
      })
    })
  }

  render() {
    return (
      <View style={ style.wrapper }>
        <View style={ [style.wrapper, style.welcome] }>
          <Text style={ [style.textLarge, style.textCenter] }>CrowdsourceHelp</Text>
        </View>
      </View>
    )
  }
}
