'use strict';
import React, {Component} from 'react';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import IndexPage from './index';
import DecisionShow from './decision_show';
import reducers from '../reducers';
import { fetchBinaries } from '../actions/actions';
import { Navigator, Text } from 'react-native';

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
store.dispatch(fetchBinaries());

export default class App extends Component {

  renderScene(route,navigator) {
    switch (route.name) {
      case 'index':
        return <IndexPage navigator={navigator} renderScene={this.renderScene.bind(this)}/>
      case 'show':
        return <DecisionShow navigator={navigator} data={route.data} color={route.color}/>;
      default:
        return <Text>ERROR</Text>;
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Navigator
          initialRoute={{name: 'index'}}
          renderScene={this.renderScene.bind(this)}
        />
      </Provider>
    )
  }
}
