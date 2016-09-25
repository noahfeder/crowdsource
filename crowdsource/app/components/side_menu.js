import React, { Component } from 'react';
import { View, Text, TouchableHighlight, AsyncStorage } from 'react-native';
import { SideMenu } from 'react-native-elements';
import style from '../public/styles/style';

export const MenuGuts = (
  <View style={{flex: 1}}>
    <TouchableHighlight onPress={ () => this.props.navigator.push({name: 'new'})}>
      <Text>New decision</Text>
    </TouchableHighlight>
    <TouchableHighlight onPress={ () => {
      AsyncStorage.removeItem('user_id').then( () => {
        this.props.navigator.replacePreviousAndPop({name: 'welcome'})
      })
    }}>
      <Text>Logout</Text>
    </TouchableHighlight>
  </View>
);
