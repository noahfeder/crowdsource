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
import Header from '../components/header';
import RootReducer from '../reducers';
import { fetchBinaries, vote, fetchBinary, logInUser, toggleMenu } from '../actions/actions';
import { Navigator, Text, AsyncStorage } from 'react-native';
import { SideMenu } from 'react-native-elements';
import { MenuGuts } from '../components/side_menu';
import style from '../public/styles/style';

const store = createStore(RootReducer,applyMiddleware(thunkMiddleware));

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

  loginAsync(id) {
    return store.dispatch(logInUser(id))
  }

  toggleMenu() {
    return store.dispatch(toggleMenu());
  }

  renderScene(route,navigator) {
    switch (route.name) {
      case 'welcome':
        return <Welcome navigator={navigator} loginAsync={this.loginAsync.bind(this)} />
      case 'login':
        return <Login navigator={navigator} loginAsync={this.loginAsync.bind(this)} />
      case 'index':
        return <IndexPage toggled={false} toggleMenu={this.toggleMenu.bind(this)} vote={this.vote.bind(this)} fetchBinaries={this.fetchBinaries.bind(this)} fetchBinary={this.fetchBinary.bind(this)} navigator={navigator} />
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
        <SideMenu toggled={store.toggled} MenuComponent={MenuGuts}>
          <Header toggleMenu={this.toggleMenu.bind(this)} />
          <Navigator
            initialRoute={{name: 'welcome'}}
            renderScene={this.renderScene.bind(this)}
            configureScene={(route) =>
            Navigator.SceneConfigs.HorizontalSwipeJump}
          />
        </SideMenu>
      </Provider>
    )
  }
}
