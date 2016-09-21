import React, {Component} from 'react';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Crowdsource from './crowdsource'
import reducers from '../reducers';
import { fetchBinaries } from '../actions/actions';
import { Navigator } from 'react-native';

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
store.dispatch(fetchBinaries());

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator initialRoute={{title: 'Home', index: 0}}
          renderScene={(route,navigator) => {
            return <Crowdsource />
          }} />
      </Provider>
    );
  }
}
