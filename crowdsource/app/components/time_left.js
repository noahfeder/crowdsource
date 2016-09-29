'use strict';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

import style from '../public/styles/style';

class TimeLeft extends Component {

  componentDidMount() {
    this.setInterval( () => {
        this.forceUpdate();
    }, 1000)
  }

  timeLeft(breakpoint, num, str) {
    if (breakpoint !== undefined) {
      return(
        <View>
          <Text style={ [style.textCenter, style.textSmall] }>
            {`${ num } ${ str }`}
          </Text>
          <LinearGradient
            start={[0.0,0.0]} end={[1.0,0.0]}
            locations={[ 0, (breakpoint - 0.1), (breakpoint + 0.1), 1 ]}
            colors={[`hsl(${ this.props.hue },33%,50%)`,`hsl(${ this.props.hue },33%,50%)`,`hsl(${ ( this.props.hue + 120 ) % 360 },33%,50%)`,`hsl(${( this.props.hue + 120 ) % 360 },33%,50%)`]}
            style={ style.countdownGradient }
          />
        </View>
      )
    }
    return true;
  }

  render() {
    let s = this.props.expiration  - Math.floor(Date.now() / 1000);
    let h, m, d, breakPointS, breakPointM, breakPointH, breakPointD;
    if (s > 86400) {
      d = Math.floor(s / 86400);
      s -= d * 86400;
      breakPointD = (d / 365);
    }
    if (s > 3600) {
      h = Math.floor(s / 3600);
      s -= h * 3600;
      breakPointH = (h / 24);
    }
    if (s > 60) {
      m = Math.floor(s / 60);
      s -= m * 60;
      breakPointM = (m / 60);
    }
    breakPointS = (s / 60);

    return (
      <View>
        <Text style={ [style.textCenter, style.textSmall, { marginVertical: 5 }] }>
          Time Remaining:
        </Text>
        { this.timeLeft(breakPointD, d, 'days') }
        { this.timeLeft(breakPointH, h, 'hours') }
        { this.timeLeft(breakPointM, m, 'minutes') }
        { this.timeLeft(breakPointS, s, 'seconds') }
      </View>
    );
  }
}

reactMixin(TimeLeft.prototype, TimerMixin);

export default TimeLeft;
