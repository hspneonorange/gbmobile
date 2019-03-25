import React, {Component} from 'react';
import {
  Image,
  Button,
  ScrollView,
  View,
  Text,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
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
        if (this.props.navigation.dangerouslyGetParent().getParam("logout")) {
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
            // Log out at client (i.e.: wipe Redux state)
            this.props.clearStateOnLogout();
        } else {
            this.retrieveAndTestExistingSession();
        }
    }

    retrieveAndTestExistingSession = async () => {
        if (this.props.sessionToken !== null) {
            await fetch(this.props.appConfig.hostAddress + '/api/tokens', {
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + this.props.sessionToken
                }
            })
            .then((response) => {
                if (response.ok) {
                    // If event id null, navigate to Event
                    // Otherwise navitate to Sales
                    if (this.props.eventId == null) {
                        this.props.navigation.navigate('Event');
                    } else if (this.props.userId != null) {
                        this.props.navigation.navigate('Sales');
                    } // else stay on LoginForm
                } else {
                    console.log('Session token expired or invalid');
                    // stay on LoginForm
                }
            })
            .catch((error) => {
                console.error(error);
            })
        } else {
            console.log('Session token not found in persisted storage');
            // Stay on LoginForm
        }
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
                        onSubmitEditing={() => {this.props.loginPressed(this.state.usernameText, this.state.passwordText, this.props.appConfig.hostAddress, this.props.navigation)}}
                    />
                    <View style={styles.span} />
                    <HorizontalDivider/>
                    <Button
                        title="Log Me In! :^)"
                        color="#979797"
                        onPress={() => {this.props.loginPressed(this.state.usernameText, this.state.passwordText, this.props.appConfig.hostAddress, this.props.navigation)}}
                    />
                </View>
                <View style={styles.span}/>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        appConfig: state.appConfig,
        sessionToken: state.sessionToken,
        navigation: ownProps.navigation,
        userId: state.userId,
        eventId: state.eventId,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginPressed: (username, password, hostAddress, navigation) => {
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
                    navigation.navigate('Event');
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
