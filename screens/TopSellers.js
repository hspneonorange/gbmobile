import React, {Component} from 'react';
import {
  View,
  ScrollView,
  FlatList,
} from 'react-native';

export default class TopSellers extends Component{
    render(){
      return (
        <ScrollView style={styles.scroll} removeClippedSubviews={true}>
                <View style={styles.searchResults}>
                  <FlatList 
                    data = {this.props.searchItems}
                    keyExtractor = {item => 'list-item-$'+item.id}
                    renderItem = {({item}) => <SearchProductListItem item={item} />}
                  />
                </View>
            </ScrollView>
      );
    }
}