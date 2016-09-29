'use strict';
// React building blocks
  import React, { Component } from 'react';
  import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
  import { Provider } from 'react-redux';
  import thunkMiddleware from 'redux-thunk';
  import { Navigator, Text, AsyncStorage } from 'react-native';

// 'Smart' wrapper components, created by me
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
  import { fetchBinaries, refreshBinaries } from '../actions/binaries'; // for index scene
  import { vote, createBinary, fetchBinary, refreshBinary } from '../actions/active_binary'; // for binary show scene
  import { fetchUserBinaries, refreshUserBinaries } from '../actions/user_binaries'; // for user show scene
  import { logInLocal, logInRemote, signIn, alertUserError } from '../actions/user'; // for login and signup pages
  import { toggleMenu, hideMenu } from '../actions/toggle_menu'; // for most scenes' side menu


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

  createBinary(form) {
    return store.dispatch(createBinary(form));
  }

  fetchBinaries() {
    return store.dispatch(fetchBinaries());
  }

  refreshBinaries() {
    return store.dispatch(refreshBinaries());
  }

  logInLocal(id, name) {
    return store.dispatch(logInLocal(id, name));
  }

  logInRemote(form) {
    return store.dispatch(logInRemote(form));
  }

  signIn(form) {
    return store.dispatch(signIn(form));
  }

  alertUserError(response) {
    return store.dispatch(alertUserError(response));
  }

  toggleMenu() {
    return store.dispatch(toggleMenu());
  }

  hideMenu() {
    return store.dispatch(hideMenu());
  }

  // the navigator, aka the router, for the entire app
  renderScene(route,navigator) {
    nav = navigator;
    switch (route.name) {
      case 'welcome':
        return (
          <Welcome
            navigator={ navigator }
            hideMenu={ this.hideMenu.bind(this) }
            logInLocal={ this.logInLocal.bind(this) } />
          );
      case 'login':
        return (
          <Login
            navigator={ navigator }
            hideMenu={ this.hideMenu.bind(this) }
            alertUserError={ this.alertUserError.bind(this) }
            logInRemote={ this.logInRemote.bind(this) } />
          );
      case 'newuser':
        return (
          <SignUp
            navigator={ navigator }
            hideMenu={ this.hideMenu.bind(this) }
            alertUserError={ this.alertUserError.bind(this) }
            signIn={ this.signIn.bind(this) } />
          );
      case 'index':
        return (
          <IndexPage
            navigator={ navigator }
            toggleMenu={ this.toggleMenu.bind(this) }
            hideMenu={ this.hideMenu.bind(this) }
            fetchBinaries={ this.fetchBinaries.bind(this) }
            refreshBinaries={ this.refreshBinaries.bind(this) } />
          );
      case 'show':
        return (
          <DecisionShow
            navigator={ navigator }
            toggleMenu={ this.toggleMenu.bind(this) }
            hideMenu={ this.hideMenu.bind(this) }
            vote={ this.vote.bind(this) }
            fetchBinary={ this.fetchBinary.bind(this) }
            refreshBinary={ this.refreshBinary.bind(this) }
            binary_id={ route.id }
            color={ route.color } />
          );
      case 'new':
        return (
          <DecisionNew
            navigator={ navigator }
            toggleMenu={ this.toggleMenu.bind(this) }
            hideMenu={ this.hideMenu.bind(this) }
            createBinary={ this.createBinary.bind(this) } />
          );
      case 'showuser':
        return (
          <UserShow
            navigator={ navigator }
            hideMenu={ this.hideMenu.bind(this) }
            toggleMenu={ this.toggleMenu.bind(this) }
            user_id={ route.user_id }
            username={ route.username }
            fetchUserBinaries={ this.fetchUserBinaries.bind(this) }
            refreshUserBinaries={ this.refreshUserBinaries.bind(this) } />
          );
      default:
        return <Text>ERROR</Text>;
    }
  }

  render() {
    return (
      <Provider store={ store }>
        <Navigator
          initialRoute={{ name: 'welcome'}}
          renderScene={ this.renderScene.bind(this)}
          configureScene={(route) =>
          Navigator.SceneConfigs.FloatFromRight }
        />
      </Provider>
    )
  }
}

const backButton = function() {
  let routes = nav.getCurrentRoutes();
  if (routes.length > 1) {
    nav.pop();
    return true;
  }
  if (routes.length === 1 && routes[0].name !== 'index') {
    nav.push({ name: 'index' });
    return true;
  }
  return false;
}

export { nav, backButton };
