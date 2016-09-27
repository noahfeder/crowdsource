'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, ActivityIndicator, TouchableHighlight, Stylesheet, Image, View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import dismissKeyboard from 'react-native-dismiss-keyboard';

import style from '../public/styles/style';
import { newStyle } from '../public/styles/form_style';

import t from 'tcomb-form-native';

let Form = t.form.Form;

const User = t.struct({
  username: t.String,
  password: t.String
});

const Options = {
  stylesheet: newStyle,
  auto: 'placeholders',
  fields: {
    username: {
      autoCapitalize: 'none',
      autoCorrect: false,
      returnKeyType: 'next'
    },
    password: {
      secureTextEntry: true,
      autoCapitalize: 'none',
      autoCorrect: false,
      returnKeyType: 'send'
    }
  }
};

class Login extends Component {

  componentDidMount() {
    this.props.hideMenu();
  }

  working() {
    if (this.props.working) {
      return (
        <View style={ style.fullScreen }>
          <ActivityIndicator style={ style.working } color={'#AA5585'} size={'large'} />
        </View>
      )
    }
    return true;
  }

  _logIn() {
    let val = this.refs.login.getValue();
    if (val) {
      dismissKeyboard();
      this.props.logInRemote(val);
    } else {
      this.props.alertUserError({ error: true, message: 'Invalid username/password!'});
    }
  }

  render() {
    return (
        <View style={ style.wrapper } >

          <View style={ style.header }>
            <Text style={ style.headerText }>CrowdsourceHelp</Text>
          </View>

          <Text style={ [style.textSmall, style.textError, style.textCenter] }>
            { this.props.message }
          </Text>

          <Form
            ref='login'
            type={ User }
            options={ Options }
          />

          <Button backgroundColor='hsl(110, 33%, 50%)'
            small raised title='LOGIN'
            buttonStyle={ style.buttonTop }
            onPress={ this._logIn.bind(this)}
          />

          <Button backgroundColor='#938'
            small raised title='No account? Sign up here!'
            onPress={() => {
              this.props.alertUserError({ error: false, message: null });
              this.props.navigator.push({ name: 'newuser'});
            }}
          />

          { this.working() }

        </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    error: state.user.error,
    message: state.user.message,
    working: state.user.working
  }
}

export default connect(mapStateToProps)(Login);

