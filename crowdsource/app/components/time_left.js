import React, { Component } from 'react';
import { Text } from 'react-native';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

class TimeLeft extends Component {

  componentDidMount() {
    this.setInterval( () => {
        this.forceUpdate();
    }, 1000)
  }

  timeLeft() {
    let s = this.props.expiration  - Math.floor(Date.now() / 1000);
    if (s < 1) {
      return 'No time left!';
    }
    if (s < 60) {
      return `${s} seconds remaining!`;
    }
    if (s < 3600) {
      let m = Math.floor(s / 60);
      s -= m * 60;
      return `${m} minutes and ${s} seconds remaining!`;
    }
    if (s < 86400) {
      let h = Math.floor(s / 3600);
      s -= h * 3600;
      let m = Math.floor(s / 60);
      s -= m * 60;
      return `${h} hours, ${m} minutes, and ${s} seconds remaining!`;
    }
    let d = Math.floor(s / 86400);
    s -= d * 86400;
    let h = Math.floor(s / 3600);
    s -= h * 3600;
    let m = Math.floor(s / 60);
    s -= m * 60;
    return `${d} days, ${h} hours, ${m} minutes, and ${s} seconds remaining!`;
  }

  render() {
    return (<Text style={{height: 50, color: 'red'}}>{this.timeLeft()}</Text>);
  }
}

reactMixin(TimeLeft.prototype, TimerMixin);

export default TimeLeft;
