'use strict';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { TouchableHighlight, Stylesheet, Image, View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Decision from '../components/decision';
import Header from '../components/header';
import style from '../public/styles/style';
import  { newScene } from '../actions/actions';

class IndexPage extends Component {

  decisions() {
    let color = Math.floor(Math.random() * 360);
    return this.props.items.map( el => {
      let thisBackgroundColor = color;
      color = (color + 90) % 360;
      let thisRoute = {
        name: 'show'
      }
      return (
      <TouchableHighlight key={el.id} onPress={() => {
          console.log('click');
          this.props.navigator.push({name: 'show', data: el, color: color})
          }}>
          <View>
            <Decision data={el} color={color} />
          </View>
      </TouchableHighlight>
      )
    });
  }

  render() {
    return (
        <View style={style.wrapper}>
          <Header />
          <ScrollView>
              {this.decisions()}
          </ScrollView>
        </View>
      )
  }
};

function mapStateToProps(state) {
  return {
    items: state.binaries.items,
    scene: state.scene
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ newScene: newScene }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
