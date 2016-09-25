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
import SignUp from './new_user';
import Header from '../components/header';
import RootReducer from '../reducers';
import { fetchBinaries, refreshBinaries, vote, fetchBinary, logInUser, toggleMenu, alertUserError } from '../actions/actions';
import { Navigator, Text, AsyncStorage } from 'react-native';

const store = createStore(RootReducer,applyMiddleware(thunkMiddleware));
let nav;

export class App extends Component {

  vote(binary_id, choice, user_id) {
    return store.dispatch(vote(binary_id, choice, user_id));
  }

  fetchBinary(id) {
    return store.dispatch(fetchBinary(id));
  }

  fetchBinaries() {
    return store.dispatch(fetchBinaries());
  }

  refreshBinaries() {
    return store.dispatch(refreshBinaries());
  }

  loginAsync(id, name) {
    return store.dispatch(logInUser(id, name))
  }

  alertUserError(response) {
    return store.dispatch(alertUserError(response));
  }

  toggleMenu() {
    return store.dispatch(toggleMenu());
  }

  renderScene(route,navigator) {
    nav = navigator;
    switch (route.name) {
      case 'welcome':
        return <Welcome navigator={navigator} loginAsync={this.loginAsync.bind(this)} />;
      case 'login':
        return <Login navigator={navigator} alertUserError={this.alertUserError.bind(this)} loginAsync={this.loginAsync.bind(this)} />;
      case 'user':
        return <SignUp navigator={navigator} alertUserError={this.alertUserError.bind(this)} loginAsync={this.loginAsync.bind(this)} />;
      case 'index':
        return <IndexPage toggleMenu={this.toggleMenu.bind(this)} vote={this.vote.bind(this)} fetchBinaries={this.fetchBinaries.bind(this)} refreshBinaries={this.refreshBinaries.bind(this)} fetchBinary={this.fetchBinary.bind(this)} navigator={navigator} />
      case 'show':
        return <DecisionShow toggleMenu={this.toggleMenu.bind(this)} vote={this.vote.bind(this)} fetchBinary={this.fetchBinary.bind(this)} binary_id={route.id} navigator={navigator} color={route.color}/>;
      case 'new':
        return <DecisionNew toggleMenu={this.toggleMenu.bind(this)} navigator={navigator} />;
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
          Navigator.SceneConfigs.FloatFromRight}
        />
      </Provider>
    )
  }
}
export {nav};
