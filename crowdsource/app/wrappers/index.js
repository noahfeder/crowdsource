'use strict';
import React, { Component } from 'react';
import { RefreshControl, TouchableHighlight, View, Text, ScrollView, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { SocialIcon, SideMenu } from 'react-native-elements';
import Loading from './loading';
import Decision from '../components/decision';
import Header from '../components/header';
import { MenuGuts } from '../components/side_menu';
import style from '../public/styles/style';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

class IndexPage extends Component {

  componentWillMount() {
    this.props.fetchBinaries()
  }

  componentDidMount() {
    this.props.hideMenu();
  }

  _onRefresh() {
    this.props.refreshBinaries()
  }

  sortItems(arr) {
    return arr.sort( (a,b) => {
      if (a.expiration > b.expiration) {
        return 1;
      }
      if (a.expiration < b.expiration) {
        return -1;
      }
      return 0;
    })
  }

  decisions() {
    let color = Math.floor(Math.random() * 360);
    let items = [];
    for (let id in this.props.items) {
      items.push(this.props.items[id])
    }
    items = this.sortItems(items);
    return items.map( el => {
      color = (color + 137.5) % 360;
      return (
      <TouchableHighlight
        activeOpacity={ 0.2 }
        underlayColor={'#eee'}
        style={ style.wrapper }
        key={ el.id }
        onPress={() => {
          this.props.navigator.push({ name: 'show', data: el, id: el.id, color: color })
        }} >
            <Decision data={ el } id={ el.id } color={ color } />
      </TouchableHighlight>
      )
    });
  }

  render() {
    if (this.props.loaded) {
      return (
        <SideMenu toggled={ this.props.toggled } MenuComponent={ MenuGuts } >
          <Header toggleMenu={ this.props.toggleMenu.bind(this) } />
          <View style={ style.wrapper }>
            <ScrollView refreshControl={
              <RefreshControl
                refreshing={ this.props.isFetching }
                onRefresh={ this._onRefresh.bind(this) }
              />
            }>
                { this.decisions()}
            </ScrollView>
          </View>
        </SideMenu>
      )
    } else {
      return <Loading />
    }
  }
};

reactMixin(IndexPage.prototype, TimerMixin);

function mapStateToProps(state) {
  if (state.binaries.items) {
    return {
      loaded: true,
      items: state.binaries.items,
      isFetching: state.binaries.isFetching,
      toggled: state.toggleMenu.toggle
    };
  } else {
    return {
      loaded: false,
      isFetching: state.binaries.isFetching,
      toggled: state.toggleMenu.toggle
    }
  }
}

export default connect(mapStateToProps)(IndexPage);
