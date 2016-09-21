import React, {Component} from 'react';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import IndexPage from './crowdsource'
import reducers from '../reducers';
import { fetchBinaries } from '../actions/actions';
import Router from 'react-native-simple-router';

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
store.dispatch(fetchBinaries());

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router hideNavigationBar={true} firstRoute={{name: 'Home', component: IndexPage}} />
      </Provider>
    )
  }
}
