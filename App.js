import React, {Component} from 'react';
import { Provider } from 'react-redux';
import {store, ReduxNatigatorState} from './src/navigators/ReduxNavigator'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ReduxNatigatorState />
      </Provider>
    );
  }
}