import React, { Component } from 'react';
import style from '../public/styles/style';
import { Button } from 'react-native-elements';
import { TouchableHighlight, View, Text } from 'react-native';
import BackButton from '../components/back_button';
import { connect } from 'react-redux';
import t from 'tcomb-form-native';

let Form = t.form.Form;

const Binary = t.struct({
  name: t.String,
  content: t.String,
  choiceA: t.String,
  choiceB: t.String
});

const formOptions = {
  auto: 'placeholders',
  fields: {
    name: {
      autoCapitalize: 'words',
      autoCorrect: true,
      returnKeyType: 'next',
      maxLength: 32
    },
    content: {
      multiline: true,
      autoCapitalize: 'sentences',
      autoCorrect: true,
      returnKeyType: 'next'
    },
    choiceA: {
      autoCapitalize: 'words',
      maxLength: 16
    },
    choiceB: {
      autoCapitalize: 'words',
      maxLength: 16
    }
  }
};

export default class DecisionNew extends Component {

  onSubmit() {
    let val = this.refs.form.getValue()
    fetch('https://6288b895.ngrok.io/binaries', {
      method: 'POST',
      body: JSON.stringify(val)
    }).then( response => response.json() )
      .then( json => {
        this.props.navigator.push({
          name: 'show',
          id: json.id
        })
      })
      .catch( error => console.error(error))
  }

  render() {
    return (
      <View style={style.wrapper}>
        <Form
          ref="form"
          type={Binary}
          options={formOptions}
        />
        <Button backgroundColor="#2F8"
          small raised title='SUBMIT'
          onPress={this.onSubmit.bind(this)}
        />
        <BackButton navigator={this.props.navigator} />
      </View>
    )
  }
}

