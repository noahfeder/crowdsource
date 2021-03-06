'use strict';
import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';

import { nav } from '../wrappers/app'
import MenuItem from './menu_item';

import style from '../public/styles/style';

export const MenuGuts = (
  <View style={[style.wrapper, style.menu]}>

    <MenuItem onPress={ () => nav.resetTo({ name: 'index'}) } content='Home' />

    <MenuItem onPress={ () => {
      AsyncStorage.multiGet( ['user_id_csh','user_name_csh'] ).then( arr =>
        nav.replace({ name: 'showuser', user_id: arr[0][1], username: arr[1][1] })
      )
    }} content='My Decisions' />

    <MenuItem onPress={ () => nav.replace({ name: 'new'})} content='New Decision' />

    <MenuItem onPress={ () => {
      AsyncStorage.multiRemove(['user_id_csh','user_name_csh']).then( () => {
        nav.resetTo({ name: 'login'})
      })
    }} content='Logout' />

  </View>
);
