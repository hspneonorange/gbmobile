import React from 'react';
import {connect} from 'react-redux';
import {TouchableOpacity, Text} from 'react-native';
import ProductListItem from '@components/ProductListItem';

const CartProductListItem = (props) => {
    // TODO: Show quantity that are in the cart
    return (
        <TouchableOpacity style={styles.listItemBox}>
            <ProductListItem item={props.item}/>
            <TouchableOpacity style={styles.addToCart} onPress={() => props.incrementCart(props.item)}>
                <Text style={styles.addProductText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addToCart} onPress={() => props.decrementCart(props.item)}>
                <Text style={styles.addProductText}>-</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        item: ownProps.item,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        incrementCart: (item) => {
            
        },
        decrementCart: (item) => {

        },
        removeFromCart: (item) => {

        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartProductListItem);
