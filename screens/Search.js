import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import Keyword from '@screens/Keyword';
import Scan from '@screens/Scan';
import Category from '@screens/Category';
import TopSellers from '@screens/TopSellers';

export const SearchTabNavigator = createBottomTabNavigator({
    Keyword,
    Scan,
    Category,
    TopSellers
  },{
    navigationOptions:({navigation})=>{
      const {routeName} = navigation.state.routes[navigation.state.index];
      return {
        //header: null, //remove this since we want to have a generic "search" header
        headerTitle: routeName
      }
    }
})
  
export const SearchStack = createStackNavigator({
    Search: {
      screen: SearchTabNavigator,
      navigationOptions:({navigation})=>{
        return{
          headerTitle: 'Search'
        }
      }
    }
})
