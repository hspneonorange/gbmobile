import React from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {Asset} from 'expo';
import {
    createSwitchNavigator,
    createAppContainer,
    createDrawerNavigator,
    createBottomTabNavigator,
    createStackNavigator,
} from 'react-navigation';
import LoginScreen from '@screens/LoginScreen';
import SelectEventScreen from '@screens/SelectEventScreen';
import {SearchStack} from '@screens/Search';
import {CommissionStack} from '@screens/Commission';
import {SalesStack} from '@screens/Sales';
import {SettingsStack} from '@screens/Settings';
import NavigationService from '@components/NavigationService';
import store from './store/';
import {Provider} from 'react-redux';

export default class App extends React.Component {
    state = {
        isLoadingComplete: false,
    };

    render() {
        return (
            <View style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                <Provider store={store}>
                    <AppContainer ref={(navigatorRef) => {NavigationService.setTopLevelNavigator(navigatorRef);}}/>
                </Provider>
            </View>
        );
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Asset.loadAsync([
                require('./assets/images/gb.png'),
                require('./assets/images/splash.png'),
            ]),
        ]);
    };

    _handleLoadingError = error => {
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true });
    };
}

const SalesTabNavigator = createBottomTabNavigator({
    Search:SearchStack,
    Sales:SalesStack,
    Commission:CommissionStack,
    Settings:SettingsStack
},{
    navigationOptions:({navigation})=>{
        const {routeName} = navigation.state.routes[navigation.state.index];
        return {
            header: null,
            headerTitle: routeName,
        }
    }
});

const SalesStackNavigator = createStackNavigator({
  SalesTabNavigator:SalesTabNavigator
});

const AppDrawerNavigator = createDrawerNavigator({
  Sales:{
    screen:SalesStackNavigator
  }
});

const AppSwitchNavigator = createSwitchNavigator({
  Login: { screen:LoginScreen },
  Sales: { screen:AppDrawerNavigator },
  Event: { screen:SelectEventScreen },
});

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
