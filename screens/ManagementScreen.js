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
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

//considering denormalization to remove the need for product type or product series tables/tabs that need managing.
//is a dropdown of current series & types possible to avoid chaos lol

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
          <Button
          onPress={() => {
            Alert.alert('Employee mgmt screen');
          }}
          title="Employees"
          color="#979797"
          />
          <View style={styles.span} />
          <Button
          onPress={() => {
            Alert.alert('Event mgmt screen');
          }}
          title="Events"
          color="#979797"
          />
          <View style={styles.span} />
          <Button
          onPress={() => {
            Alert.alert('Product mgmt screen');
          }}
          title="Products"
          color="#979797"
          />
          <View style={styles.span} />
          <Button
          onPress={() => {
            Alert.alert('Sales mgmt screen');
          }}
          title="Sales"
          color="#979797"
          />
          <View style={styles.span} />
          <Button
          onPress={() => {
            Alert.alert('Sales reporting screen');
          }}
          title="View Sales Reports"
          color="#979797"
          />
          <View style={styles.span} />
          <Button
          onPress={() => {
            Alert.alert('Working hours screen');
          }}
          title="Set Today's Working Hours?"
          color="#979797"
          />
          <View style={styles.span} />
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
    margin: 7
  },
});
