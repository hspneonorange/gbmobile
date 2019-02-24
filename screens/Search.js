import React, { Component } from 'react';
import {TouchableOpacity} from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import Keyword from '@screens/Keyword';
import Scan from '@screens/Scan';
import Category from '@screens/Category';
import TopSellers from '@screens/TopSellers';
import ShoppingCartScreen from '@screens/ShoppingCartScreen';
import ProductInfoScreen from '@components/ProductInfoScreen';
import NavigationService from '@components/NavigationService';
import {Ionicons} from '@expo/vector-icons';

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
            return {
                headerTitle: 'Search',
                headerRight: (
                    <TouchableOpacity onPress={() => NavigationService.navigate('Cart')}>
                        <Ionicons style={{margin: 10}} name="md-cart" size={32}/>
                    </TouchableOpacity>
                )
            }
        }
    },
    ProductInfo: {
        screen:ProductInfoScreen,
        navigationOptions: ({navigation}) => {
            return {
                headerTitle: 'Product Info'
            }
        }
    },
    Cart: {
        screen: ShoppingCartScreen,
        navigationOptions: ({navigation}) => {
            return {
                headerTitle: 'Shopping Cart',
            }
        }
    },
})
