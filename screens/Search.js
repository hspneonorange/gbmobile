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

const styles = StyleSheet.create({
    welcomeContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
      flex: 1,
      justifyContent:'center'
    },
    welcomeImage: {
      width: 100,
      height: 80,
      resizeMode: 'contain',
      marginTop: 3,
      marginLeft: -10,
    },
    scroll: {
        backgroundColor: '#c8e0e4',
        padding:30,
        //flexDirection: 'column',
    },
    optionBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 10,
        flex: 1
    },
    searchModes: {
        flexDirection: 'row',
    },
    textInput: {
        height: 40,
        fontSize: 20,
        flex: 1,
        backgroundColor: '#FFF',
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: '#cce5ff',
    },
    span: {
      margin: 2
    },
    searchResults: {
      backgroundColor: '#e0eeef'
    },
    sectionText: {
      fontWeight: 'bold',
      fontSize:14,
    },
    lineItem: {
      textAlign: 'right',
    },
});