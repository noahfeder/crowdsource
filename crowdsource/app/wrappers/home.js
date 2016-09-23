'use strict';
import React, { Component } from 'react';
import { TouchableHighlight, Stylesheet, Image, View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import Header from '../components/header';
import style from '../public/styles/style';

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

class Home extends Component {

  _logIn() {
    let val = this.refs.login.getValue();
    if (val) {
      fetch('https://6288b895.ngrok.io/login', {
      method: 'POST',
      body: JSON.stringify(val)
    }).then( response => response.json() )
      .then( json => {
        if (!json.error) {
          this.props.navigator.push({name: 'index'})
        }
      } )
      .catch( error => console.error(error) )
    }
  }

  render() {
    return (
      <View style={[style.wrapper, {backgroundColor: 'blue'}]} >
          <Header />
          <Form
            ref="login"
            type={User}
            options={Options}
          />
          <Button backgroundColor="#2F8"
            small raised title='LOGIN'
            onPress={this._logIn.bind(this)}
          />
        </View>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Home);