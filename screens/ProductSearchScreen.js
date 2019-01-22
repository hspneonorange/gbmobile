import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Button,
  SectionList,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';

import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class ProductSearchScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  render() {
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
            Alert.alert("Proceed to order review and sale confirmation?");
          }}
          title="Checkout"
          color="#979797"
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
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
});