'use strict';
import React, { Component } from 'react';
import { RefreshControl, TouchableHighlight, Stylesheet, Image, View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { SocialIcon } from 'react-native-elements';
import Loading from './loading';
import Decision from '../components/decision';
import Header from '../components/header';
import style from '../public/styles/style';

class IndexPage extends Component {

  componentWillMount() {
    this.props.fetchBinaries()
  }

  _onRefresh() {
    this.props.fetchBinaries()
  }

  decisions() {
    let color = Math.floor(Math.random() * 360);
    let items = [];
    for (var id in this.props.items) {
      items.push(this.props.items[id])
    }
    return items.map( el => {
      color = (color + 90) % 360;
      return (
      <TouchableHighlight
        activeOpacity={0.2}
        underlayColor={'#eee'}
        style={style.wrapper} key={el.id} onPress={() => {
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
    if (this.props.loaded) {
      return (
        <View style={style.wrapper}>
          <Header />
          <ScrollView refreshControl={
            <RefreshControl
              refreshing={this.props.isFetching}
              onRefresh={this._onRefresh.bind(this)}
            />
          }>
              {this.decisions()}
          </ScrollView>
          <SocialIcon type="github"
            onPress={ () => {
              this.props.navigator.push({name: 'new'})
            }}
          />
        </View>
      )
    } else {
      return <Loading />
    }
  }
};

function mapStateToProps(state) {
  if (state.binaries.items) {
    return {
      loaded: true,
      items: state.binaries.items,
      isFetching: state.binaries.isFetching
    };
  } else {
    return {
      loaded: false,
      isFetching: state.binaries.isFetching
    }
  }
}

export default connect(mapStateToProps)(IndexPage);
