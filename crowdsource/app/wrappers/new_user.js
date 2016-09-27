'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, ActivityIndicator, View, Text, BackAndroid } from 'react-native';
import { Button } from 'react-native-elements';
import dismissKeyboard from 'react-native-dismiss-keyboard';

import { backButton } from './app';

import BackButton from '../components/back_button';

import style from '../public/styles/style';
import { newStyle } from '../public/styles/form_style';

import t from 'tcomb-form-native';

let Form = t.form.Form;

const NewUser = t.struct({
  username: t.String,
  password: t.String,
  password_confirm: t.String
});

const Options = {
  stylesheet: newStyle,
  auto: 'placeholders',
  fields: {
    username: {
      autoCapitalize: 'none',
      autoCorrect: false,
      returnKeyType: 'next',
      help: '    Maximum length 20, NOT case sensitive'
    },
    password: {
      secureTextEntry: true,
      autoCapitalize: 'none',
      autoCorrect: false,
      help: '    Minimum length 8, case sensitive'
    },
    password_confirm: {
      secureTextEntry: true,
      autoCapitalize: 'none',
      autoCorrect: false,
      returnKeyType: 'send',
      placeholder: 'Confirm password',
      help: '    Must match password'
    }
  }
};

class SignUp extends Component {

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', backButton);
    this.props.hideMenu();
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', backButton);
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

  _signUp() {
    let val = this.refs.signup.getValue();
    if (val) {
      if (val.password_confirm !== val.password) {
        this.props.alertUserError({ error: true, message: 'Passwords must match!'});
      } else {
        dismissKeyboard();
        this.props.signIn(val);
      }
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
            ref='signup'
            type={ NewUser }
            options={ Options }
          />

          <Button backgroundColor='#2F8'
            small raised title='SIGNUP'
            buttonStyle={ style.buttonTop }
            onPress={ this._signUp.bind(this)}
          />

          <BackButton  />

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

export default connect(mapStateToProps)(SignUp);
