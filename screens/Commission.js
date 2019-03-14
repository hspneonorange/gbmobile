import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View, Button, Text, ScrollView, TextInput } from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation';
import CommissionPage from "@components/CommissionPage";

export class Commission extends Component {
    render() {
        return (
            <CommissionPage/>
        );
    }
}

export const CommissionStack = createStackNavigator({
    Commission: {
        screen: Commission,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: 'Commission'
            }
        }
    }
})