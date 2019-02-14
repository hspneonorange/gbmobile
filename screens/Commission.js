import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View, Button, Text, ScrollView, TextInput } from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation';

export class Commission extends Component {
    render() {
        return (
            <ScrollView style={styles.welcomeContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter commissioner name"
                  onChangeText={(text) => this.setState({text})}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter commissioner email"
                  onChangeText={(text) => this.setState({text})}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter commissioner phone number"
                  onChangeText={(text) => this.setState({text})}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter street address"
                  onChangeText={(text) => this.setState({text})}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter city"
                  onChangeText={(text) => this.setState({text})}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter state abbreviation"
                  onChangeText={(text) => this.setState({text})}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter ZIP code"
                  onChangeText={(text) => this.setState({text})}
                />
            </ScrollView>
        );
    }
}

export const CommissionStack = createStackNavigator({
    Commission: {
        screen: Commission,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: 'Commission'
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