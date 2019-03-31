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
import SettingsScreen from '@screens/SettingsScreen';
import {ExpenseStack} from '@screens/Expenses';
import {persistor, store} from './store/';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

export default class App extends React.Component {
    state = {
        isLoadingComplete: false,
    };

    render() {
        return (
            <View style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                <Provider store={store}>
                    <PersistGate persistor={persistor}>
                        <AppContainer />
                    </PersistGate>
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
    Search: SearchStack,
    Sales: SalesStack,
    Commission: CommissionStack,
    Expenses: ExpenseStack,
//    Settings: SettingsStack
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
  SalesTabNavigator: SalesTabNavigator
});

const SettingsStackNavigator = createStackNavigator({
    Settings: {screen: SettingsScreen},
})

const LoginTabNavigator = createBottomTabNavigator({
    Login: {screen: LoginScreen},
    Settings: SettingsStackNavigator//{screen: SettingsScreen},
})

// const AppDrawerNavigator = createDrawerNavigator({
//   Sales:{
//     screen: SalesStackNavigator
//   }
// });

// const AppSwitchNavigator = createSwitchNavigator({
//   Login: { screen: LoginScreen },
//   Sales: { screen: AppDrawerNavigator },
//   Event: { screen: SelectEventScreen },
// });

const AppSwitchNavigator = createSwitchNavigator({
    Login: LoginTabNavigator, // { screen: LoginScreen },
    Sales: { screen: SalesStackNavigator },
    Event: { screen: SelectEventScreen },
});
  
const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
