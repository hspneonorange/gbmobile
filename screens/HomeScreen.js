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

export default class HomeScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      page_id: 1
    };
  }

  handleSubmit = () => {
      const value = this.loginForm.getValue();
      let encodedCredentials = base64.encode(value.username + ":" + value.password);
      console.log('value: ', value);
      console.log(encodedCredentials);
      fetch('http://192.168.0.112:5000/api/tokens', { // TODO: Abstract this to an app config variable!
        method: 'POST',
        headers: {
            Authorization: "Basic " + encodedCredentials
        }
      })
      .then((response) => { console.log(response); })
      .catch((error) => {
          console.error(error);
      })
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    switch (this.state.page_id) {
      case 1: //login page
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
            </View>
            <View
            style={styles.span}
            />
          </ScrollView>
        );
        break;
      case 2: //select/change event
        return (
          <ScrollView style={styles.scroll}>
            <Text style={styles.textStyle}>Please select the event you are attending.</Text>
            <ScrollView style={styles.eventList}>
              <View
                style={styles.shortSpan}
              />
              <Button
              onPress={() => {
                this.setState({
                  page_id: 3
                });
              }}
              title="Event1"
              color="#d1d1d1"
              />
              <View
                style={styles.shortSpan}
              />
              <Button
              onPress={() => {
                this.setState({
                  page_id: 3
                });
              }}
              title="Event2"
              color="#d1d1d1"
              />
              <View
                style={styles.shortSpan}
              />
            </ScrollView>
            <View
              style={styles.shortSpan}
            />
            <Button
              onPress={() => {
                this.setState({
                  page_id: 1
                });
              }}
              title="Take Me Back!"
              color="#979797"
            />
          </ScrollView>
        );
        break;
      case 3: //the actual "home" screen
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
            <Button
              onPress={() => {
                this.setState({
                  page_id: 4
                });
              }}
              title="Low-Stock Items"
              color="#d1d1d1"
            />
            <View
              style={styles.shortSpan}
            />
            <Button
              onPress={() => {
                this.setState({
                  page_id: 5
                });
              }}
              title="Best Sellers"
              color="#d1d1d1"
            />
            <View
              style={styles.span}
            />
            <Button
            onPress={() => {
              this.setState({
                page_id: 1
              });
            }}
            title="Log Out"
            color="#979797"
            />
            <View
              style={styles.shortSpan}
            />
            <Button
                onPress={() => {
                  this.setState({
                    page_id: 2
                  });
                }}
                title="Change Event"
                color="#979797"
            />
            <View
              style={styles.shortSpan}
            />
            <View
              style={styles.shortSpan}
            />
          </ScrollView>
        );
        break;
      case 4: //low stock items screen
        <ScrollView style={styles.scroll}></ScrollView>
        break;
      case 5: //best sellers screen; not necessary but nice to have
        <ScrollView style={styles.scroll}></ScrollView>
        break;
      default:
        return (
          <Text>This is default, oof</Text>
        );
        break;
    }
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

/*
//import { WebBrowser } from 'expo';
//import { MonoText } from '../components/StyledText';

            <Text style={styles.textStyle}>{"\n"}Username:</Text>
            <TextInput 
              style={styles.textInput}
              placeholder="Enter username"
              onChangeText={(text) => this.setState({text})}/>
            <Text style={styles.textStyle}>{"\n"}Password:</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.textInput}
              placeholder="Enter password"
              onChangeText={(text) => this.setState({text})}
            />
            <Text>{"\n"}{"\n"}{"\n"}</Text> 
            <Button
            styles = {{button:styles.alignRight,label:styles.label}}
            onPress={() => {
              this.setState({
                page_id: 2
              });
            }}
            //http://192.168.0.120:5000/
            title="Log Me In!"
            color="#979797"
            />
            <View
              style={styles.span}
            />
            <Button
            styles = {{button:styles.alignRight,label:styles.label}}
            onPress={() => {
              Alert.alert('You tapped the forgot password button!');
            }}
            title="Forgot Login/Password?"
            color="#979797"
            />


*/