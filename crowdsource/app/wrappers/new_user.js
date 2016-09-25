'use strict';
import React, { Component } from 'react';
import { AsyncStorage, TouchableHighlight, Stylesheet, Image, View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import style from '../public/styles/style';
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
      autoCorrect: false
    },
    password_confirm: {
      secureTextEntry: true,
      autoCapitalize: 'none',
      autoCorrect: false,
      returnKeyType: 'send'
    }
  }
};

class SignUp extends Component {

  _signUp() {
    let val = this.refs.signup.getValue();
    if (val) {
      if (val.password_confirm !== val.password) {
        this.props.alertUserError({error: true, message: 'Passwords must match!'});
      } else {
        dismissKeyboard();
        fetch('https://f2ba03b6.ngrok.io/signup', {
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
                this.props.navigator.push({name: 'index'});
            })
          }
        })
        .catch( error => console.error(error) )
      }
    } else {
      this.props.alertUserError({error: true, message: 'Invalid username/password!'});
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
            ref="signup"
            type={NewUser}
            options={Options}
          />
          <Button backgroundColor="#2F8"
            small raised title='SIGNUP'
            onPress={this._signUp.bind(this)}
          />
          <BackButton navigator={this.props.navigator} />
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
