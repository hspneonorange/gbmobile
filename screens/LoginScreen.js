import React from 'react';
import {
  Image,
  Button,
  ScrollView,
  StyleSheet,
  View,
  AsyncStorage, // token persistence
  Text,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import NavigationService from '../components/NavigationService';
import base64 from 'react-native-base64';
import t from 'tcomb-form-native';

// Form setup
// const Form = t.form.Form;
// const Login = t.struct({
//     username: t.String,
//     password: t.String
// });
// const formOptions = {
//     fields: {
//         password: {
//             secureTextEntry: true
//         }
//     }
// }

const retrieveAndTestExistingSession = async (props) => {
    console.log('Looking up in AsyncStorage');
    await AsyncStorage.getItem('@Authentication:access-token')
    .then(async (sessionToken) => {
        if (sessionToken !== null) {
            console.log("Retrieved value: ", sessionToken);
            //await fetch('http://192.168.0.112:5000/api/tokens', {
            console.log("hostAddress: ",props.appConfig.hostAddress);
            await fetch(props.appConfig.hostAddress + '/tokens', {
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + sessionToken
                }
            })
            .then((response) => {
                console.log("Token valid: ", response.ok);
                if (response.ok) {
                    console.log('Session token still valid; redirecting')
                    props.updateSessionToken(sessionToken);
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

const LoginScreen = (props) => {
    retrieveAndTestExistingSession(props);
    return (
        <ScrollView style={styles.scroll}>
            <View style={styles.welcomeContainer}>
                <Image
                    source={__DEV__ ? require('../assets/images/gb.png') : require('../assets/images/robot-prod.png')}
                    style={styles.welcomeImage}
                />
            </View>
            <View>
                <Text>Username:</Text>
                <TextInput style={styles.textInput} placeholder="Username" onChangeText={(text) => {props.usernameTextChanged(text)}}/>
                <Text>Password:</Text>
                <View style={styles.span} />
                <TextInput style={styles.textInput} placeholder="Password" secureTextEntry={true} onChangeText={(text) => {props.passwordTextChanged(text)}}/>
                <View style={styles.span} />
                <Button title="Log Me In! :^)" color="#979797" onPress={() => {props.loginPressed(props.username, props.password, props.appConfig.hostAddress)}}/>
            </View>
            <View style={styles.span}/>
        </ScrollView>
    );
}

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig,
        username: state.username,
        password: state.password,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        usernameTextChanged: (text) => {
            dispatch({type: 'USERNAME_TEXT_CHANGED', text: text});
        },
        passwordTextChanged: (text) => {
            dispatch({type: 'PASSWORD_TEXT_CHANGED', text: text});
        },
        loginPressed: (username, password, hostAddress) => {
            //const value = this.loginForm.getValue();
            let encodedCredentials = base64.encode(username + ":" + password);
            // TODO: Abstract this to an app config variable!
            //fetch('http://192.168.0.112:5000/api/tokens', {
            fetch(hostAddress + '/tokens' ,{
                method: 'POST',
                headers: {
                    Authorization: "Basic " + encodedCredentials
                }
            })
            .then((response) => response.json())
            .then(async (responseJson) => {
                // Valid response looks like this: {"token": "GMoErE4JIwZv7QkZuhzn1MD7hPGOm3tt"}
                const sessionToken = responseJson.token;
                if (sessionToken) {
                    try {
                        await AsyncStorage.setItem('@Authentication:access-token', sessionToken);
                    } catch (error) {
                        console.log('AsyncStorage failed: ', error);
                    }
                    dispatch({type: 'HANDLE_AUTHN', token: sessionToken});
                    NavigationService.navigate('Event');
                    //this.props.navigation.navigate('Sales');
                } else {
                    alert('Login failed');
                }
            })
            .catch((error) => {
                console.error(error);
            });
        },
        updateSessionToken: (sessionToken) => {
            dispatch({type: 'HANDLE_AUTHN', token: sessionToken});
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

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
        padding: 30,
        flexDirection: 'column'
    },
    container: {
        flex: 1,
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    textInput: {
        height: 40,
        fontSize: 15,
        backgroundColor: '#FFF'
    },
    label: {
        color: '#0d8898',
        fontSize: 20
    },
    alignRight: {
        alignSelf: 'flex-end',
    },
    span: {
        margin: 10
    },
    shortSpan: {
        margin: 5
    },
    eventList: {
        backgroundColor: '#e0eeef'
    },
    textStyle: {
        fontSize: 15,
    }
});
