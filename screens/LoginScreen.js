import React from 'react';
import {
  Image,
  Button,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
// Redux
import {connect} from 'react-redux';
// react-navigation
import NavigationService from '../components/NavigationService';
// Login support
import base64 from 'react-native-base64';
import t from 'tcomb-form-native';

// Form setup
const Form = t.form.Form;
const Login = t.struct({
    username: t.String,
    password: t.String
});
const formOptions = {
    fields: {
        password: {
            secureTextEntry: true
        }
    }
}

const LoginScreen = (props) => {
    return (
        <ScrollView style={styles.scroll}>
            <View style={styles.welcomeContainer}>
                <Image
                    source={__DEV__ ? require('../assets/images/gb.png') : require('../assets/images/robot-prod.png')}
                    style={styles.welcomeImage}
                />
            </View>
            <View>
                <Form ref={c => this.loginForm = c} type={Login} options={formOptions} />
                <Button title="Log In" onPress={props.loginPressed} />
            </View>
            <View style={styles.span}/>
        </ScrollView>
    );
}

const mapStateToProps = (state) => {
    return {
    }; // no state to pass down just yet
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginPressed: () => {
            const value = this.loginForm.getValue();
            let encodedCredentials = base64.encode(value.username + ":" + value.password);
            // TODO: Abstract this to an app config variable!
            fetch('http://192.168.0.112:5000/api/tokens', {
                method: 'POST',
                headers: {
                    Authorization: "Basic " + encodedCredentials
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                /* Response looks like this:
                {
                    "token": "GMoErE4JIwZv7QkZuhzn1MD7hPGOm3tt"
                }
                */
                const sessionToken = responseJson.token;
                if (sessionToken) {
                    dispatch({type: 'HANDLE_AUTHN', token: sessionToken});
                    NavigationService.navigate('Sales');
                    //this.props.navigation.navigate('Sales');
                } else {
                    alert('Login failed');
                }
            })
            .catch((error) => {
                console.error(error);
            });
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
