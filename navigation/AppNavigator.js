import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import hs from '../screens/HomeScreen';
import ls from '../screens/LoginScreen';
import als from '../screens/AuthLoadingScreen';
const HomeScreen = createStackNavigator({HomeScreen: hs});
const LoginScreen = createStackNavigator({ LoginScreen: ls });
const AuthLoadingScreen = createStackNavigator({ AuthLoadingScreen: als})

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  AuthLoading: AuthLoadingScreen,
  App: HomeScreen,
  Auth: LoginScreen
},
{
    initialRouteNanme: 'AuthLoading'
}
));