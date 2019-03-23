import React, {Component} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Button,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import SearchProductListItem from '@components/SearchProductListItem';
import actionType from '../constants/actionType';

const IdSearch = (props) => {
  //  console.log(props.searchItems);
    return (
          <ScrollView style={styles.scroll} removeClippedSubviews={true}>
              <View>
                  <TextInput keyboardType='decimal-pad' selectTextOnFocus={true} onSubmitEditing={() => {props.searchPressed(props.sessionToken, props.searchText, props.appConfig.hostAddress)}} style={styles.textInput} placeholder="Enter item ID"  onChangeText={(text) => {props.textChanged(text)}}/>
              </View>
              <View style={{borderBottomColor: 'black', borderBottomWidth: 1, marginTop: 15, marginBottom: 15}} />
              <Button title="Search" color="#979797" onPress={() => {props.searchPressed(props.sessionToken, props.searchText, props.appConfig.hostAddress)}}/>
              <View style={styles.searchResults}>
                <FlatList 
                  data = {props.idSearchItems}
                  keyExtractor = {item => 'list-item-$'+item.id}
                  renderItem = {({item}) => <SearchProductListItem item={item} />}
                />
              </View>
          </ScrollView>
      );
  }
  
  const mapStateToProps = (state) => {
      return {
          sessionToken: state.sessionToken,
          searchText: state.searchText,
          idSearchItems: state.idSearchItems,
          appConfig: state.appConfig,
      };
  }
  
  const mapDispatchToProps = (dispatch) => {
      return {
          textChanged: (text) => {
              dispatch({type: actionType.SEARCH_TEXT_CHANGED, text: text});
          },
          searchPressed: (sessionToken, searchText, hostAddress) => {
              console.log('searchPressed');
              console.log('Bearer ', sessionToken);
              fetch(hostAddress + '/api/products/id_search?search=' + searchText, {
                  method: 'GET',
                  headers: {
                      Authorization: "Bearer " + sessionToken
                  }
              })
              .then((response) => response.json())
              .then(async (responseJson) => {
                  console.log(responseJson);
                  dispatch({type: actionType.RETURN_ID_SEARCH_ITEMS, searchItems: responseJson.items})
              })
              .catch((error) => {
                  console.error(error);
              });
          }
      };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(IdSearch);
