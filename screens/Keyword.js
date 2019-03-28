import React, {Component} from 'react';
import {ScrollView, View, TextInput, Button, FlatList} from 'react-native';
import styles from '../styles.js';
import {connect} from 'react-redux';
import SearchProductListItem from '@components/SearchProductListItem';
import actionType from '@constants/actionType';

class Keyword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        };
    }

    render() {
        return (
            <ScrollView style={styles.scroll} removeClippedSubviews={true}>
                <View>
                    <TextInput selectTextOnFocus={true} onSubmitEditing={() => {this.props.searchPressed(this.props.sessionToken, this.state.searchText, this.props.appConfig.hostAddress)}} style={styles.textInput} placeholder="Enter search term"  onChangeText={(text) => {this.setState({searchText: text})}}/>
                </View>
                <View style={{borderBottomColor: 'black', borderBottomWidth: 1, marginTop: 15, marginBottom: 15}} />
                <Button title="Search" color="#979797" onPress={() => {this.props.searchPressed(this.props.sessionToken, this.state.searchText, this.props.appConfig.hostAddress)}}/>
                <View style={styles.searchResults}>
                    <FlatList 
                        data = {this.props.searchItems}
                        keyExtractor = {item => 'list-item-$'+item.id}
                        renderItem = {({item}) => (
                            <SearchProductListItem item={item} navigation={this.props.navigation} />
                        )}
                    />
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        sessionToken: state.sessionToken,
        searchItems: state.searchItems,
        appConfig: state.appConfig,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchPressed: (sessionToken, searchText, hostAddress) => {
            fetch(hostAddress + '/api/products?search=' + searchText, {
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + sessionToken
                }
            })
            .then((response) => response.json())
            .then(async (responseJson) => {
                dispatch({type: actionType.RETURN_SEARCH_ITEMS, searchItems: responseJson.items})
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
