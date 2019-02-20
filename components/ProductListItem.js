import React, {Component} from 'react';
import {
    Text,
    Button,
    Alert,
    View,
    Image,
} from 'react-native';
import 'intl';
import 'intl/locale-data/jsonp/en';

export default ListItem = (props) => {
    //TODO: pull appropriate product series based on props.item.product_series_id from product series
    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })
    
    if (props.item.image_link) {
        DisplayImage =
        <Image
            style={{width: 60, height: 60}}
            source={{uri:(""+props.item.image_link).replace('https://drive.google.com/open?id=', 'http://drive.google.com/uc?export=view&id=')}}
            resizeMethod="auto"
        />
    } else { //only display this if there is no given product picture for an item
        //https://drive.google.com/file/d/1Faj2B7ftTti8QzMxN--GveGuAtfaou58/view?usp=sharing
        DisplayImage = 
        <Image
            style={{width: 60, height: 60}}
            source={{uri:'http://drive.google.com/uc?export=view&id=1Faj2B7ftTti8QzMxN--GveGuAtfaou58'}} //link to "image not available"
            resizeMethod="auto"
        />
    }

    return (
        <View style={styles.listItemBox}>
            {DisplayImage}
            <View style={styles.listItemText}>
                <Text style={styles.nameDisplay}>{props.item.name}</Text>
                <View style={styles.additionalInfo}>
                    <Text style={styles.productPrice}>{currencyFormatter.format(props.item.price)}</Text>
                    <Text style={styles.productSeries}>{props.item.product_series_id}</Text>
                </View>
            </View>
        </View>
    );
}

/*return <ListItem
    name = {name}
    price = {price}
    image_link = {image_link}
    id = {id}
    click ={() => this.addItemToCart(index)}
/>*/