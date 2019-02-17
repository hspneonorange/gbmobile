import React, {Component} from 'react';
import {ScrollView, View, TextInput, Button} from 'react-native';
import styles from '../styles.js';

export default class Keyword extends Component{
    render(){
      return (
        <ScrollView style={styles.scroll}>
            <View>
              <TextInput style={styles.textInput}
                placeholder="Enter search term"
                onChangeText={(text) => this.setState({text})}
              />
            </View>
            <Button style={styles.Button}
              onPress={() => {
              }}
              title="Search"
              color="#979797"
            />
          </ScrollView>
      );
    }
}
