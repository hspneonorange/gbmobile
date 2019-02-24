import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
} from 'react-native';
import NavigationService from '../components/NavigationService';
import {connect} from 'react-redux';
import 'intl';
import 'intl/locale-data/jsonp/en';

const ProductInfoScreen = (props) => {
    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    //TODO: add an "add to cart button" at the bottom òwó
    return (
        <ScrollView style={styles.scroll}>
            <View style={styles.welcomeContainer}>
                <Text style={styles.nameDisplay}>{props.item.id} | {props.item.name}</Text>
                <Text>Keywords: {props.item.keywords}</Text>
                <Text>Price: {currencyFormatter.format(props.item.price)}</Text>
            </View>
        </ScrollView>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        item: ownProps.navigation.getParam("item"),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPressListItem: (item) => {
            NavigationService.navigate('ProductInfo', {
                item: item
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfoScreen);