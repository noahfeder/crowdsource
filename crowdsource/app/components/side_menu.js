import React, { Component } from 'react';
import { View, Text, TouchableHighlight, AsyncStorage } from 'react-native';
import { SideMenu } from 'react-native-elements';
import style from '../public/styles/style';
import {nav} from '../wrappers/app'
export const MenuGuts = (
  <View style={[style.wrapper, style.menu]}>
    <TouchableHighlight style={style.menuItem}
      activeOpacity={0.1}
      underlayColor={'rgba(0,0,0,0)'}
      onPress={ () => nav.push({name: 'new'})}>
      <Text>New decision</Text>
    </TouchableHighlight>
    <TouchableHighlight style={style.menuItem}
      activeOpacity={0.1}
      underlayColor={'rgba(0,0,0,0)'}
      onPress={ () => {
        AsyncStorage.multiRemove(['user_id_csh','user_name_csh']).then( () => {
          nav.replacePreviousAndPop({name: 'login'})
        })
      }
    }>
      <Text>Logout</Text>
    </TouchableHighlight>
  </View>
);
