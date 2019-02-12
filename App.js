import React from 'react';
import { Platform, StatusBar, StyleSheet, View, } from 'react-native';
import { Asset, Font, Icon } from 'expo';
// react-navigation
import {
    createSwitchNavigator,
    createAppContainer,
    createDrawerNavigator,
    createBottomTabNavigator,
    createStackNavigator,
} from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import {SearchStack, Search} from './screens/Search';
import {CommissionStack, Commission} from './screens/Commission';
import {SalesStack, Sales} from './screens/Sales';
import {SettingsStack, Settings} from './screens/Settings';
import NavigationService from './components/NavigationService';
// redux/react-redux
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
                    <AppContainer ref={navigatorRef => {NavigationService.setTopLevelNavigator(navigatorRef);}}/>
                </Provider>
            </View>
        );
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Asset.loadAsync([
                require('./assets/images/robot-dev.png'),
                require('./assets/images/robot-prod.png'),
            ]),
            Font.loadAsync({
                ...Icon.Ionicons.font,
                'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
            }),
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
            headerTitle: routeName
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
  Sales: { screen:AppDrawerNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
