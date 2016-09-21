'use strict';

import React, {Component} from 'react';
import {Image, View, Text} from 'react-native';
import { connect } from 'react-redux';


class Item extends Component {
  render() {
    return (
      <View className="ITEM" style={{flex: 1, flexDirection: "row"}}>
        <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} style={{flex: 1}}/>
        <Text style={{flex: 3}}>{this.props.item.text}</Text>
      </View>
      )
  }
}

class Crowdsource extends Component {

  render() {
    console.log(this.props.items);
    let allItems = this.props.items.map( (el,ind) => {
      return <Item item={el} key={ind} />
    });
    return (
        <View className="ITEMBOX" style={{flex: 1, top: 20}}>
          {allItems}
        </View>
      )
  }
};

function mapStateToProps(state) {
  return {
    items: state.items
  };
}

export default connect(mapStateToProps)(Crowdsource);
