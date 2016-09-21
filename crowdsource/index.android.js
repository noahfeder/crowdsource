/**
 Resources: https://shift.infinite.red/a-tour-of-react-native-part-1-the-visuals-7822f48151f6#.hp7gicopq

 */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import App from './app/wrappers/app';

AppRegistry.registerComponent('crowdsource', () => App);
