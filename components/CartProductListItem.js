import React from 'react';
import {connect} from 'react-redux';
import {TouchableOpacity, Text, View} from 'react-native';
import ProductListItem from '@components/ProductListItem';
import Ionicons from '@expo/vector-icons/Ionicons';
import actionType from '@constants/actionType';

const CartProductListItem = (props) => {
    // TODO: Show quantity that are in the cart
    return (
        <TouchableOpacity style={styles.listItemBox}>
            <ProductListItem item={props.item}/>
            <TouchableOpacity style={styles.addToCart} onPress={() => props.decrementCart(props.item)}>
                <Text style={styles.addProductText}>-</Text>
            </TouchableOpacity>
            <View style={styles.quantityBox}>
                <Text style={styles.quantityDisplayText}>{props.item.quantity}</Text>
            </View>
            <TouchableOpacity style={styles.addToCart} onPress={() => props.incrementCart(props.item)}>
                <Text style={styles.addProductText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.trashBox} onPress={() => props.removeFromCart(props.item)}>
                <Ionicons name="md-trash" size={20}/>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        item: ownProps.item
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        incrementCart: (item) => {
            dispatch({type: actionType.ADD_TO_CART, item: item})
        },
        decrementCart: (item) => {
            dispatch({type: actionType.DECREMENT_FROM_CART, item: item})
        },
        removeFromCart: (item) => {
            dispatch({type: actionType.REMOVE_FROM_CART, item: item})
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartProductListItem);
