import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    TextInput,
    Button,
} from 'react-native';
import NavigationService from '../components/NavigationService';
import {connect} from 'react-redux';
import 'intl';
import 'intl/locale-data/jsonp/en';

export class ProductInfoScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stock_update: 0,
        }
    }
    render() {
        const currencyFormatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        })
    
        if (this.props.item.gb_image_link) {
            DisplayImage =
            <Image
                style={{width: 200, height: 200, marginLeft: 'auto', marginRight: 'auto'}}
                source={{uri:(""+this.props.item.gb_image_link).replace('https://drive.google.com/open?id=', 'http://drive.google.com/uc?export=view&id=')}}
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
                    <Text style={styles.nameDisplay}>{this.props.item.id} | {this.props.item.name}</Text>
                    <Text>Series: {this.props.item.product_series}</Text>
                    <Text>Product Type: {this.props.item.product_type}</Text>
                    <Text>Keywords: {this.props.item.keywords}</Text>
                    <Text>Price: {currencyFormatter.format(this.props.item.price)}</Text>
                    <Text>Stock: {this.props.item.stock}</Text>
                    <View style={styles.span} />
                    <View style={styles.span} />
                    <View style={styles.span} />
                    <Text style={styles.nameDisplay}>Stock Adjustment Amount:</Text>
                    <TextInput keyboardType='numeric' style={styles.textInput} placeholder="Adjust by how much?" onChangeText={(text) => this.setState({stock_update: text})} />
                    <Button title="Update" color="#979797" onPress={() => {this.props.updateStock(this.props.sessionToken, this.props.appConfig.hostAddress, this.props.item.id, this.state.stock_update)}}/>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        item: ownProps.navigation.getParam("item"),
        sessionToken: state.sessionToken,
        appConfig: state.appConfig,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPressListItem: (item) => {
            NavigationService.navigate('ProductInfo', {
                item: item
            });
        },
        updateStock: (sessionToken, hostAddress, id, stock_update) => {
            if (stock_update > 0) {
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
                    console.log(responseJson);
                })
                .catch((error) => {
                    console.error(error);
                });
            } else if (stock_update < 0) {
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
                    console.log(responseJson);
                })
                .catch((error) => {
                    console.error(error);
                });
            }
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfoScreen);