import React, {Component} from 'react';
import {ScrollView, View, TextInput, Button, FlatList} from 'react-native';
import styles from '../styles.js';
import {connect} from 'react-redux';
import NavigationService from '../components/NavigationService';
import ProductListItem from '@components/ProductListItem';

const Keyword = (props) => {
//  console.log(props.searchItems);
  return (
        <ScrollView style={styles.scroll} removeClippedSubviews={true}>
            <View>
                <TextInput style={styles.textInput} placeholder="Enter search term"  onChangeText={(text) => {props.textChanged(text)}}/>
            </View>
            <Button title="Search" color="#979797" onPress={() => {props.searchPressed(props.sessionToken, props.searchText, props.appConfig.hostAddress)}}/>
            <View style={styles.searchResults}>
              <FlatList 
                data = {props.searchItems}
                keyExtractor = {item => 'list-item-$'+item.id}
                renderItem = {({item}) => <ProductListItem item={item} />}
              />
            </View>
        </ScrollView>
    );
}

const mapStateToProps = (state) => {
    return {
        sessionToken: state.sessionToken,
        searchText: state.searchText,
        searchItems: state.searchItems,
        appConfig: state.appConfig,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        textChanged: (text) => {
            dispatch({type: 'SEARCH_TEXT_CHANGED', text: text});
        },
        searchPressed: (sessionToken, searchText, hostAddress) => {
            // TODO: Abstract this to an app config variable!
            console.log('searchPressed');
            console.log('Bearer ', sessionToken);
            //fetch('http://192.168.0.112:5000/api/products?search=' + searchText, {
            fetch(hostAddress + '/products?search=' + searchText, {
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + sessionToken
                }
            })
            .then((response) => response.json())
            .then(async (responseJson) => {
                console.log(responseJson);
                dispatch({type: 'RETURN_SEARCH_ITEMS', searchItems: responseJson.items})
            })
            .catch((error) => {
                console.error(error);
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Keyword);

/* Valid response looks like this:
[00:56:12] Object {
[00:56:12]   "_links": Object {
[00:56:12]     "next": null,
[00:56:12]     "prev": null,
[00:56:12]     "self": "/api/products?page=1&per_page=10",
[00:56:12]   },
[00:56:12]   "_meta": Object {
[00:56:12]     "page": 1,
[00:56:12]     "per_page": 10,
[00:56:12]     "total_items": 1,
[00:56:12]     "total_pages": 1,
[00:56:12]   },
[00:56:12]   "items": Array [
[00:56:12]     Object {
[00:56:12]       "_links": Object {
[00:56:12]         "product_series": "/api/product_series/2",
[00:56:12]         "product_type": "/api/product_types/2",
[00:56:12]         "self": "/api/sales/1",
[00:56:12]       },
[00:56:12]       "id": 1,
[00:56:12]       "image_link": null,
[00:56:12]       "keywords": "naruto,dragonball z,pokemon",
[00:56:12]       "name": "producttypetest2",
[00:56:12]       "price": 2.02,
[00:56:12]       "product_series_id": 2,
[00:56:12]       "product_type_id": 2,
[00:56:12]       "sku": null,
[00:56:12]       "stock": 4,
[00:56:12]     },
[00:56:12]   ],
[00:56:12] }
*/
