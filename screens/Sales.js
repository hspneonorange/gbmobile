import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View, Button, Text } from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation';

export class Sales extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Sales</Text>
            </View>
        );
    }
}

export const SalesStack = createStackNavigator({
    Sales: {
        screen: Sales,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: 'Sales'
            }
        }
    }
})