import React, {Component} from 'react';
import {
    Text,
    Button,
    Alert,
    View,
    Image,
} from 'react-native';

export default ListItem = (props) => {
    //TODO: format prices to display properly ex: show as $2.00 instead of $2 (maybe react-native-globalize?)
    //also: pull appropriate product series based on props.item.product_series_id from product series
    //display price and product series with a good space between them
    console.log(props.item)
    // const currencyFormatter = new Intl.NumberFormat('en-US', {
    //     style: 'currency',
    //     currency: 'USD',
    //     minimumFractionDigits: 2
    // })
    return (
        <View style={styles.listItemBox}>
            <Image
                style={styles.listItemImage }
                source={{uri:props.item.image_link}}
                resizeMethod="resize"
            />
            <View style={styles.listItemText}>
                <Text style={styles.nameDisplay}>{props.item.name}</Text>
                <View style={styles.additionalInfo}>
                    <Text style={alignContent='flex-start'}>{props.item.product_series_id}</Text>
                    <Text style={alignContent='flex-end'}>{props.item.price}</Text>
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