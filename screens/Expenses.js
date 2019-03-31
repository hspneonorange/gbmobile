import React, { Component } from 'react';
import {createStackNavigator} from 'react-navigation';
import UserExpenses from '@components/UserExpenses';

export class Expenses extends Component {
    render() {
        return (
            <UserExpenses />
        );
    }
};

export const ExpenseStack = createStackNavigator({
    Expenses: {
        screen: Expenses,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: 'Expenses'
            }
        }
    }
});