import React, { Component } from 'react';
import style from '../public/styles/style';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import { TouchableHighlight, View, Text } from 'react-native';
import { connect } from 'react-redux';
var t = require('tcomb-form-native');

let Form = t.form.Form;

const Binary = t.struct({
  name: t.String,
  content: t.String,
  choiceA: t.String,
  choiceB: t.String
})

export default class DecisionNew extends Component {

  onSubmit() {
    let val = this.refs.form.getValue();
    if (val) {
      console.log(val);
    }
  }

  render() {
    return (
      <View style={style.wrapper}>
        <Form
          ref="form"
          type={Binary}
          options={{}}
        />
        <Button backgroundColor="#2F8"
          small raised title='SUBMIT'
          onPress={this.onSubmit}
        />
      </View>
    )
  }
}

const trash =`<FormLabel>Short Name</FormLabel>
          <FormInput defaultValue="Short name, please" maxLength={32} />
          <FormLabel>Description</FormLabel>
          <FormInput defaultValue="What's the decision to be made?" multiline={true}/>
          <FormLabel>Choice A</FormLabel>
          <FormInput defaultValue="Choice A"/>
          <FormLabel>Choice B</FormLabel>
          <FormInput defaultValue="Choice B" />
          `
