'use strict';
import React, {Component} from 'react';
import thunkMiddleware from 'redux-thunk';
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import IndexPage from './index';
import DecisionShow from './decision_show';
import DecisionNew from './decision_new';
import Login from './login';
import Welcome from './welcome';
import RootReducer from '../reducers';
import { fetchBinaries, vote, fetchBinary } from '../actions/actions';
import { Navigator, Text, AsyncStorage } from 'react-native';
import Reactotron from 'reactotron-react-native';
import createReactotronEnhancer from 'reactotron-redux';
import '../../ReactotronConfig';

Reactotron.log('WELCOME TO THE DESERT OF THE REAL');

const reactotronEnhancer = createReactotronEnhancer(Reactotron);

const store = createStore(RootReducer, compose(reactotronEnhancer, applyMiddleware(thunkMiddleware)));

export default class App extends Component {
  vote(id, choice) {
    return store.dispatch(vote(id, choice));
  }

  fetchBinary(id) {
    return store.dispatch(fetchBinary(id));
  }

  fetchBinaries() {
    return store.dispatch(fetchBinaries());
  }

  checkStore() {
  }

  renderScene(route,navigator) {
    switch (route.name) {
      case 'welcome':
        return <Welcome navigator={navigator} />
      case 'login':
        return <Login navigator={navigator} />
      case 'index':
        return <IndexPage vote={this.vote.bind(this)} fetchBinaries={this.fetchBinaries.bind(this)} fetchBinary={this.fetchBinary.bind(this)} navigator={navigator} />
      case 'show':
        return <DecisionShow vote={this.vote.bind(this)} fetchBinary={this.fetchBinary.bind(this)} id={route.id} navigator={navigator} color={route.color}/>;
      case 'new':
        return <DecisionNew navigator={navigator} />
      default:
        return <Text>ERROR</Text>;
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Navigator
          initialRoute={{name: 'welcome'}}
          renderScene={this.renderScene.bind(this)}
          configureScene={(route) =>
          Navigator.SceneConfigs.HorizontalSwipeJump}
        />
      </Provider>
    )
  }
}
