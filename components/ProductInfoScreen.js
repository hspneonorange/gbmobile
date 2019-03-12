import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
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

    if (props.item.image_link) {
        DisplayImage =
        <Image
            style={{width: 200, height: 200, marginLeft: 'auto', marginRight: 'auto'}}
            source={{uri:(""+props.item.image_link).replace('https://drive.google.com/open?id=', 'http://drive.google.com/uc?export=view&id=')}}
            resizeMethod="auto"
        />
    } else { //only display this if there is no given product picture for an item
        //https://drive.google.com/file/d/1Faj2B7ftTti8QzMxN--GveGuAtfaou58/view?usp=sharing
        DisplayImage = 
        <Image
            style={{width: 200, height: 200, marginLeft: 'auto', marginRight: 'auto'}}
            source={{uri:'http://drive.google.com/uc?export=view&id=1Faj2B7ftTti8QzMxN--GveGuAtfaou58'}} //link to "image not available"
            resizeMethod="auto"
        />
    }

    //TODO: add an "add to cart button" at the bottom òwó
    return (
        <ScrollView style={styles.scroll}>
            <View>
                {DisplayImage}
                <View style={styles.span} />
                <View style={styles.span} />
                <View style={styles.span} />
                <View style={styles.span} />
                <Text style={styles.nameDisplay}>{props.item.id} | {props.item.name}</Text>
                <Text>Series: {props.item.product_series}</Text>
                <Text>Product Type: {props.item.product_type}</Text>
                <Text>Keywords: {props.item.keywords}</Text>
                <Text>Price: {currencyFormatter.format(props.item.price)}</Text>
                <Text>Stock: {props.item.stock}</Text>
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