import React, { Component } from 'react';
import { View, Text, TouchableHighlight, AsyncStorage } from 'react-native';
import { SideMenu } from 'react-native-elements';
import style from '../public/styles/style';
import {nav} from '../wrappers/app'
export const MenuGuts = (
  <View style={[style.wrapper, style.menu]}>
    <TouchableHighlight style={style.menuItem}
      activeOpacity={0.2}
      underlayColor={'rgba(0,0,0,0)'}
      onPress={ () => nav.push({name: 'new'})}>
      <Text>New decision</Text>
    </TouchableHighlight>
    <TouchableHighlight style={style.menuItem}
      activeOpacity={0.2}
      underlayColor={'rgba(0,0,0,0)'}
      onPress={ () => {
        AsyncStorage.removeItem('user_id').then( () => {
          nav.replacePreviousAndPop({name: 'welcome'})
        })
      }
    }>
      <Text>Logout</Text>
    </TouchableHighlight>
  </View>
);
