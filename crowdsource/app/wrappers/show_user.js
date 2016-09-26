'use strict';
import React, {Component} from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import Loading from './loading';
import style from '../public/styles/style';
import { Button, SideMenu } from 'react-native-elements';
import BackButton from '../components/back_button';
import Header from '../components/header';
import { connect } from 'react-redux';
import { MenuGuts } from '../components/side_menu';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

class UserShow extends Component {

  componentWillMount() {
    this.props.fetchUserBinaries(this.props.user_id)
  }

  componentDidMount() {
    this.setInterval( () => {
      this.props.refreshUserBinaries(this.props.user_id)
    }, 30000)
  }

  allItems() {
    let color = Math.floor(Math.random() * 360);
    let items = this.prop.items;
    items = items.sort( (a,b) => {
      if (a.expiration > b.expiration) {
        return 1;
      }
      if (a.expiration < b.expiration) {
        return -1;
      }
      return 0;
    });
    return items.map( el => {
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
            <Decision data={el} id={el.id} color={color} />
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
            <Text style={ [style.textLarge, style.textCenter] }>{this.props.username}</Text>
            {this.allItems()}
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
      username: state.userBinaries[0].username
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

