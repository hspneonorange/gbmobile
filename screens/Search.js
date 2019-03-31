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
import ImageBar from '@components/ImageBar';
import {connect} from 'react-redux';

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
                    <ImageBar />
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

const mapStateToProps = (state) => {
    return {
        sessionToken: state.sessionToken,
        appConfig: state.appConfig,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchStack);