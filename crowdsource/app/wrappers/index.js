'use strict';
import React, { Component } from 'react';
import { TouchableHighlight, Stylesheet, Image, View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Decision from '../components/decision';
import Header from '../components/header';
import style from '../public/styles/style';
import  { newScene } from '../actions/actions';
import Reactotron from 'reactotron-react-native';
import '../../ReactotronConfig';
class IndexPage extends Component {

  componentWillMount() {
    () => this.props.fetchBinaries()
  }

  decisions() {
    let color = Math.floor(Math.random() * 360);
    let items = [];
    for (var id in this.props.items) {
      items.push(this.props.items[id])
    }
    return items.map( el => {
      let thisBackgroundColor = color;
      color = (color + 90) % 360;
      return (
      <TouchableHighlight style={style.wrapper} key={el.id} onPress={() => {
          this.props.navigator.push({name: 'show', data: el, id: el.id, color: color})
          }}>
          <View style={style.wrapper} >
            <Decision data={el} id={el.id} color={color} />
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
    items: state.binaries.items
  };
}

export default connect(mapStateToProps)(IndexPage);
