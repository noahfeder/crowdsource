import React, { Component } from 'react';
import style from '../public/styles/style';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import { TouchableHighlight, View, Text } from 'react-native';
import { connect } from 'react-redux';

export default class DecisionNew extends Component {
  render() {
    return (
      <View style={style.wrapper}>
        <FormLabel>Short Name</FormLabel>
        <FormInput defaultValue="Short name, please" maxLength={32} />
        <FormLabel>Description</FormLabel>
        <FormInput defaultValue="What's the decision to be made?" multiline={true}/>
        <FormLabel>Choice A</FormLabel>
        <FormInput defaultValue="Choice A"/>
        <FormLabel>Choice B</FormLabel>
        <FormInput defaultValue="Choice B" />
        <Button backgroundColor="#2F8"
            small raised title='SUBMIT' />
      </View>
    )
  }
}
