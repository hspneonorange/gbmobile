import React, {Component} from 'react';
import {ScrollView, View, TextInput, Button} from 'react-native';
import styles from '../styles.js';

export default class Keyword extends Component{
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
              }}
              title="Search"
              color="#979797"
            />
          </ScrollView>
      );
    }
}
