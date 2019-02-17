import React, {Component} from 'react';
import {ScrollView, View, TextInput, Button} from 'react-native';
import styles from '../styles.js';
import {connect} from 'react-redux';
import NavigationService from '../components/NavigationService';

const Keyword = (props) => {
    return (
        <ScrollView style={styles.scroll}>
            <View>
                <TextInput style={styles.textInput} placeholder="Enter search term"  onChangeText={(text) => {props.textChanged(text)}}/>
            </View>
            <Button title="Search" color="#979797" onPress={() => {props.searchPressed(props.sessionToken, props.searchText)}}/>
        </ScrollView>
    );
}

const mapStateToProps = (state) => {
    return {
        sessionToken: state.sessionToken,
        searchText: state.searchText,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        textChanged: (text) => {
            dispatch({type: 'SEARCH_TEXT_CHANGED', text: text});
        },
        searchPressed: (sessionToken, searchText) => {
            // TODO: Abstract this to an app config variable!
            console.log('searchPressed');
            console.log('Bearer ', sessionToken);
            fetch('http://192.168.0.128:5000/api/products?search=' + searchText, {
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + sessionToken
                }
            })
            .then((response) => response.json())
            .then(async (responseJson) => {
                console.log(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Keyword);

/* Valid response looks like this:
[00:55:19] Object {
[00:55:19]   "_links": Object {
[00:55:19]     "next": null,
[00:55:19]     "prev": null,
[00:55:19]     "self": "/api/products?page=1&per_page=10",
[00:55:19]   },
[00:55:19]   "_meta": Object {
[00:55:19]     "page": 1,
[00:55:19]     "per_page": 10,
[00:55:19]     "total_items": 1,
[00:55:19]     "total_pages": 1,
[00:55:19]   },
[00:55:19]   "items": Array [
[00:55:19]     Object {
[00:55:19]       "_links": Object {
[00:55:19]         "product_series": "/api/product_series/2",
[00:55:19]         "product_type": "/api/product_types/2",
[00:55:19]         "self": "/api/sales/1",
[00:55:19]       },
[00:55:19]       "id": 1,
[00:55:19]       "image_link": null,
[00:55:19]       "keywords": "naruto,dragonball z,pokemon",
[00:55:19]       "name": "producttypetest2",
[00:55:19]       "price": 2.02,
[00:55:19]       "product_series_id": 2,
[00:55:19]       "product_type_id": 2,
[00:55:19]       "sku": null,
[00:55:19]       "stock": 4,
[00:55:19]     },
[00:55:19]   ],
[00:55:19] }
[00:56:08] reducer Object {
[00:56:08]   "text": "drago",
[00:56:08]   "type": "SEARCH_TEXT_CHANGED",
[00:56:08] }
[00:56:10] reducer Object {
[00:56:10]   "text": "dragoN",
[00:56:10]   "type": "SEARCH_TEXT_CHANGED",
[00:56:10] }
[00:56:12] searchPressed
[00:56:12] Bearer  MXNKWcA7Y8fnD+D3nftbNbVZwKpQPCXU
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
