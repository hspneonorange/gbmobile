import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    TextInput,
    Button,
} from 'react-native';
import {connect} from 'react-redux';
import 'intl';
import 'intl/locale-data/jsonp/en';
import actionType from '../constants/actionType';

export class ProductInfoScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stock_update: 0,
        }
    }
    render() {
        let item = this.props.navigation.getParam("item");
        const currencyFormatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        })
    
        if (item.gb_image_link) {
            DisplayImage =
            <Image
                style={{width: 200, height: 200, marginLeft: 'auto', marginRight: 'auto'}}
                source={{uri:("" + item.gb_image_link).replace('https://drive.google.com/open?id=', 'http://drive.google.com/uc?export=view&id=')}}
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
        return (
            <ScrollView style={styles.scroll}>
                <View>
                    {DisplayImage}
                    <View style={styles.span} />
                    <View style={styles.span} />
                    <View style={styles.span} />
                    <View style={styles.span} />
                    <Text style={styles.nameDisplay}>{item.id} | {item.name}</Text>
                    <Text>Series: {item.product_series}</Text>
                    <Text>Product Type: {item.product_type}</Text>
                    <Text>Keywords: {item.keywords}</Text>
                    <Text>Price: {currencyFormatter.format(item.price)}</Text>
                    <Text>Stock: {item.stock}</Text>
                    <View style={styles.span} />
                    <View style={styles.span} />
                    <View style={styles.span} />
                    <Text style={styles.nameDisplay}>Stock Adjustment Amount:</Text>
                    <TextInput keyboardType='numeric' style={styles.textInput} placeholder="Adjust by how much?" onChangeText={(text) => this.setState({stock_update: text})}/>
                    <Button title="Update" color="#979797" onPress={() => {this.props.updateStock(this.props.sessionToken, this.props.appConfig.hostAddress, item.id, this.state.stock_update, this.props.navigation)}} disabled={this.state.stock_update == 0}/>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        sessionToken: state.sessionToken,
        appConfig: state.appConfig,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateStock: (sessionToken, hostAddress, id, stock_update, navigation) => {
            if (stock_update > 0) {
                // TODO: We should make these more "RESTful" - e.g.: /api/products/12/incrementStock?amount=3
                // Also we should return the new stock amount in the body and use it to update the quanity for the existing item, since it's not updating on the details screen
                fetch(hostAddress + '/api/products/stock/' + id + '/' + stock_update + '?action=increment', { //TODO: replace with stock update var here
                    method: 'PUT',
                    headers: {
                        Authorization: "Bearer " + sessionToken,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                })
                .then((responseBody) => responseBody.json())
                .then((responseJson) => {
                    dispatch({type: actionType.SET_LOW_STOCK_PRODUCTS_UPDATED});
                    navigation.goBack();
                })
                .catch((error) => {
                    console.error(error);
                });
            } else if (stock_update < 0) {
                // TODO: We should make these more "RESTful" - e.g.: /api/products/12/incrementStock?amount=3
                // Also we should return the new stock amount in the body and use it to update the quanity for the existing item, since it's not updating on the details screen
                fetch(hostAddress + '/api/products/stock/' + id + '/' + Math.abs(stock_update) + '?action=decrement', { //TODO: replace with stock update var here
                    method: 'PUT',
                    headers: {
                        Authorization: "Bearer " + sessionToken,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                })
                .then((responseBody) => responseBody.json())
                .then((responseJson) => {
                    dispatch({type: actionType.SET_LOW_STOCK_PRODUCTS_UPDATED});
                    navigation.goBack();
                })
                .catch((error) => {
                    console.error(error);
                });
            }
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfoScreen);