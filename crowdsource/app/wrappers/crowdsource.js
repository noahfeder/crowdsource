'use strict';

import React, { Component } from 'react';
import { Stylesheet, Image, View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Decision from '../components/decision_index';
import Header from '../components/header';
import style from '../public/styles/style';

class Crowdsource extends Component {

  render() {
    let decisions = this.props.decisions.map( (el,ind) => {
      return <Decision style={el.style} key={ind} ord={el.ord} text={el.text} />
    });
    return (
        <ScrollView style={style.wrapper}>
          <Header />
          {decisions}
        </ScrollView>
      )
  }
};

function mapStateToProps(state) {
  return {
    decisions: state.decisions
  };
}

export default connect(mapStateToProps)(Crowdsource);
