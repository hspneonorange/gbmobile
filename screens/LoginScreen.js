import React, {Component} from 'react';
import {
  Image,
  Button,
  ScrollView,
  View,
  AsyncStorage, // token persistence
  Text,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import NavigationService from '../components/NavigationService';
import base64 from 'react-native-base64';
import actionType from '@constants/actionType';
import HorizontalDivider from '@components/HorizontalDivider';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameText: '',
            passwordText: '',
        }
    }

    componentDidMount = () => {
        console.log('this.props.navigation', this.props.navigation.getParam());
        if (this.props.navigation.getParam("logout")) {
            // TODO: Logout seems to be broken. :-(
            console.log('logout: true');
            // Log out at server (most important part)
            fetch(this.props.appConfig.hostAddress + '/api/tokens', {
                method: 'DELETE',
                headers: {
                    Authorization: "Bearer " + this.props.sessionToken
                }
            })
            .catch((error) => {
                console.error(error);
            });
            // Wipe Redux state
            this.props.clearStateOnLogout();
        } else {
            console.log('logout: untrue');
            this.retrieveAndTestExistingSession();
        }
    }

    retrieveAndTestExistingSession = async () => {
        await AsyncStorage.getItem('@Authentication:access-token')
        .then(async (sessionToken) => {
            if (sessionToken !== null) {
                await fetch(this.props.appConfig.hostAddress + '/api/tokens', {
                    method: 'GET',
                    headers: {
                        Authorization: "Bearer " + sessionToken
                    }
                })
                .then((response) => {
                    if (response.ok) {
                        AsyncStorage.getItem('@Authentication:userId')
                        .then(async(userId) => {
                            this.props.updateUserId(userId);
                        })
                        .catch((error) => {/* TODO: error handling? */});
                        AsyncStorage.getItem('@Event:eventId')
                        .then(async(eventId) => {
                            this.props.updateEventId(eventId);
                        })
                        .catch((error) => {/* TODO: error handling? */});
                        this.props.updateSessionToken(sessionToken);
                        NavigationService.navigate('Sales');
                    } else {
                        console.log('Session token expired or invalid');
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
            } else {
                console.log('Session token not found in AsyncStorage');
            }
        });
    }
    
    render() {
        return (
            <ScrollView style={styles.scroll}>
                <View style={styles.welcomeContainer}>
                    <Image
                        source={__DEV__ ? require('../assets/images/gb.png') : require('../assets/images/gb.png')}
                        style={styles.welcomeImage}
                    />
                </View>
                <View>
                    <Text>Username:</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Username"
                        onChangeText={(text) => this.setState({usernameText: text})}
                        onSubmitEditing={() => this.passwordField.focus()}
                    />
                    <View style={styles.span} />
                    <Text>Password:</Text>
                    <TextInput ref={(input) => {this.passwordField = input}}
                        style={styles.textInput}
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={(text) => {this.setState({passwordText: text})}}
                        onSubmitEditing={() => {this.props.loginPressed(this.state.usernameText, this.state.passwordText, this.props.appConfig.hostAddress)}}
                    />
                    <View style={styles.span} />
                    <HorizontalDivider/>
                    <Button
                        title="Log Me In! :^)"
                        color="#979797"
                        onPress={() => {this.props.loginPressed(this.state.usernameText, this.state.passwordText, this.props.appConfig.hostAddress)}}
                    />
                </View>
                <View style={styles.span}/>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log('ownProps', ownProps);
    return {
        appConfig: state.appConfig,
        sessionToken: state.sessionToken,
        navigation: ownProps.navigation,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginPressed: (username, password, hostAddress) => {
            console.log('hostAddress: ', hostAddress);
            //const value = this.loginForm.getValue();
            let encodedCredentials = base64.encode(username + ":" + password);
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
        updateSessionToken: (sessionToken) => {
            dispatch({type: actionType.HANDLE_AUTHN, token: sessionToken});
        },
        updateUserId: (userId) => {
            dispatch({type: actionType.UPDATE_USERID, userId: userId});
        },
        updateEventId: (eventId) => {
            dispatch({type: actionType.SET_EVENT, eventId: eventId});
        },
        clearStateOnLogout: () => {
            dispatch({type: actionType.CLEAR_STATE_ON_LOGOUT});
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);