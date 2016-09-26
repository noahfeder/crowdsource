'use strict';
import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import style from '../public/styles/style';
import MenuItem from './menu_item';
import { nav } from '../wrappers/app'

export const MenuGuts = (
  <View style={[style.wrapper, style.menu]}>
    <MenuItem onPress={ () => nav.push({name: 'index'}) } content="Home" />
    <MenuItem onPress={ () => {
      AsyncStorage.multiGet( ['user_id_csh','user_name_csh'] ).then( arr => {
        nav.push({ name: 'showuser', user_id: arr[0][1], username: arr[1][1] })
      })
    }} content="My Decisions" />
    <MenuItem onPress={ () => nav.push({name: 'new'})} content="New Decision" />
    <MenuItem onPress={ () => {
      AsyncStorage.multiRemove(['user_id_csh','user_name_csh']).then( () => {
        nav.replacePreviousAndPop({name: 'login'})
      })
    }} content="Logout" />
  </View>
);
