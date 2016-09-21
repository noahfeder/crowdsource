/**
* Resources:
*  https://shift.infinite.red/a-tour-of-react-native-part-1-the-visuals-7822f48151f6#.hp7gicopq
*  https://medium.com/the-react-native-log/tips-for-styling-your-react-native-apps-3f61608655eb#.6527f3pum
*  https://www.npmjs.com/package/color
*  https://github.com/alinz/example-react-native-redux/tree/master/Counter
*  http://www.reactnative.com/getting-started-with-react-native-and-redux/
 */

'use strict';
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './app/wrappers/app';

AppRegistry.registerComponent('crowdsource', () => App);
