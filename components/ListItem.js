import React, {Component} from 'react';
import {
    Text,
    Button,
    Alert,
    View,
} from 'react-native';

export default ListItem = (props) => {
    return (
        <View>
            <Text style={styles.productName}>{props.item.name}</Text>
            <Text>${props.item.price}</Text>
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