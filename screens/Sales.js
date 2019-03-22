import React, { Component } from 'react';
import {
    Platform,
    StatusBar,
    StyleSheet,
    View,
    Button,
    Text,
    ScrollView,
} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import UserEventSales from '@components/UserEventSales';

export class Sales extends Component {
    render() {
        return (
            <UserEventSales />
        );
    }
};

export const SalesStack = createStackNavigator({
    Sales: {
        screen: Sales,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: 'Sales'
            }
        }
    }
});