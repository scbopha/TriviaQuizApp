import React from "react";
import { BackHandler, SafeAreaView } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from 'react-redux'
import { store, AppWithNavigationState } from '../reducers';

/* your other setup code here! this is not a runnable snippet */

class ReduxNavigator extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }

    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    /* more setup code here! this is not a runnable snippet */ 
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <AppWithNavigationState navigation={this.props.navigation} />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => ({ nav: state.nav });
const ReduxNatigatorState = connect(mapStateToProps)(ReduxNavigator);
export {store, ReduxNatigatorState};