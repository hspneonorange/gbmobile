import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View, Button, Text, ScrollView, TextInput } from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation';
import {connect} from 'react-redux';
import Analytics from '@components/Analytics';

class AnalyticsScreen extends Component {
    render() {
        console.log(this.props);
        return (
            <Analytics />
        );
    }
}

export const AnalyticsStack = createStackNavigator({
    Analytics: {
        screen: AnalyticsScreen,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: 'Analytics'
            }
        }
    }
})

const mapStateToProps = (state) => {
    console.log('hello?!');
    console.log('state', state);
    return {
        hostAddress: state.appConfig.hostAddress,
        eventId: state.evenId,
    };
}

export default connect(mapStateToProps)(AnalyticsScreen);