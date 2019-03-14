import React, {Component} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import Keyword from '@screens/Keyword';
import IdSearch from '@screens/IdSearch';
import Category from '@screens/Category';
import TopSellers from '@screens/TopSellers';
import ShoppingCartScreen from '@screens/ShoppingCartScreen';
import ProductInfoScreen from '@components/ProductInfoScreen';
import NavigationService from '@components/NavigationService';
import {Ionicons} from '@expo/vector-icons';
import SalesQueueSynch from '@components/SalesQueueSynch';

export const SearchTabNavigator = createBottomTabNavigator({
    Keyword,
    IdSearch,
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
                    <View style={{flexDirection: 'row', flex: 1}}>
                        <SalesQueueSynch/>
                        <TouchableOpacity onPress={() => NavigationService.navigate('Cart')}>
                            <Ionicons style={{margin: 10}} name="md-cart" size={32}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => NavigationService.navigate('Login', {logout: true})}>
                            <Ionicons style={{margin: 10}} name="md-close-circle-outline" size={32}/>
                        </TouchableOpacity>
                    </View>
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

