'use strict';
// React building blocks
  import React, {Component} from 'react';
  import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
  import { Provider } from 'react-redux';
  import thunkMiddleware from 'redux-thunk';
  import { Navigator, Text, AsyncStorage } from 'react-native';

// "Smart" wrapper components, created by me
  import IndexPage from './index';
  import DecisionShow from './decision_show';
  import DecisionNew from './decision_new';
  import Login from './login';
  import Welcome from './welcome';
  import SignUp from './new_user';
  import UserShow from './show_user';
  import Header from '../components/header';

// Reducers and Actions for redux store
  import RootReducer from '../reducers';
  import {
    fetchBinaries, refreshBinaries, // for index scene
    vote, fetchBinary, refreshBinary, // for binary show scene
    fetchUserBinaries, refreshUserBinaries, // for user show scene
    logInUser, alertUserError, // for login and signup pages
    toggleMenu // for most scenes' side menu
  } from '../actions/actions';

// setup redux store, happens once per session
const store = createStore(RootReducer,applyMiddleware(thunkMiddleware));

// needed to pass navigator to side menu
let nav;

export class App extends Component {
  // all store-attached actions to be passed down as props
  fetchUserBinaries(user_id) {
    return store.dispatch(fetchUserBinaries(user_id));
  }

  refreshUserBinaries(user_id) {
    return store.dispatch(refreshUserBinaries(user_id));
  }

  vote(binary_id, choice, user_id) {
    return store.dispatch(vote(binary_id, choice, user_id));
  }

  fetchBinary(id) {
    return store.dispatch(fetchBinary(id));
  }

  refreshBinary(id) {
    return store.dispatch(refreshBinary(id));
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

  // the navigator, aka the router, for the entire app
  renderScene(route,navigator) {
    nav = navigator;
    switch (route.name) {
      case 'welcome':
        return <Welcome navigator={navigator} loginAsync={this.loginAsync.bind(this)} />;
      case 'login':
        return <Login navigator={navigator} alertUserError={this.alertUserError.bind(this)} loginAsync={this.loginAsync.bind(this)} />;
      case 'newuser':
        return <SignUp navigator={navigator} alertUserError={this.alertUserError.bind(this)} loginAsync={this.loginAsync.bind(this)} />;
      case 'index':
        return <IndexPage toggleMenu={this.toggleMenu.bind(this)} vote={this.vote.bind(this)} fetchBinaries={this.fetchBinaries.bind(this)} refreshBinaries={this.refreshBinaries.bind(this)} fetchBinary={this.fetchBinary.bind(this)} navigator={navigator} />
      case 'show':
        return <DecisionShow toggleMenu={this.toggleMenu.bind(this)} vote={this.vote.bind(this)} fetchBinary={this.fetchBinary.bind(this)} refreshBinary={this.refreshBinary.bind(this)} binary_id={route.id} navigator={navigator} color={route.color}/>;
      case 'new':
        return <DecisionNew toggleMenu={this.toggleMenu.bind(this)} navigator={navigator} />;
      case 'showuser':
        return <UserShow user_id={route.user_id} fetchUserBinaries={this.fetchUserBinaries.bind(this)} refreshUserBinaries={this.refreshUserBinaries.bind(this)} toggleMenu={this.toggleMenu.bind(this)} navigator={navigator} />
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

export { nav };
