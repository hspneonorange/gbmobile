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
  Image,
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
        <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/gb.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>
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
              Alert.alert("View product1");
            }}
            title="Product1"
            color="#979797"
          />
          <View
            style={styles.span}
          />
          <Button
            onPress={() => {
              Alert.alert("View Product2");
            }}
            title="Product2"
            color="#979797"
          />
          <View
            style={styles.span}
          />
          <Button
            onPress={() => {
              Alert.alert("View Product3");
            }}
            title="Product3"
            color="#979797"
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
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
      margin: 5
    },
    searchResults: {
      backgroundColor: '#e0eeef'
    },
});