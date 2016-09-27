'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BackAndroid, TouchableHighlight, View, Text } from 'react-native';
import { Button, SideMenu } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import Loading from './loading';
import { backButton } from './app';

import Decision from '../components/decision';
import TimeLeft from '../components/time_left';
import BackButton from '../components/back_button';
import Header from '../components/header';
import { MenuGuts } from '../components/side_menu';
import ShowHeader from '../components/show_header';

import style from '../public/styles/style';

import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

class DecisionShow extends Component {

  componentWillMount() {
    this.props.fetchBinary(this.props.binary_id);
  }


  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', backButton);
    this.props.hideMenu();
    this.timer = this.setInterval( () => {
      this.props.refreshBinary(this.props.binary_id);
    }, 1000)
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', backButton);
    this.clearInterval(this.timer);
  }

  countdown(expired) {
    if (expired) {
      return <Text style={ [style.countdownText, style.textCenter] } >No time left!</Text>;
    }
    return <TimeLeft hue={ this.props.color } expiration={ this.props.binary.expiration } />;
  }

  render() {
    let hue = this.props.color;
    if (this.props.loaded) {
      let expired = Math.floor( Date.now() / 1000 ) > this.props.binary.expiration;
      let expiredText = expired ? style.textError : style.textActive;
      if (this.timer && expired) {
        this.clearInterval(this.timer)
      }
      if (!this.props.error) {
        // ALL GOOD
        return (
          <SideMenu toggled={ this.props.toggled } style={ [style.wrapper, style.alignTop] } MenuComponent={ MenuGuts }>

            <Header toggleMenu={ this.props.toggleMenu.bind(this) } />

            <View style={ [style.wrapper] }>
                <ShowHeader
                  binary={ this.props.binary }
                  onPress={ () => {
                    this.clearInterval(this.timer);
                    this.props.navigator.push({
                      name: 'showuser',
                      user_id: this.props.binary.user_id,
                      username: this.props.binary.username
                    });
                  }}
                  expiredText={ this.props.expiredText }
                />

                <Text style={ [{ margin: 10, backgroundColor: 'rgba(100,100,100,0.3)', padding: 10, color: '#222' }] }>
                  { this.props.binary.content }
                </Text>

                { this.countdown.bind(this)(expired) }


                <LinearGradient
                  start={[0.0,0.0]} end={[1.0,0.0]}
                  locations={[ 0, (this.props.breakPoint - 0.05), (this.props.breakPoint + 0.05), 1 ]}
                  colors={[`hsl(${ hue },33%,50%)`,`hsl(${ hue },33%,50%)`,`hsl(${ ( hue + 120 ) % 360 },33%,50%)`,`hsl(${( hue + 120 ) % 360 },33%,50%)`]}
                  style={ [style.binary] } />

                <View style={ style.options }>
                  <TouchableHighlight activeOpacity={ 0.2 }
                    underlayColor={ '#eee' }
                    style={ style.option }
                    onPress={ () => this.props.vote(this.props.binary.id, 1, this.props.user_id) }>
                    <Text style={ style.optionA }>
                      { this.props.binary.choiceA }
                      {'\n'}
                      { this.props.binary.votesA - 1 } Votes
                    </Text>
                  </TouchableHighlight>

                  <TouchableHighlight activeOpacity={ 0.2 }
                    underlayColor={ '#333' }
                    style={ style.option }
                    onPress={ () => this.props.vote(this.props.binary.id, 2, this.props.user_id) }>
                    <Text style={ style.optionB }>
                      { this.props.binary.choiceB }
                      {'\n'}
                      { this.props.binary.votesB - 1 } Votes
                    </Text>
                  </TouchableHighlight>

                </View>

                <BackButton style={ style.wrapper } />

            </View>
          </SideMenu>
          )
        } else {
          // ERROR MESSAGE
          return (
          <SideMenu toggled={ this.props.toggled } MenuComponent={ MenuGuts }>

            <Header toggleMenu={ this.props.toggleMenu.bind(this) } />

            <View style={ style.wrapper }>

                <ShowHeader
                  binary={ this.props.binary }
                  onPress={ () => {
                    this.clearInterval(this.timer);
                    this.props.navigator.push({
                      name: 'showuser',
                      user_id: this.props.binary.user_id,
                      username: this.props.binary.username
                    });
                  }}
                  expiredText={ this.props.expiredText }
                />

                <Text style={ [style.textPadded, { backgroundColor: '#333', color: '#eee', flex: 100 }] }>
                  { this.props.binary.content }
                </Text>

                { this.countdown.bind(this)(expired) }

                <LinearGradient
                  start={[0.0,0.0]} end={[1.0,0.0]}
                  locations={ [0, (this.props.breakPoint - 0.05), (this.props.breakPoint + 0.05), 1] }
                  colors={ [`hsl(${ hue },33%,50%)`, `hsl(${ hue },33%,50%)`, `hsl(${ ( hue + 60 ) % 360 },33%,50%)`, `hsl(${ ( hue + 60 ) % 360 },33%,50%)`] }
                  style={ style.binary } />

                <View style={ style.options }>

                  <View style={ style.option }>
                    <Text style={ style.optionA }>
                      { this.props.binary.choiceA }
                      {'\n'}
                      { this.props.binary.votesA - 1 } Votes
                    </Text>
                  </View>

                  <View style={ style.option }>
                    <Text style={ style.optionB }>
                      { this.props.binary.choiceB }
                      {'\n'}
                      { this.props.binary.votesB - 1} Votes
                    </Text>
                  </View>

                </View>

                <Text style={ [style.countdownText, style.textCenter ] }>
                  { this.props.message }
                </Text>

                <BackButton  />

            </View>
          </SideMenu>
          )
        }
      } else {
        return <Loading />
      }
  }
}

reactMixin(DecisionShow.prototype, TimerMixin);

function mapStateToProps(state, ownProps) {
  if (state.activeBinary.data && state.activeBinary.data.binary_id === ownProps.id) {
    return {
      loaded: true,
      binary: state.activeBinary.data,
      breakPoint: (state.activeBinary.data.votesA / (state.activeBinary.data.votesA + state.activeBinary.data.votesB)),
      toggled: state.toggleMenu.toggle,
      error: state.activeBinary.error,
      message: state.activeBinary.message,
      user_id: state.user.id
    }
  } else {
    return {
      loaded: false,
      toggled: state.toggleMenu.toggle
    }
  }
}

export default connect(mapStateToProps)(DecisionShow);
