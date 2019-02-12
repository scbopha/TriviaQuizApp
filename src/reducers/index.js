import {
  createReduxContainer, createReactNavigationReduxMiddleware, createNavigationReducer
} from 'react-navigation-redux-helpers';
import { NavigationActions } from 'react-navigation';
import {connect} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import AppNavigator from '../navigators/AppNavigator';
import sagas from '../sagas';
import { ApiReducer } from './ApiReducer';

const navReducer = createNavigationReducer(AppNavigator);

const appReducer = combineReducers({
  nav: navReducer,
  Api: ApiReducer
});

// Create Middleware
const middleware = createReactNavigationReduxMiddleware(
  state => state.nav
);
const sagaMiddleware = createSagaMiddleware();

const App = createReduxContainer(AppNavigator);
const mapStateToProps = (state) => ({
  state: state.nav
});
const AppWithNavigationState = connect(mapStateToProps)(App);

// Create Store
const store = createStore(
  appReducer,
  applyMiddleware(middleware, sagaMiddleware),
);

sagaMiddleware.run(sagas);

export {store, AppWithNavigationState};