'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, TouchableHighlight, Stylesheet, Image, View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import style from '../public/styles/style';
import dismissKeyboard from 'react-native-dismiss-keyboard';

import t from 'tcomb-form-native';

let Form = t.form.Form;

const User = t.struct({
  username: t.String,
  password: t.String
});

const Options = {
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

  _logIn() {
    let val = this.refs.login.getValue();
    if (val) {
      dismissKeyboard();
      fetch('https://f2ba03b6.ngrok.io/login', {
      method: 'POST',
      body: JSON.stringify(val)
    }).then( response => response.json() )
      .then( json => {
        if (json.error) {
          this.props.alertUserError(json);
        } else {
          AsyncStorage.setItem('user_id_csh', String(json.data.id)).then( () => {
            AsyncStorage.setItem('user_name_csh', String(json.data.username)).then( () => {
              this.props.loginAsync(json.data.id, json.data.username);
              this.props.navigator.push({name: 'index'});
            })
          })
        }
      })
      .catch( error => console.error(error) )
    }
  }

  render() {
    return (
        <View style={style.wrapper} >
          <View style={style.header}>
            <Text style={style.headerText}>CROWDSOURCE</Text>
          </View>
          <Text style={[style.textSmall, {height: 20, color: 'red'}]}>{this.props.message}</Text>
          <Form
            ref="login"
            type={User}
            options={Options}
          />
          <Button backgroundColor="#2F8"
            small raised title='LOGIN'
            onPress={this._logIn.bind(this)}
          />
          <Button backgroundColor="#938"
            small raised title='SIGNUP'
            onPress={() => this.props.navigator.push({name: 'user'})}
          />
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

export default connect(mapStateToProps)(Login);

