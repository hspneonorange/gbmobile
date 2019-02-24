import React, {Component} from 'react';
import {
    Text,
    Button,
    Alert,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import NavigationService from '../components/NavigationService';
import {connect} from 'react-redux';

const ProductInfoScreen = (props) => {
    console.log(props);
    //TODO: add an "add to cart button" at the bottom owo
    return (
        <View>
            <Text>Item Id: {props.item.id}</Text>
            <Text>Item Name: {props.item.name}</Text>
            <Text>Item Keywords: {props.item.keywords}</Text>
            <Text>Item Price: {props.item.price}</Text>
        </View>
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