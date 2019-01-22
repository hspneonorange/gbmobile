import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SalesScreen from '../screens/SalesScreen';
import ManagementScreen from '../screens/ManagementScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const ProductsStack = createStackNavigator({
  Products: ProductsScreen,
});

ProductsStack.navigationOptions = {
  tabBarLabel: 'Products',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-compose' : 'md-list'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const SalesStack = createStackNavigator({
  Sales: SalesScreen,
});

SalesStack.navigationOptions = {
  tabBarLabel: 'New Sale',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-mostViewed' : 'md-basket'}
    />
  ),
};

const ManagementStack = createStackNavigator({
  Management: ManagementScreen,
});

ManagementStack.navigationOptions = {
  tabBarLabel: 'Management',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-topRated' : 'md-build'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  SalesStack,
  ProductsStack,
  ManagementStack,
  SettingsStack,
});
