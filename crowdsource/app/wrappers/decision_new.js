'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableHighlight, View, Text, Dimensions, BackAndroid, ActivityIndicator } from 'react-native';
import { Button, SideMenu } from 'react-native-elements';
import dismissKeyboard from 'react-native-dismiss-keyboard';

import { backButton } from './app';
import Loading from './loading';

import BackButton from '../components/back_button';
import { MenuGuts } from '../components/side_menu';
import Header from '../components/header';

import style from '../public/styles/style';

import t from 'tcomb-form-native';
import { Binary, formOptions } from '../public/styles/form_style';

class DecisionNew extends Component {

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', backButton);
    this.props.hideMenu();
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', backButton);
  }

  onSubmit() {
    let val = this.refs.form.getValue();
    if (val) {
      dismissKeyboard();
      this.props.createBinary(val);
    }
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

  render() {
    if (this.props.loaded) {

      let Form = t.form.Form;

      const Value = {
        id: this.props.id,
        type: 'hours'
      }

      return (
        <SideMenu  toggled={ this.props.toggled } MenuComponent={ MenuGuts }>

          <Header toggleMenu={ this.props.toggleMenu.bind(this)} />

          <View style={ style.wrapper }>

            <Form
              ref='form'
              type={ Binary }
              value={ Value }
              options={ formOptions }
            />

            <Button backgroundColor='#2F8'
              small raised title='SUBMIT'
              buttonStyle={ style.buttonTop }
              onPress={ this.onSubmit.bind(this) }
            />

            <BackButton  />

            <View style={ style.spacer } />

            { this.working() }

          </View>
        </SideMenu>
      )
    } else {
      return <Loading />;
    }
  }
}

function mapStateToProps(state) {
  if (state.user) {
    return {
      loaded: true,
      id: state.user.id,
      toggled: state.toggleMenu.toggle,
      working: state.activeBinary.creating
    };
  } else {
    return {
      loaded: false,
      toggled: state.toggleMenu.toggle,
      working: state.activeBinary.creating
    };
  }
}

export default connect(mapStateToProps)(DecisionNew);
