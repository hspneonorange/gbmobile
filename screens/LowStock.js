import React from 'react';
import {
    ScrollView,
    FlatList,
    View,
} from 'react-native';
import {connect} from 'react-redux';
import actionType from '@constants/actionType';
import ProductListItem from '@components/ProductListItem'

const LowStock = (props) => {
    console.log(props.appConfig);
    console.log(props.lowStockProducts);
    if (props.lowStockProducts.length == 0) props.queryLowStockProducts(props.sessionToken, props.appConfig.hostAddress);
    return (
        <ScrollView style={styles.scroll}>
            <View style={styles.searchResults}>
              <FlatList 
                data = {props.lowStockProducts}
                keyExtractor = {item => 'list-item-$'+item.id}
                renderItem = {({item}) => <ProductListItem item={item} />}
              />
              <View style={styles.span} />
            </View>
        </ScrollView>
    )
}

const mapStateToProps = (state) => {
    return {
        sessionToken: state.sessionToken,
        lowStockProducts: state.lowStockProducts,
        appConfig: state.appConfig,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        queryLowStockProducts: (sessionToken, hostAddress) => {
            fetch(hostAddress + '/api/products/low_stock', {
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + sessionToken
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('in queryLowStockProducts');
                console.log(responseJson.items);
                dispatch({type: actionType.RETURN_LOW_STOCK_PRODUCTS, lowStockProducts: responseJson.items})
            })
            .catch((error) => {
                console.error(error);
            });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LowStock);