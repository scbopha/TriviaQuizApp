import {createStackNavigator} from 'react-navigation';
import React from 'react';
import StartScreen from '../screens/StartScreen';

export default createStackNavigator({
  Start: StartScreen
},
{
  initialRouteName: 'Start',
});