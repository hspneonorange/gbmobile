import React, {Component} from 'react';
import {TouchableOpacity, View, Image, Text,} from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import Keyword from '@screens/Keyword';
import IdSearch from '@screens/IdSearch';
import Category from '@screens/Category';
import TopSellers from '@screens/TopSellers';
import LowStock from '@screens/LowStock';
import ShoppingCartScreen from '@screens/ShoppingCartScreen';
import ProductInfoScreen from '@components/ProductInfoScreen';
import {Ionicons} from '@expo/vector-icons';
import SalesQueueSynch from '@components/SalesQueueSynch';

export const SearchTabNavigator = createBottomTabNavigator({
    Keyword,
    "ID": IdSearch,
    Category,
    "Top Sellers": TopSellers,
    "Low Stock": LowStock,
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
                        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                            <Image style={{margin: 10, height: 35, width: 35}} source={{uri:/*props.appConfig.hostAddress + */'http://192.168.0.129:5000/images/app/cart.png'}} size={32}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Login', {message: 'bryan', logout: true})}>
                            <Image style={{margin: 10, height: 35, width: 35}} source={{uri:/*props.appConfig.hostAddress + */'http://192.168.0.129:5000/images/app/logout.png'}} size={32}/>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
    },
    ProductInfo: {
        screen: ProductInfoScreen,
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

