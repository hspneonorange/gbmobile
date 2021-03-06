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
import HorizontalDivider from '@components/HorizontalDivider';

class ShoppingCartScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            discount: 0.0,
            notes: '',
        }
    }

    render() {
        return (
            <ScrollView style={{backgroundColor:'#c8e0e4', flexGrow: 1, padding: 5}}>
                <View style={{paddingBottom: 5}}>
                    <FlatList
                        data = {this.props.productCart}
                        keyExtractor = {item => 'list-item-$'+item.id}
                        renderItem = {({item}) => <CartProductListItem item={item} navigation={this.props.navigation}/>}
                        ListEmptyComponent = {() => {
                            return <Text style={{fontSize: 28}}>The cart is empty.</Text>
                        }}
                    />
                </View>
                <HorizontalDivider />
                <TextInput style={styles.textInput} multiline={true} minHeight={100} placeholder="Enter sale notes here" onChangeText={(text) => this.setState({notes: text})}/>
                <HorizontalDivider />
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Text style={{fontSize: 32, fontWeight: 'bold'}}>Discount: $</Text>
                    <TextInput selectTextOnFocus={true} defaultValue={this.state.discount.toString()} style={{borderRadius: 10, paddingRight: 10, backgroundColor: 'white', fontSize: 28, borderWidth: 1, width: 100, textAlign: 'right'}} placeholder={'0.00'} onChangeText={(text) => {if (parseFloat(text).isNaN) {this.setState({discount: 0.0});} else {this.setState({discount: text});}}} keyboardType='decimal-pad' />
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Text style={{fontSize: 32, fontWeight: 'bold'}}>Total: ${cartTotal(this.props.productCart, this.state.discount)}</Text>
                </View>
                <HorizontalDivider />
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 70}}>
                    <Button color="#979797" title="Empty Cart" onPress={() => {this.props.emptyCart(); this.setState({discount: 0.0, notes: ''});}} disabled={this.props.productCart.length == 0}/>
                    <Button color="#979797" title="Checkout" onPress={() => {this.props.checkout(this.props.productCart, this.state.discount, this.state.notes); this.setState({discount: 0.0, notes: ''}); this.props.navigation.navigate('Keyword');}} disabled={this.props.productCart.length == 0}/>
                </View>
            </ScrollView>
        );
    }
};

const cartTotal = (cart, discount) => {
    let total = 0.0;
    if (isNaN(discount)) {
        discount = 0.0;
    }

    cart.map((i) => {
        total += (parseFloat(i.price) * i.quantity)
    });
    
    total -= parseFloat(discount);

    return total;
}

const mapStateToProps = (state) => {
    return {
        productCart: state.productCart,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        emptyCart: () => {
            dispatch({type: actionType.EMPTY_CART});
        },
        checkout: (productCart, discount, notes) => {
            if (productCart.length > 0) {
                dispatch({type: actionType.CHECKOUT, discount: discount, notes: notes});
            } else {
                // toast: Cart is empty
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartScreen);