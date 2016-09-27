'use strict';
import React, { Component } from 'react';
import { AsyncStorage, TouchableHighlight, Stylesheet, Image, View, Text, ScrollView, BackAndroid } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import style from '../public/styles/style';
import { newStyle } from '../public/styles/form_style';
import { backButton } from './app';
import BackButton from '../components/back_button';
import dismissKeyboard from 'react-native-dismiss-keyboard';

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

  _signUp() {
    let val = this.refs.signup.getValue();
    if (val) {
      if (val.password_confirm !== val.password) {
        this.props.alertUserError({ error: true, message: 'Passwords must match!'});
      } else {
        dismissKeyboard();
        fetch('https://crowdsourcehelp.herokuapp.com/signup', {
          method: 'POST',
          body: JSON.stringify(val)
        })
        .then( response => response.json() )
        .then( json => {
          if (json.error) {
            this.props.alertUserError(json);
          } else {
            AsyncStorage.multiSet([
              ['user_id_csh', String(json.data.id)],
              ['user_name_csh', String(json.data.username)]
            ]).then( () => {
                this.props.loginAsync(json.data.id, json.data.username);
                this.props.navigator.push({ name: 'index'});
            })
          }
        })
        .catch( error => console.error(error) )
      }
    } else {
      this.props.alertUserError({ error: true, message: 'Invalid username/password!'});
    }
  }

  render() {
    return (
        <View style={ style.wrapper } >
          <View style={ style.header }>
            <Text style={ style.headerText }>CROWDSOURCE</Text>
          </View>
          <Text style={[style.textSmall, style.textError]}>{ this.props.message }</Text>
          <Form
            ref="signup"
            type={ NewUser }
            options={ Options }
          />
          <Button backgroundColor="#2F8"
            small raised title='SIGNUP'
            buttonStyle={ style.buttonTop }
            onPress={ this._signUp.bind(this)}
          />
          <BackButton  />
        </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    error: state.user.error,
    message: state.user.message
  }
}

export default connect(mapStateToProps)(SignUp);
