'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableHighlight, ScrollView, RefreshControl, View, Text, BackAndroid } from 'react-native';
import { Button, SideMenu } from 'react-native-elements';

import Loading from './loading';

import { backButton } from './app';
import Header from '../components/header';
import Decision from '../components/decision';
import { MenuGuts } from '../components/side_menu';
import style from '../public/styles/style';

import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

class UserShow extends Component {

  componentWillMount() {
    this.props.fetchUserBinaries(this.props.user_id)
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', backButton);
    this.props.hideMenu();
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', backButton);
  }

  _onRefresh() {
    this.props.refreshUserBinaries(this.props.user_id)
  }

  sortByExpiration(arr) {
    return arr.sort( (a,b) => {
      if (a.expiration < b.expiration) {
        return 1;
      }
      if (a.expiration > b.expiration) {
        return -1;
      }
      return 0;
    });
  }

  header() {
    if (this.props.error) {
      return (
        <Text style={ [style.textMedium, style.textCenter, style.textPadded ] } >no decisions.</Text>
      )
    }
    if (this.props.items.length > 1) {
      return (
        <Text style={ [style.textMedium, style.textCenter, style.textPadded ] }>
          { this.props.items.length } decisions.
        </Text>
      )
    }
    return (
      <Text style={ [style.textMedium, style.textCenter, style.textPadded ] }>1 decision.</Text>
    )
  }

  allItems() {
    if (this.props.error) {
      return (
        <Button
          small raised title='Ask for help!'
          onPress={ () => this.props.navigator.push({ name: 'new' }) }
          backgroundColor={'#938'} />
      )
    } else {
      let color = Math.floor(Math.random() * 360);
      let sortedItems = this.sortByExpiration(this.props.items);
      return sortedItems.map( el => {
        let expired = Math.floor( Date.now() / 1000 ) > el.expiration
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
            <View style={ style.wrapper } >
              <Decision expired={ expired } data={ el } id={ el.id } color={ color } />
            </View>
        </TouchableHighlight>
        )
      });
    }
  }

  render() {
    if (!this.props.loaded) {
      return <Loading />;
    } else {
      return (
        <SideMenu toggled={ this.props.toggled } MenuComponent={ MenuGuts }>
          <Header toggleMenu={ this.props.toggleMenu.bind(this) } />
          <View style={ style.wrapper }>
            <ScrollView refreshControl={
              <RefreshControl colors={ ['#AA5585'] } tintColor={ '#AA5585' }
                refreshing={ this.props.isFetching }
                onRefresh={ this._onRefresh.bind(this) }
              />
            }>
              <Text style={ [style.textMedium, style.textCenter, {marginHorizontal: 15} ] }>
                { this.props.username } needed help with
              </Text>
              { this.header() }

              { this.allItems() }
            </ScrollView>
          </View>

        </SideMenu>
      )
    }

  }
}

reactMixin(UserShow.prototype, TimerMixin);

function mapStateToProps(state) {
  if (!state.userBinaries.isFetching) {
    return {
      loaded: true,
      error: state.userBinaries.error,
      items: state.userBinaries.items,
      toggled: state.toggleMenu.toggle,
      isFetching: state.userBinaries.isFetching,
      message: state.userBinaries.message
    };
  } else {
    return {
      loaded: false,
      toggled: state.toggleMenu.toggle,
      isFetching: state.userBinaries.isFetching
    }
  }
}

export default connect(mapStateToProps)(UserShow);

