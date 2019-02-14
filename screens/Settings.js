import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View, Button, Text } from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation';

export class Settings extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Settings</Text>
            </View>
        );
    }
}

export const SettingsStack = createStackNavigator({
    Settings: {
        screen: Settings,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: 'Settings'
            }
        }
    }
})