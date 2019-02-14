import React from 'react';
import {
  Image,
  Alert,
  Platform,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import base64 from 'react-native-base64';

import t from 'tcomb-form-native';
import { stringify } from 'qs';
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

export default class LoginScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      page_id: 1
    };
  }

  static navigationOptions = {
      title: 'Please sign in',
  };

  handleSubmit = () => {
    const value = this.loginForm.getValue();
    let encodedCredentials = base64.encode(value.username + ":" + value.password);
    console.log('value: ', value);
    console.log(encodedCredentials);
    fetch('http://192.168.0.118:5000/api/tokens', { // TODO: Abstract this to an app config variable!
        method: 'POST',
        headers: {
            Authorization: "Basic " + encodedCredentials
        }
    })
    .then((response) => response.json())
    .then((responseJson) => {
        //await AsyncStorage.setItem('userToken', responseJson[token]);
        this.props.navigation.navigate('App');
    })
    .catch((error) => {
        console.error(error);
    })
  }

  static navigationOptions = {
    header: null,
  };

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
          <Form ref={c => this.loginForm = c} type={Login} options={formOptions} />
          <Button title="LOG ME IN!" onPress={this.handleSubmit} />
          <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Button title='To Sales (idk how to make a button do 2 things lol)' onPress={()=>this.props.navigation.navigate('Sales')}/>
          </View>
        </View>
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
