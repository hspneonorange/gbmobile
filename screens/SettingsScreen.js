import React, { Component } from 'react';
import { ScrollView, TextInput, View, Button, Text } from 'react-native';
import {connect} from 'react-redux';

class SettingsScreen extends Component {
    
    static navigationOptions = {
        title: 'Settings',
        headerStyle: {
            backgroundColor: '#666666'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    componentDidMount() {
        // Pull host and port from async storage
        // If non-null, populate 'host' and 'port'
        // If null, populate host with '192.168.4.1' and port with '5000'
    }

    render() {
        return (
            <ScrollView style={styles.scroll}>
                <View>
                    <Text>URL</Text>
                    <TextInput style={styles.textInput} placeholder='e.g.: http://192.168.4.1:5000' />
                    <Button title="Save" color="#979797" onPress={() => {this.props.savePressed(this.props.username, this.props.password, this.props.appConfig.hostAddress)}}/>
               </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        appConfig: state.appConfig,
        username: state.username,
        password: state.password,
        sessionToken: state.sessionToken,
        navigation: ownProps.navigation,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        savePressed: (username, password, hostAddress) => {
            fetch(hostAddress + '/api/tokens' ,{
                method: 'POST',
                headers: {
                    Authorization: "Basic " + encodedCredentials
                }
            })
            .then((response) => response.json())
            .then(async (responseJson) => {
                // Valid response looks like this: {"token": "GMoErE4JIwZv7QkZuhzn1MD7hPGOm3tt"}
                const sessionToken = responseJson.token;
                const userId = responseJson.id;
                if (sessionToken) {
                    dispatch({type: actionType.HANDLE_AUTHN, token: sessionToken, userId: userId});
                    NavigationService.navigate('Event');
                } else {
                    alert('Login failed');
                }
            })
            .catch((error) => {
                console.error(error);
            });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);