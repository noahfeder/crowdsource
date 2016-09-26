'use strict';
import React, {Component} from 'react';
import { TouchableHighlight, ScrollView, RefreshControl, View, Text } from 'react-native';
import Loading from './loading';
import style from '../public/styles/style';
import { Button, SideMenu } from 'react-native-elements';
import BackButton from '../components/back_button';
import Header from '../components/header';
import Decision from '../components/decision';
import { connect } from 'react-redux';
import { MenuGuts } from '../components/side_menu';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

class UserShow extends Component {

  componentWillMount() {
    this.props.fetchUserBinaries(this.props.user_id)
  }

  _onRefresh() {
    this.props.refreshUserBinaries(this.props.user_id)
  }

  allItems() {
    let color = Math.floor(Math.random() * 360);
    let items = this.props.items;
    items = items.sort( (a,b) => {
      if (a.expiration < b.expiration) {
        return 1;
      }
      if (a.expiration > b.expiration) {
        return -1;
      }
      return 0;
    });
    return items.map( el => {
      let expired = Math.floor( Date.now() / 1000 ) > el.expiration
      color = (color + 90) % 360;
      return (
      <TouchableHighlight
        activeOpacity={0.2}
        underlayColor={'#eee'}
        style={style.wrapper}
        key={el.id}
        onPress={() => {
          this.props.navigator.push({name: 'show', data: el, id: el.id, color: color})
        }} >
          <View style={style.wrapper} >
            <Decision expired={expired} data={el} id={el.id} color={color} />
          </View>
      </TouchableHighlight>
      )
    });
  }

  render() {
    if (!this.props.loaded) {
      return <Loading />;
    } else {
      return (
        <SideMenu toggled={this.props.toggled} MenuComponent={MenuGuts}>
          <Header toggleMenu={this.props.toggleMenu.bind(this)} />
          <View style={ style.wrapper }>
            <ScrollView refreshControl={
              <RefreshControl
                refreshing={ this.props.isFetching }
                onRefresh={ this._onRefresh.bind(this) }
              />
            }>
              <Text style={ [style.textLarge, style.textCenter, style.redText] }>
                {this.props.username}
              </Text>
              {this.allItems()}
            </ScrollView>
          </View>

        </SideMenu>
      )
    }

  }
}

reactMixin(UserShow.prototype, TimerMixin);

function mapStateToProps(state) {
  if (state.userBinaries.items) {
    return {
      loaded: true,
      items: state.userBinaries.items,
      isFetching: state.userBinaries.isFetching,
      toggled: state.toggleMenu.toggle,
      username: state.userBinaries.items[0].username
    };
  } else {
    return {
      loaded: false,
      isFetching: state.userBinaries.isFetching,
      toggled: state.toggleMenu.toggle
    }
  }
}

export default connect(mapStateToProps)(UserShow);

