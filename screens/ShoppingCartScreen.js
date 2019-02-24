import React from 'react';
import {
    Button,
    FlatList,
    View,
} from 'react-native';
import {connect} from 'react-redux';
import CartProductListItem from '@components/CartProductListItem';

/*
    Shopping cart
    FlastList with ProductListItems for each (just like Keyword search page)
    Also, each item will have a "delete" button and a "quantity" (-[qty]+) spinner
    And the cart will have a "Checkout" button at the top
    Maybe also an "empty cart" button?

    ProductListItem should be wrapped in "SearchProductListItem" and "CartProductListItem" controls
*/

const ShoppingCartScreen = (props) => {
    console.log('ShoppingCart::', props.productCart);
    return (
        <View>
            <FlatList
                data = {props.productCart}
                keyExtractor = {item => 'list-item-$'+item.id}
                renderItem = {({item}) => <CartProductListItem item={item} />}
            />
            <View style={{flex: 1, flexDirection: 'row'}}>
                <Button title="Empty Cart" onPress={() => props.emptyCart()}/><Button title="Checkout" onPress={() => props.checkout()}/>
            </View>
        </View>
    );
};

const mapStateToProps = (state) => {
    return {
        productCart: state.productCart,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        emptyCart: () => {
            dispatch({type: 'EMPTY_CART'});
        },
        checkout: () => {
            // Modal with totals
            // "Complete sale" button
            // Make service calls to create sale
            // dispatch({type: 'EMPTY_CART'});
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartScreen);