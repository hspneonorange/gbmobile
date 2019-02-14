import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View, Button, Text, ScrollView, TextInput, } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';

export class Keyword extends Component{
    render(){
      return (
        <ScrollView style={styles.scroll}>
            <View>
              <TextInput
                style={styles.textInput}
                placeholder="Enter search term"
                onChangeText={(text) => this.setState({text})}
              />
            </View>
            <ScrollView style={styles.searchResults}>
            <View
              style={styles.span}
            />
            <Button
              onPress={() => {
                Alert.alert("You've selected a product!");
              }}
              title="Product1"
              color="#bcbcbc"
            />
            <View
              style={styles.span}
            />
            <Button
              onPress={() => {
                Alert.alert("You've selected a product!");
              }}
              title="Product2"
              color="#bcbcbc"
            />
            <View
              style={styles.span}
            />
            <Button
              onPress={() => {
                Alert.alert("You've selected a product!");
              }}
              title="Product3"
              color="#bcbcbc"
            />
            <View
              style={styles.span}
            />
            </ScrollView>
            <View
              style={styles.span}
            />
            <View
              style={styles.span}
            />
            <Button style={styles}
              onPress={() => {
                this.setState({
                  page_id: 3
                });
              }}
              title="Checkout"
              color="#979797"
            />
          </ScrollView>
      );
    }
}
  
export class Scan extends Component{
    render(){
      return (
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <Text>Scan</Text>
        </View>
      );
    }
}
  
export class Category extends Component{
    render(){
      return (
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <Text>Category</Text>
        </View>
      );
    }
}
  
export class TopSellers extends Component{
    render(){
      return (
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <Text>TopSellers</Text>
        </View>
      );
    }
}

export const SearchTabNavigator = createBottomTabNavigator({
    Keyword,
    Scan,
    Category,
    TopSellers
  },{
    navigationOptions:({navigation})=>{
      const {routeName} = navigation.state.routes[navigation.state.index];
      return {
        //header: null, //remove this since we want to have a generic "search" header
        headerTitle: routeName
      }
    }
})
  
export const SearchStack = createStackNavigator({
    Search: {
      screen: SearchTabNavigator,
      navigationOptions:({navigation})=>{
        return{
          headerTitle: 'Search'
        }
      }
    }
})

const styles = StyleSheet.create({
    welcomeContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
      flex: 1,
      justifyContent:'center'
    },
    welcomeImage: {
      width: 100,
      height: 80,
      resizeMode: 'contain',
      marginTop: 3,
      marginLeft: -10,
    },
    scroll: {
        backgroundColor: '#c8e0e4',
        padding:30,
        //flexDirection: 'column',
    },
    optionBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 10,
        flex: 1
    },
    searchModes: {
        flexDirection: 'row',
    },
    textInput: {
        height: 40,
        fontSize: 20,
        flex: 1,
        backgroundColor: '#FFF',
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: '#cce5ff',
    },
    span: {
      margin: 2
    },
    searchResults: {
      backgroundColor: '#e0eeef'
    },
    sectionText: {
      fontWeight: 'bold',
      fontSize:14,
    },
    lineItem: {
      textAlign: 'right',
    },
});