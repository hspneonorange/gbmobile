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
import utf8 from 'utf8';
import base64 from 'base-64';
import t from 'tcomb-form-native';

//import { WebBrowser } from 'expo';
//import { MonoText } from '../components/StyledText';

const Form = t.form.Form;
const Login = t.struct({
    username: t.String,
    password: t.String
});

export default class HomeScreen extends React.Component {
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
              <Form type={Login}/>
              <Button title="LOG ME IN!" onPress={this.handleSubmit} />
          </View>
          <Button
          styles = {{button:styles.alignRight,label:styles.label}}
          onPress={() => {
            Alert.alert('You tapped the forgot password button!');
          }}
          title="Forgot Login/Password?"
          color="#979797"
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
});

/*
          <Text>{"\n"}Username:</Text>
          <TextInput 
            style={styles.textInput}
            placeholder="Enter username"
            onChangeText={(text) => this.setState({text})}/>
          <Text>{"\n"}Password:</Text>
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
              var authN = 
              fetch('http://192.168.0.120:5000/api/tokens', {
                  method: 'POST',
                  headers: {
                    Authorization: 
                  }
              })
            Alert.alert('You tapped the log me in button!');
          }}
          //http://192.168.0.120:5000/
          title="Log Me In!"
          color="#979797"
          />
          <View
            style={styles.span}
          />

*/