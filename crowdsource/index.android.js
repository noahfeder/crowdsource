/**
* Resources:
*  https://shift.infinite.red/a-tour-of-react-native-part-1-the-visuals-7822f48151f6#.hp7gicopq
*  https://medium.com/the-react-native-log/tips-for-styling-your-react-native-apps-3f61608655eb#.6527f3pum
*  https://www.npmjs.com/package/color
*  https://github.com/alinz/example-react-native-redux/tree/master/Counter
*  http://www.reactnative.com/getting-started-with-react-native-and-redux/
*  http://blog.paracode.com/2016/01/05/routing-and-navigation-in-react-native/
*  https://github.com/reactjs/redux/blob/master/docs/advanced/AsyncActions.md
*  https://github.com/react-native-community/react-native-elements
*  https://github.com/oblador/react-native-vector-icons
    NAV
*  http://stackoverflow.com/questions/33830493/react-native-navigator/33831700#33831700
*  https://github.com/itzikbenh/React-Native-on-Rails/blob/master/index.ios.js
    FETCH
*  https://davidwalsh.name/fetch
    LOVE
*  http://stackoverflow.com/questions/39137031/redux-global-solution-for-cannot-read-property-of-undefined-in-mapstatetoprops-i/39137395#comment66645943_39137395
    TIMER BS
*  https://facebook.github.io/react-native/docs/timers.html
*  https://github.com/brigand/react-mixin
    ICONS
*  http://makeappicon.com/
*/

'use strict';
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import {App} from './app/wrappers/app';

AppRegistry.registerComponent('crowdsource', () => App);
