import React from 'react';
import {
    Button,
    FlatList,
    ScrollView,
    Text,
    View,
    TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import CartProductListItem from '@components/CartProductListItem';
import actionType from '@constants/actionType';

const ShoppingCartScreen = (props) => {
    return (
        <ScrollView style={{backgroundColor:'#c8e0e4', flexGrow:1, padding:5}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <Text>Discount</Text><TextInput onChangeText={(text) => props.discountKeyPress(text)} keyboardType='decimal-pad' style={{backgroundColor: 'white'}}/>
            </View>
            <FlatList
                data = {props.productCart}
                keyExtractor = {item => 'list-item-$'+item.id}
                renderItem = {({item}) => <CartProductListItem item={item} />}
            />
            <View style={{flex: 1, flexDirection: 'row'}}>
                <Button title="Empty Cart" onPress={() => props.emptyCart()}/><Text> </Text><Button title="Checkout" onPress={() => props.checkout(props.productCart)}/>
            </View>
        </ScrollView>
    );
};

const mapStateToProps = (state) => {
    return {
        productCart: state.productCart,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        discountKeyPress: (text) => {
            dispatch({type: actionType.DISCOUNT_KEY_PRESS, discount: text})
        },
        emptyCart: () => {
            dispatch({type: actionType.EMPTY_CART});
        },
        checkout: (productCart) => {
            if (productCart.length > 0) {
                dispatch({type: actionType.CHECKOUT});
            } else {
                // toast: Cart is empty
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartScreen);