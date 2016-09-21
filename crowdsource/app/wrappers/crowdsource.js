'use strict';
import React, { Component } from 'react';
import { Stylesheet, Image, View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Decision from '../components/decision_index';
import Header from '../components/header';
import style from '../public/styles/style';
import DecisionShow from '../wrappers/decision_show';

class IndexPage extends Component {
  decisions() {
    let hue = Math.floor(Math.random() * 360);
    return this.props.items.map( el => {
      let thisBackgroundColor = hue;
      hue = (hue + 90) % 360;
      return (
        <Decision key={el.id} data={el} color={hue} />
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
    items: state.binaries.items
  };
}

export default connect(mapStateToProps)(IndexPage);
